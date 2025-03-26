import styles from "./MovieCard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useState } from "react";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
<div
  className={`movie card position-relative overflow-hidden border-0 shadow-lg rounded ${styles.shadow}`}
  style={{
    width: "310px",
    height: "460px",
    margin: "1.5rem",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  
  }}
  onClick={toggleModal}
>
  <img
    src={props.Poster}
    className="card-img"
    alt={props.Title}
    style={{ transition: "transform 0.3s ease-in-out" }}
  />
  <div className="card-body position-absolute bottom-0 start-0 end-0 bg-dark p-4">
    <p className="text-bg-dark">{props.Year}</p>
    <div>
      <span className="text-uppercase fs-6 fw-bold text-light">
        {props.Type}
      </span>
      <h3 className="mt-2 text-warning border-top pt-2">{props.Title}</h3>
    </div>
  </div>
</div>
      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieId={props.imdbID}
          click={toggleModal}
        />
      )}
    </>
  );

  
};
export default MovieCard;
