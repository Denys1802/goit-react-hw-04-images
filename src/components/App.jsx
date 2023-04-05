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
