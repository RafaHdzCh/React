import { useEffect, useState } from "react";
import { MovieDetails } from "./MovieDetails";
import { NavBar, Logo, SearchBar, NumberOfResults } from "./NavBar";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Box } from "./Box";
import { Main } from "./Main";
import { MovieList } from "./MovieList";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { FetchMovies } from "../utils/MovieAPI";

export const API_KEY = "f8dc2545";
export const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() 
{
  const [error, SetError] = useState("");
  const [query, SetQuery] = useState("");
  const [movies, SetMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [selectedId, SetSelectedID] = useState(null);
  const [watched, SetWatched] = useState(function() 
  {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

/*
  useEffect(function()
  {
    console.log("After initial render")
  }, [])
  useEffect(function()
  {
    console.log("After every render")
  })
  useEffect(function()
  {
    console.log("On query")
  }, [query])
  console.log("During render")
*/
  function HandleSelectMovie(id)
  {
    SetSelectedID(selectedId => id === selectedId ? null : id);
  }  

  function HandleCloseMovie()
  {
    SetSelectedID(null)
  }

  function HandleAddWatchedMovie(movie)
  {
    SetWatched(watched=>[...watched, movie]);
  }

  function HandleDeleteWatched(id)
  {
    SetWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(function SaveMovies()
  {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched])

  useEffect(function SearchAbortController()
  {
    const controller = new AbortController();

    async function FetchData() 
    {
      if (!query) {
        SetMovies([]);
        SetError("");
        return;
      }

      SetIsLoading(true);
      try 
      {
        const data = await FetchMovies(query,controller);
        SetMovies(data);
        SetError("");
      } 
      catch (error) 
      {
        if(error.name !== "AbortError")
        {
          SetError(error.message);
        }
      } 
      finally 
      {
        SetIsLoading(false);
      }
    }
    FetchData();

    return function()
    {
      controller.abort();
    }
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo/>
        <SearchBar query={query} SetQuery={SetQuery}/>
        <NumberOfResults movies={movies}/>
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (<MovieList movies={movies} OnSelectMovie={HandleSelectMovie}/>)}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {
            selectedId ? 
            <MovieDetails 
              selectedId={selectedId}
              OnCloseMovie={HandleCloseMovie}
              OnAddWatchedMovie={HandleAddWatchedMovie}
              watched={watched}
            />
            :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} OnDeleteWatched={HandleDeleteWatched}/>
            </>
          }
        </Box>
      </Main>
    </>
  );
}