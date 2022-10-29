import Notiflix from 'notiflix';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { StyledApp } from './AppStyled';
import { GlobalNormalize } from './Styled/GlobalNormalize';
import { useState, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import findImages from './services/apiServices.js';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setshowLoadMore] = useState(true);
  const [query, setQuery] = useState('');


  const updateQuery = newQuery => {
    setQuery(newQuery);
    setPages(1);
    setImages([]);
  };


  useEffect(() => {
    if (!query) {
      setImages([]);
      return;
    }
    const loadImages = async (query, page) => {
      setLoading(true);
      try {
        const result = await findImages(query, page);
        const data = result.hits;
        const pagesCounter = Math.ceil(result.totalHits / 12);

        setImages(prev => {
          return [...prev, ...data];
        });

        if (data.length === 0) {
          return Notiflix.Notify.failure('Зображень не знайдено');
        }
        if (page >= pagesCounter) {
          Notiflix.Notify.failure('Це останні результати за Вашим запитом');
          setshowLoadMore(false);
        }
      } catch (error) {
        Notiflix.Notify.failure(
          'Сталася помилка, перезавантажте сторінку та спробуйте ще раз'
        );
      } finally {
        setLoading(false);
      }
    };
    loadImages(query, page);
  }, [query, page]);

  const loadMore = () => {
    setPages(prevPage => prevPage + 1);
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={updateQuery} />
      <ImageGallery images={images} />
      {!loading && showLoadMore && images.length >= 12 && (
        <Button onClick={loadMore} />
      )}
      {loading && <Loader />}
      <GlobalNormalize />
    </StyledApp>
  );
}
