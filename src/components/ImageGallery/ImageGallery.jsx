import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { StyledGallery } from './ImageGalleryStyled';
import { Loader } from 'components/Loader/Loader';
import apiServices from 'components/services/apiServices.js';

export function ImageGallery({query})  {
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setshowLoadMore] = useState(true);
    

  
  useEffect(() => {
    if (!query) {
      setImages([]);
      return
    }
    const loadImages = async (query, page) => {
      setLoading(true);
      try {
        const result = await apiServices(query, page);
        const data = result.hits;
        const pagesCounter = Math.ceil(result.totalHits / 12);

        setImages(prevData => {
          return [...prevData, ...data];
        });

        if (data.length === 0) {
          return Notiflix.Notify.failure('Зображень не знайдено');
        }
        if (page === 1) {
          setImages([...data]);
        }
        if (page >= pagesCounter) {
          Notiflix.Notify.failure('Це останні результати за Вашим запитом');
          setshowLoadMore(false);
        } else {
          setImages(prevData => {
            return [...prevData, ...data];
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadImages(query, page)}, [query, page])

  const loadMore = () => {
    setPages(prevPage => prevPage + 1)
    setLoading(true)
  };

    return (
      <>
        <StyledGallery>
          {images.map(el => {
            return <ImageGalleryItem item={el} key={el.id} />;
          })}
        </StyledGallery>
        {!loading && showLoadMore && images.length >= 12 && (
          <Button onClick={loadMore} />
        )}
        {loading && <Loader />}
      </>
    );
  }

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
};
