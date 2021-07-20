import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { fetchArticles } from "../services/api";
import Button from "./Button/Button.jsx";
import Container from "./Container/Container.jsx";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Modal from "./Modal/Modal.jsx";
import ImageLoader from "./Loader/Loader.jsx";
import Searchbar from "./Searchbar/Searchbar.jsx";
import { onErrorToast } from "./Error";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [articlesName, setArticlesName] = useState("");
  const [articles, setArticles] = useState([]);
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
  function handleFormSubmit(articlesName) {
    if (articlesName.trim() === "") {
      onErrorToast();
      return;
    }
    resetState();
    setArticlesName(articlesName);
  }

  function resetState() {
    setArticlesName(null);
    setPage(1);
    setArticles([]);
  }

  function onLoadMoreBtn() {
    setPage((page) => page + 1);
  }

  useEffect(() => {
    if (!articlesName) {
      return;
    }
    setStatus(Status.PENDING);
    async function onFetchArticles() {
      try {
        const articles = await fetchArticles(articlesName, page);
        if (articles.length === 0) {
          throw new Error();
        }

        setArticles((state) => [...state, ...articles]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        onErrorToast();
      }
    }
    onFetchArticles();
  }, [articlesName, page]);

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
  }, [articles, page]);

  const showImageList = articles.length > 0;
  return (
    <Container>
      <Searchbar onSearch={handleFormSubmit} />
      {status === Status.PENDING && <ImageLoader />}
      {status === Status.RESOLVED && (
        <ImageGallery articles={articles} handleImageClick={handleImageClick} />
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
