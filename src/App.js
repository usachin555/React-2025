// use POP CORN CODE START

import { useState } from "react";

// import { useEffect, useRef, useState } from "react";
// import StarRating from "./starRating";
// import { useMovies } from "./useMovies";
// import { useLocalStorageState } from "./useLocalStorage";
// import { useKey } from "./useKey";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const KEY = "e9d13563";

// export default function App() {
//   const [query, setQuery] = useState("");
//   // const [watched, setWatched] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   const [watched, setWatched] = useLocalStorageState([], "watched");

//   const { movies, isLoading, error } = useMovies(query, CloseMovie);

//   const handleSelectMovie = (id) => {
//     setSelectedId((selectedId) => (id === selectedId ? null : id));
//   };

//   function CloseMovie() {
//     setSelectedId(null);
//   }

//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//   }
//   console.log("watched", watched);
//   function deleteWatched(id) {
//     setWatched((obj) => obj.filter((ob) => ob.imdbID !== id));
//   }

//   useLocalStorageState(watched);

//   return (
//     <>
//       <Navbar>
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </Navbar>
//       <Main>
//         <Box>
//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList
//               movies={movies}
//               sectedMovie={handleSelectMovie}
//               setSelectedId={setSelectedId}
//             />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>
//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               CloseMovie={CloseMovie}
//               onAddWatched={handleAddWatched}
//               setSelectedId={setSelectedId}
//               watchededMovie={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMovieList
//                 watched={watched}
//                 deleteWatched={deleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }
// function ErrorMessage({ message }) {
//   return (
//     <div
//       className="error"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <span>⛔</span> {message}
//     </div>
//   );
// }

// function Loader() {
//   return <div className="loader">LOADING...</div>;
// }

// function Navbar({ children }) {
//   return (
//     <nav className="nav-bar">
//       <Logo />
//       {children}
//     </nav>
//   );
// }

// function NumResults({ movies }) {
//   return (
//     <p className="num-results">
//       Found <strong>{movies?.length}</strong> results
//     </p>
//   );
// }

// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }
// function Search({ query, setQuery }) {
//   const inputEl = useRef(null);

//   useKey("Enter", function () {
//     if (document.activeElement === inputEl.current) return;
//     inputEl.current.focus();
//     setQuery("");
//   });

//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       ref={inputEl}
//     />
//   );
// }
// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// //Re-usable Box
// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }

// function WatchedBox() {
//   const [watched, setWatched] = useState([]);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList
//             watched={watched}
//             handleDeleteWatched={WatchedMovieList}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// function MovieList({ movies, sectedMovie }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie) => (
//         <Movie movie={movie} key={movie.imdbID} sectedMovie={sectedMovie} />
//       ))}
//     </ul>
//   );
// }

// function MovieDetails({
//   selectedId,
//   CloseMovie,
//   onAddWatched,
//   watchededMovie,
// }) {
//   const [movieData, setMovieData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const alreadyWatch = watchededMovie
//     .map((obj) => obj.imdbID)
//     .includes(selectedId);

//   const countRef = useRef(0);

//   useEffect(
//     function () {
//       if (userRating) countRef.current = countRef.current + 1;
//     },
//     [userRating]
//   );

//   const watchedRating = watchededMovie.find(
//     (obj) => obj.imdbID === selectedId
//   )?.userRating;

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Genre: genre,
//     Director: director,
//   } = movieData;

//   /* eslint-disable */
//   // if (imdbRating > 8) return <p>Greatest ever!</p>
//   function handleAdd() {
//     const newMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: runtime.split(" ").at(0),
//       userRating,
//       countRatingDecisions: countRef.current,
//     };
//     onAddWatched(newMovie);
//     CloseMovie();
//   }

//   useKey("Escape", CloseMovie);

//   useEffect(
//     function () {
//       setIsLoading(true);
//       async function getMovieDetails() {
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         setMovieData(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(() => {
//     document.title = `MOVIE: ${title ? title : "loading..."}`;
//     return function () {
//       document.title = "usePopcorn";
//       console.log(`clean up effect for the movie ${title}`);
//     };
//   }, [title]);

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={CloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${title}}`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐</span>
//                 {imdbRating} IMDB rating
//               </p>
//             </div>
//           </header>

//           <section>
//             <div className="rating">
//               {!alreadyWatch ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   {" "}
//                   😒 You rated this already {watchedRating} <span>⭐😎</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function Movie({ movie, sectedMovie }) {
//   return (
//     <li key={movie.imdbID} onClick={() => sectedMovie(movie.imdbID)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }
// function WatchedMovieList({ watched, deleteWatched }) {
//   return (
//     <ul className="list">
//       {watched.map((movie, key) => (
//         <WatchedMovie
//           film={movie}
//           key={key}
//           handleDeleteWatched={deleteWatched}
//         />
//       ))}
//     </ul>
//   );
// }

// function WatchedMovie({ film, handleDeleteWatched }) {
//   return (
//     <li key={film.imdbID}>
//       <img src={film.poster} alt={`${film.title} poster`} />
//       <h3>{film.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{film.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{film.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{film.runtime} min</span>
//         </p>

//         <button
//           className="btn-delete"
//           onClick={() => handleDeleteWatched(film.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>
//   );
// }

// use pop corn code end

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) return;
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { error, position, isLoading, getPosition };
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const {
    isLoading,
    error,
    getPosition,
    position: { lat, lng },
  } = useGeoLocation();

  // const { lat, lng } = position;

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <button onClick={handleClick} disabled={isLoading}>
            Get My Position
          </button>
        </div>
        <div>
          {isLoading && <h4>Loading...</h4>}
          {error && <p>{error}</p>}
          {!isLoading && !error && lat && lng && (
            <p>
              Your GPS position is :{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}
`}
              >
                {lat},{lng}
              </a>
            </p>
          )}
        </div>
        <h4>You requested position {countClicks} times</h4>
      </div>
    </>
  );
}
