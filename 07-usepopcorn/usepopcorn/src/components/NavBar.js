export function NavBar({ children }) 
{
  return <nav className="nav-bar"> {children}</nav>;
}

export function SearchBar({ query, SetQuery }) 
{
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => SetQuery(e.target.value)} />
  );
}

export function Logo() 
{
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function NumberOfResults({ movies }) 
{
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}