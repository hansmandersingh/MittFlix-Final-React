import React from "react";
import Movie from "./Movie";

export default function GenreTitle(props) {
  let thisMovieExists;

  props.movies.forEach((movie) => {
    if (movie.genre_ids.includes(props.genre.id)) {
      thisMovieExists = true;
    }
  });

  return (
    <>
      {thisMovieExists ? (
        <div className={`titleList`}>
          <div className="title">
            <h1>{props.genre.name}</h1>
            <div className="titles-wrapper">
              {props.movies.map((movie) =>
                movie.genre_ids.includes(props.genre.id) ? (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    addingToTheList={props.addingToTheList}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
