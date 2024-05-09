import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRating';
//import './index.css';
//import App from './App';

function Test()
{
  const [movieRating, SetMovieRating] = useState(0);

  return (
    <div>
      <StarRating 
        color="blue"
        maxRating={10}
        OnSetRating={SetMovieRating}
      />
      <p> This movie was rated {movieRating} stars </p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StarRating 
    maxRating={5} 
    messages={["Terrible", "Bad", "Ok", "Good", "Amazing"]}
    defaultRating={4}/>
    <Test/>
  </React.StrictMode>
);