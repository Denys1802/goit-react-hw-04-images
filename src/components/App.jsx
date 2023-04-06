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
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [page, searchText]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const resetPage = () => {
    setPage(1);
  };

  const createSearchText = currentText => {
    if (searchText !== currentText) {
      setSearchText(currentText);
      setImages([]);
    }
  };
  return (
    <>
      <AppWrap>
        <Searchbar createSearchText={createSearchText} resetPage={resetPage} />
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
