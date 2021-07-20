import React from "react";
import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, largeImageURL, handleImageClick }) {
  return (
  <li className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      data-url={largeImageURL}
      className={styles.ImageGalleryItem__image}
      onClick={() => {
          handleImageClick(largeImageURL, tags)
        }}  
    />
  </li>
);
}

export default ImageGalleryItem;
