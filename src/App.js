import { useEffect, useState } from "react";
import StarRating from "./starRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "e9d13563";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  function CloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function deleteWatched(id) {
    setWatched((obj) => obj.filter((ob) => ob.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      CloseMovie();
      FetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              sectedMovie={handleSelectMovie}
              setSelectedId={setSelectedId}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              CloseMovie={CloseMovie}
              onAddWatched={handleAddWatched}
              setSelectedId={setSelectedId}
              watchededMovie={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                deleteWatched={deleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ message }) {
  return (
    <div
      className="error"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>⛔</span> {message}
    </div>
  );
}

function Loader() {
  return <div className="loader">LOADING...</div>;
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

//Re-usable Box
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

function WatchedBox() {
  const [watched, setWatched] = useState([]);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList
            watched={watched}
            handleDeleteWatched={WatchedMovieList}
          />
        </>
      )}
    </div>
  );
}

function MovieList({ movies, sectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} sectedMovie={sectedMovie} />
      ))}
    </ul>
  );
}

function MovieDetails({
  selectedId,
  CloseMovie,
  onAddWatched,
  watchededMovie,
}) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const alreadyWatch = watchededMovie
    .map((obj) => obj.imdbID)
    .includes(selectedId);

  const watchedRating = watchededMovie.find(
    (obj) => obj.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
    Director: director,
  } = movieData;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
    };
    onAddWatched(newMovie);
    CloseMovie();
  }
  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        CloseMovie();
        console.log("Closing");
      }
    }

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [CloseMovie]);

  useEffect(
    function () {
      setIsLoading(true);
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieData(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    document.title = `MOVIE: ${title ? title : "loading..."}`;
    return function () {
      document.title = "usePopcorn";
      console.log(`clean up effect for the movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={CloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!alreadyWatch ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  {" "}
                  😒 You rated this already {watchedRating} <span>⭐😎</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Movie({ movie, sectedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => sectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
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
  );
}
function WatchedMovieList({ watched, deleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, key) => (
        <WatchedMovie
          film={movie}
          key={key}
          handleDeleteWatched={deleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ film, handleDeleteWatched }) {
  return (
    <li key={film.imdbID}>
      <img src={film.poster} alt={`${film.title} poster`} />
      <h3>{film.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{film.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{film.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{film.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(film.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
