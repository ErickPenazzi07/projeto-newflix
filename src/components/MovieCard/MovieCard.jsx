import styles from "./MovieCard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useState } from "react";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const poster = `https://image.tmdb.org/t/p/original/${props.poster_path}`

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
const posterUrl = props.posterPath
    ? `https://image.tmdb.org/t/p/w500${props.posterPath}`
    : "https://via.placeholder.com/500"; // Caso não tenha poster, usar uma imagem padrão.

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
          src={poster}
          className="card-img"
          alt={props.title}
          style={{ transition: "transform 0.3s ease-in-out" }}
        />
        <div className="card-body position-absolute bottom-0 start-0 end-0 bg-dark p-4">
          <p className="text-bg-dark">{''}</p>
          <div>
            <span className="text-uppercase fs-6 fw-bold text-light">
              {props.mediaType}
            </span>
            <h3 className="mt-2 text-warning border-top pt-2">{props.title}</h3>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <MovieDescription
       {...props}
          click={toggleModal}
        />
      )}
    </>
  );
};

export default MovieCard;
