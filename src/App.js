import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { fetchArticles } from "./services/api";
import Button from "./component/Button/Button.jsx";
import Container from "./component/Container/Container.jsx";
import ImageGallery from "./component/ImageGallery/ImageGallery.jsx";
import Modal from "./component/Modal/Modal.jsx";
import ImageLoader from "./component/Loader/Loader.jsx";
import Searchbar from "./component/Searchbar/Searchbar.jsx";
import { onErrorToast } from "./component/Error";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [imageName, setImageName] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [imgTags, setImgTags] = useState("");
  const [loader, setLoader] = useState(false);

  function onModalClose() {
    setLargeImageURL(null);
  }

  function hideLoaderInModal() {
    setLoader(false);
  }

  function handleImageClick(largeImageURL, imgTags) {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    setLoader(true);
  }
  function handleFormSubmit(imageName) {
    if (imageName.trim() === "") {
      onErrorToast();
      return;
    }
    resetState();
    setImageName(imageName);
  }

  function resetState() {
    setImageName(null);
    setPage(1);
    setImages([]);
  }

  function onLoadMoreBtn() {
    setPage((page) => page + 1);
  }

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);
    async function onFetchArticles() {
      try {
        const images = await fetchArticles(imageName, page);
        if (images.length === 0) {
          throw new Error();
        }

        setImages((state) => [...state, ...images]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        onErrorToast();
      }
    }
    onFetchArticles();
  }, [imageName, page]);

  useEffect(() => {
    function scrollPageToEnd() {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 1000);
    }
    if (page > 1) {
      scrollPageToEnd();
    }
  }, [images, page]);

  const showImageList = images.length > 0;
  return (
    <Container>
      <Searchbar onSearch={handleFormSubmit} />
      {status === Status.PENDING && <ImageLoader />}
      {status === Status.RESOLVED && (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}
      {showImageList && (
        <Button onClick={onLoadMoreBtn} aria-label="add images" />
      )}
      {status === Status.REJECTED}
      {largeImageURL && (
        <Modal onClose={onModalClose}>
          {loader && <ImageLoader />}
          <img src={largeImageURL} alt={imgTags} onLoad={hideLoaderInModal} />
        </Modal>
      )}
      <Toaster autoClose={4000} position="top-right" />
    </Container>
  );
}
