import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [gen, setGen] = useState(null);
  const [cast, setCast] = useState([]);
  const [runtime, setRuntime] = useState(null);
  if (!movieDesc) return null;
  const imagem = `https://image.tmdb.org/t/p/original/${props.backdrop_path}`;
  const apiKey = import.meta.env.VITE_TMDB_APIKEY;
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        setRuntime(data.runtime);
        setGen(data.genres.map((genre) => genre.name));
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };
    const fetchMovieCredits = async () => {
      try {
        // Requisição para o elenco do filme
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 5).map((member) => member.name)); // Pega os 5 primeiros nomes do elenco
      } catch (error) {
        console.error("Erro ao buscar o elenco do filme:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
  }, [props.id]);

  return (
    <>
      <div className={styles.modalBackdrop} onClick={props.click}>
        <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.movieInfo}>
            <img src={imagem} className=" " style={{}} />
            <button className={styles.btnClose} onClick={props.click}>
              X
            </button>
            <div className={styles.movieType}>
              <div>
                <h1></h1>
                <a
                  href={`${"https://github.com/ErickPenazzi07"}`}
                  target="_blank"
                >
                  ▶️ Assistir
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <div className={styles.containerFlex}>
              Avaliação: {props.vote_average} | Duração: {runtime + `min`} |{" "}
              {props.release_date}
            </div>
            <div className="w-100 h-25 mt-3">
              <p>Elenco: {(cast && cast.join(", ")) || "Não disponível"}</p>
              <p>Gênero: {(gen && gen.join(", ")) || "Não informado"}</p>
            </div>
          </div>
          <div className="d-flex flex-column">
            <p> {props.overview || "Sinopse não disponível."}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDescription;
