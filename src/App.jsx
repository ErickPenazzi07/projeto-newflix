import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import logo from "./assets/Logotipo Moda Loja Minimalista Preto e Branco.png";
import lupa from "./assets/search.svg";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
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

  //Utilizando chave de API do arquivo .env
  // const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiKey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Alimentando com dados para não ficar nulo com useEffect
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  //criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //alimentando o movies
    setMovies(data.Search);
  };

  //e = evento | ao clicar ou digitar acontece algo
  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  return (
    <>
      <div className="text-center text-md-center p-2 m-0 mx-auto d-flex flex-column">
        <img className="mt-1 d-flex rounded mx-auto d-block " style={{
          height: "500px",
          width: "500px",
          alignContent: "center",
        }} src={logo} alt="Logo" />

        <div className="input-group mb-3 display-flex">
          <input
            className="form-control display-flex curvas bg-dark"
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Pesquise por filmes"
          />

          <img
            onClick={() => searchMovies(search)}
            className="display-flex m-2"
            src={lupa}
            alt="lupa"
          />
        </div>

        {movies?.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {movies.map((movie, index) => (
              <MovieCard key={index} apiUrl={apiUrl} {...movie} />
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
