import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./starRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={3} onSetRating={setMovieRating} />
//       <p>this movie was rated {movieRating} stars.</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* < /> */}
    {/* <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} defaultRating={3} color="red" />
    <StarRating maxRating={15} defaultRating={2} color="black" />
    <Test />; */}
    <App />
  </React.StrictMode>
);
