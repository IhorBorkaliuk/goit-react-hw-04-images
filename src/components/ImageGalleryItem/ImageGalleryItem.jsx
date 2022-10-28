import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { Item, IMG } from "./ImageGalleryItemStyled";

export function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { webformatURL, largeImageURL, tags } = item;
  return (
    <Item>
      <IMG src={webformatURL} alt={tags} onClick={openModal} />
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onModalClose={closeModal}
        />
      )}
    </Item>
  );
}



