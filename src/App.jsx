import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./scss/styles.scss";
import { useEffect, useState } from "react";
import logo from "./assets/Logotipo Moda Loja Minimalista Preto e Branco.png";
import lupa from "./assets/search.svg";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const mudaTema = () => {
    const tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-bs-theme", tema);
  };

  mudaTema();

  // Adiciona o evento de mudança de tema automaticamente
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", mudaTema);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const apiUrl = "https://api.themoviedb.org/3";

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    fetchMovies(
      "/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc"
    );
  }, []);

  const searchMovies = (title) => {
    fetchMovies(
      `/search/movie?query=${title}&include_adult=false&language=pt-BR&page=1`
    );
  };

  return (
    <>
      <div className="text-center text-md-center p-2 m-0 mx-auto d-flex flex-column ">
        <img className="mt-1 d-flex rounded mx-auto d-block " style={{
          height: "500px",
          width: "500px",
          alignContent: "center",
        }} src={logo} alt="Logo" />

        <div className="input-group mb-3 d-flex flex-wrap justify-content-center">
          <input
            className="d-flex curvas m-2 p-3  " style={{
              width: "800px",
              height: "50px",
              borderRadius: "10px",
              border: "none",
              alignItems: "center",
            }}
            onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Pesquise por filmes..."
          />
          <img
            onClick={() => searchMovies(search)}
            className="m-2 d-flex justify-content-end lupa"
            src={lupa}
            alt="lupa"
          />
        </div>

        {movies?.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {movies.map((movie, index) => (
              <MovieCard
               key={index}
               {...movie}
              />
            ))}
          </div>
        ) : (
          <h2 className="empty">😢 Filme não encontrado 😢</h2>
        )}
        <Footer
          devName=" Deverick"
          devLink="https://github.com/ErickPenazzi07"
        />
      </div>
    </>
  );
};

export default App;