import { Component } from "react";
import { getData } from "../api";
import { Container } from "./Layout/Layout.styled";
import { Toaster, toast } from 'react-hot-toast';
import { Circles } from 'react-loader-spinner'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";

export class App extends Component {
  state = {
    serchQuery: "",
    pictures: [],
    isLoading: false,
    error: null,
    currentPage: 1,
  }

  handleFormSubmit = query => {
    this.setState(prevState => ({
      serchQuery: query,
      currentPage: 1
    }));
  }

  async componentDidUpdate(_, prevState) {
    const nextQuery = this.state.serchQuery;
    const prevQuery = prevState.serchQuery;
    const nextPage = this.state.currentPage;
    const prevPage = prevState.currentPage;

    if (nextQuery !== prevQuery) {
      try {
        this.setState({ isLoading: true });
        const fetchedPictures = await getData(nextQuery, this.state.currentPage);
        this.setState(prevState => ({
          pictures: fetchedPictures,
        }))
      } catch (error) {
        this.setState(prevState => ({
          error: error.message
        }));
        return toast('Something went wrong...', { icon: '👻', });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (nextPage !== prevPage && nextQuery === prevQuery) {
      try {
        this.setState({ isLoading: true });
        const fetchedPictures = await getData(nextQuery, nextPage);
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...fetchedPictures],
        }))
      } catch (error) {
        this.setState(prevState => ({
          error: error.message
        }));
        return toast('Something went wrong...', { icon: '👻', });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  changePage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }))
  }

  render() {
    const { pictures, isLoading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={pictures} />
        {isLoading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperClassName="loader"
          visible={true}
        />}
        {pictures.length > 0 && <Button onClick={this.changePage} />}
        <Toaster position="top-rightr" />
      </Container>
    )
  }
}
