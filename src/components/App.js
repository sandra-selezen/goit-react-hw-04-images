import { useState, useEffect } from "react";
import { getData } from "services/api";
import { Container } from "./Layout/Layout.styled";
import { Toaster, toast } from 'react-hot-toast';
import { Circles } from 'react-loader-spinner'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";

export const App = () => {
  const [serchQuery, setSearchQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const handleFormSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  const changePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    if (!serchQuery) {
      return; // for the first render
    }
    
    const fetchPictures = async () => {
      try {
        setIsLoading(true);
        const fetchedPictures = await getData(serchQuery, currentPage);
        setPictures(prevPictures => [...prevPictures, ...fetchedPictures]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log(errorMessage);
        return toast('Something went wrong...', { icon: '👻', });
      } finally {
        setIsLoading(false);
      }
    }
    fetchPictures();
  }, [currentPage, errorMessage, serchQuery]);

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery pictures={pictures} />
      {isLoading && <Circles
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="circles-loading"
        wrapperClassName="loader"
        visible={true}
      />}
      {pictures.length > 0 && <Button onClick={changePage} />}
      <Toaster position="top-rightr" />
    </Container>
  )
}
