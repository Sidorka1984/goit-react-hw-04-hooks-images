import React from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ articles, handleImageClick }) => {
  return (
  <ul className={styles.ImageGallery}>
    {articles.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        handleImageClick={handleImageClick}
      />
    ))}
  </ul>
  )
}


export default ImageGallery;
