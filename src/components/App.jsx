import { useEffect, useState } from 'react';
import { AppWrap } from './App.styled';
import { fetchImages } from './services/fetch';
import { Loader } from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      fetchImages(searchText, page)
        .then(data => {
          setImages(data.hits);
          setIsLoading(false);
          setTotalHits(data.totalHits);
        })
        .catch(error => setError(true));
    }
    return;
  }, [searchText, page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const resetPage = () => {
    setPage(1);
    setSearchText('');
  };

  return (
    <>
      <AppWrap>
        <Searchbar createSearchText={setSearchText} resetPage={resetPage} />
        {error && <h1>Please try again</h1>}
        {images && <ImageGallery images={images} />}
        {images && !isLoading && totalHits > 12 && (
          <LoadMoreBtn onClick={incrementPage} />
        )}
        {isLoading && <Loader widthLoader={'200'} heightLoader={'200'} />}
      </AppWrap>
    </>
  );
};

export default App;
// class App extends Component {
//   state = {
//     searchText: '',
//     images: null,
//     page: 1,
//     isLoading: false,
//     totalHits: 0,
//     error: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const searchText = this.state.searchText;
//     let page = this.state.page;
//     if (prevState.searchText !== searchText && searchText) {
//       this.setState({ isLoading: true, page: 1 });
//       fetchImages(searchText, page)
//         .then(data => {
//           this.setState({
//             images: data.hits,
//             isLoading: false,
//             totalHits: data.totalHits,
//           });
//         })
//         .catch(error => this.setState({ error: true }));
//     }

//     if (prevState.page < this.state.page) {
//       this.setState({ isLoading: true });
//       fetchImages(searchText, page)
//         .then(({ hits }) => {
//           this.setState(prevState => {
//             return {
//               images: [...prevState.images, ...hits],
//               page,
//             };
//           });
//         })
//         .catch(error => this.setState({ error: true }))
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   createSearchText = searchText => {
//     this.setState({ searchText });
//   };

//   incrementPage = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   resetPage = () => {
//     this.setState({ page: 1 });
//   };

//   render() {
//     const { images, isLoading, error, totalHits } = this.state;
//     return (
//       <>
//         <AppWrap>
//           <Searchbar
//             createSearchText={this.createSearchText}
//             resetPage={this.resetPage}
//           />
//           {error && <h1>Please try again</h1>}
//           {images && <ImageGallery images={this.state.images} />}
//           {images && !isLoading  && totalHits > 12 && (
//             <LoadMoreBtn onClick={this.incrementPage} />
//           )}
//           {isLoading && <Loader widthLoader={'200'} heightLoader={'200'} />}
//         </AppWrap>
//       </>
//     );
//   }
// }

// export default App;
