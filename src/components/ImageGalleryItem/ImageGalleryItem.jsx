import React from "react";
import { useState } from "react";
import styles from "./ImageGalleryItem.module.css";
import defaultImage from '../../images/pendingImage.png';

function ImageGalleryItem({ webformatURL, tags, largeImageURL, handleImageClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
  <li className={styles.ImageGalleryItem}>
      <img
        src={isLoaded ? webformatURL : defaultImage}
        alt={tags}
        data-url={largeImageURL}
        className={styles.ImageGalleryItem__image}
        onLoad={handleImageLoad}
        onClick={() => {
          handleImageClick(largeImageURL, tags)
        }}  
    />
  </li>
);
}

export default ImageGalleryItem;
