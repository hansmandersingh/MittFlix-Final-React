import React from "react";
import * as MovieAPI from "./MovieAPI";
import Header from "./Header";
import GenreTitle from "./GenreTitle";
import MyList from "./MyList";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],
    genres: [],
  };

  componentDidMount = () => {
    MovieAPI.getAll().then((movies) => {
      this.setState({ movies });
    });

    MovieAPI.genres().then((genres) => {
      genres.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.setState({ genres });
    });
  };

  addingToTheList = (movie) => {
    if (movie.my_list === false) {
      MovieAPI.addToList(movie).then(() => {
        this.setState((prevState) => {
          const movieIndex = prevState.movies.findIndex(
            (movieEle) => movie === movieEle
          );
          const movieDuplicate = {
            ...prevState.movies[movieIndex],
            my_list: true,
          };
          const stateDuplicate = [...prevState.movies];

          stateDuplicate.splice(movieIndex, 1, movieDuplicate);
          return { movies: stateDuplicate };
        });
      });
    } else {
      MovieAPI.removeFromList(movie).then(() => {
        this.setState((prevState) => {
          const movieIndex = prevState.movies.findIndex(
            (movieEle) => movie === movieEle
          );
          const movieDuplicate = {
            ...prevState.movies[movieIndex],
            my_list: false,
          };
          const stateDuplicate = [...prevState.movies];

          stateDuplicate.splice(movieIndex, 1, movieDuplicate);
          return { movies: stateDuplicate };
        });
      });
    }
  };

  filterMovies = (query) => {
    if (query !== "") {
      this.setState((prevState) => ({
        movies: [...prevState.movies].filter((movie) =>
          (movie.title.toLowerCase() || movie.overview.toLowerCase()).includes(
            query.toLowerCase()
          )
        ),
      }));
    } else {
      MovieAPI.getAll().then((movies) => {
        this.setState({ movies });
      });
    }
  };

  render = () => {
    return (
      <>
        <Header
          filterMovies={this.filterMovies}
          allMovies={this.state.movies}
        />

        <Switch>
          <Route exact path="/">
            {this.state.genres.map((genre) => {
              return (
                <GenreTitle
                  key={genre.id}
                  genre={genre}
                  movies={this.state.movies}
                  addingToTheList={this.addingToTheList}
                />
              );
            })}
          </Route>
          <Route exact path="/myList">
            <MyList
              movies={this.state.movies.filter(
                (movie) => movie.my_list === true
              )}
              addingToTheList={this.addingToTheList}
            />
          </Route>
        </Switch>
      </>
    );
  };
}

export default App;
