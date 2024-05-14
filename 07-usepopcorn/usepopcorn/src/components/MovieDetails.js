import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { API_KEY } from "./App";
import { Loader } from "./Loader";

export function MovieDetails({ selectedId, OnCloseMovie, OnAddWatchedMovie, watched }) 
{
  const [userRating, SetUserRating] = useState("");
  const [movie, SetMovie] = useState({});
  const [isLoading, SetIsLoading] = useState(false);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const
  { 
    Title: title,
    Poster: poster, 
    Year: year, 
    Runtime: runtime, 
    imdbRating, 
    Plot: plot, 
    Released: released, 
    Actors: actors, 
    Director: director, 
    Genre: genre,
  } = movie;

  function HandleAdd() 
  {
    const newWatchedMovie = 
    {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    OnAddWatchedMovie(newWatchedMovie);
    OnCloseMovie();
  }

  useEffect(function () 
  {
    async function GetMovieDetails() {
      SetIsLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${API_KEY}`);
      const data = await response.json();
      SetMovie(data);
      SetIsLoading(false);
    }
    GetMovieDetails();
  }, [selectedId]);

  useEffect(function() 
  {
    if(!title) return;
    document.title = `MOVIE | ${title}`;

    return function()
    {
      document.title = "usePopcorn";
    }
  }, [title]);

  useEffect(function() 
  {
    function CallBack(event)
    {
      if(event.code === "Escape")
      {
        OnCloseMovie();
      }
    }
    
    document.addEventListener("keydown", CallBack);
    return function()
    {
      document.removeEventListener("keydown", CallBack);
    }
  }, [OnCloseMovie]);

  return (
    <div className="details">
      {isLoading ?
        <Loader />
        :
        <>
          <header>
            <button className="btn-back" onClick={OnCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐ {imdbRating} IMBd Rating</span></p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating maxRating={10} size={24} OnSetRating={SetUserRating} />
                  {userRating && (<button className="btn-add" onClick={HandleAdd}>
                    Add to list +
                  </button>)}
                </>
                :
                <p> You already rated this movie {watchedUserRating} stars. ⭐</p>}
            </div>
            <p><em>{plot}</em></p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  );
}