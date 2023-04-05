import { useEffect, useState } from 'react';
import { AppWrap } from './App.styled';
import { fetchImages } from './services/fetch';
import { Loader } from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setIsLoading(true);
    fetchImages(searchText, page)
      .then(data => {
        if (data.hits.length === 0) {
          return;
        }
        setImages(images => [...images, ...data.hits]);
        setIsLoading(false);
        setTotalHits(data.totalHits);
      })
      .catch(() => setError(true));
  }, [page, searchText]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const resetPage = () => {
    setPage(1);
    setSearchText('');
    setImages([]);
  };

  return (
    <>
      <AppWrap>
        <Searchbar createSearchText={setSearchText} resetPage={resetPage} />
        {error && <h1>Please try again</h1>}
        {images && <ImageGallery images={images} />}
        {images.length > 0 && !isLoading && totalHits > 12 && (
          <LoadMoreBtn onClick={incrementPage} />
        )}
        {isLoading && <Loader widthLoader={'200'} heightLoader={'200'} />}
      </AppWrap>
    </>
  );
};

export default App;
//  componentDidUpdate(_, prevState) {
//     const searchText = this.state.searchText;
//     let page = this.state.page;
//     if (prevState.searchText !== searchText && searchText) {
//       this.setState({ isLoading: true, page: 1 });
//       fetchImages(searchText, page)
//         .then(data => {
//           this.setState({
//             images: data.hits,
//             isLoading: false,
//             isHidden: true,
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
