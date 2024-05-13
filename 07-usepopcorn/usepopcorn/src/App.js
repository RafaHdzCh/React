import { useEffect, useState } from "react";

const API_KEY = "f8dc2545";
const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() 
{
  const [query, SetQuery] = useState("");
  const [movies, SetMovies] = useState([]);
  const [watched, SetWatched] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState("");
  const [selectedId, SetSelectedID] = useState(null);

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

  useEffect(function() 
  {
    async function FetchMovies()
    {
      try
      {
        SetIsLoading(true);
        SetError("");
        
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        if(!response.ok) throw new Error("Something went wrong...")
          
        const data = await response.json();
        if(data.response === "False") throw new Error("Movie not found!")

        SetMovies(data.Search);
      }
      catch(error)
      {
        SetError(error.message)
      }
      finally
      {
        SetIsLoading(false);
      }
    }
    if(!query.length)
    {
      SetMovies([]);
      SetError("");
      return;
    }
    FetchMovies();
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
            <MovieDetails selectedId={selectedId} OnCloseMovie={HandleCloseMovie}/>
            :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

function Loader()
{
  return <p className="loader"> Loading... </p>
}

function ErrorMessage({message})
{
  return <p className="error"> <span> {message} </span> </p>
}

function NavBar({children})
{
  return <nav className="nav-bar"> {children}</nav>
}

function SearchBar({query, SetQuery})
{
  return(
    <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => SetQuery(e.target.value)}
    />
  )
}

function Logo()
{
  return(
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
)
}

function NumberOfResults({movies})
{
  return(
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  )
}

function Main({children})
{
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({movies,OnSelectMovie})
{
  return(
    <ul className="list list-movies">
      {movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} OnSelectMovie={OnSelectMovie}/>)}
    </ul>
  )
}

function Movie({movie, OnSelectMovie})
{
  return(
    <li onClick={() => OnSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedSummary({watched})
{
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return(
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMoviesList({watched})
{
  return(
    <ul className="list">
      {watched.map((movie) => <WatchedMovie movie={movie}/>)}
    </ul>
  )
}

function WatchedMovie({movie})
{
  return(
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({selectedId, OnCloseMovie})
{
  return <div className="details"> 
    <button className="btn-back" onClick={OnCloseMovie}>
      &larr;
    </button>
    {selectedId} 
  </div>
}
