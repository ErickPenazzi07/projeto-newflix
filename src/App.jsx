import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import logo from './assets/Logotipo Moda Loja Minimalista Preto e Branco.png'
import lupa from './assets/search.svg' 
import Footer from "./components/footer/Footer"
import { useEffect, useState } from "react"
import MovieCard from "./components/MovieCard/MovieCard"

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);




    //Utilizando chave de API do arquivo .env
  // const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiKey = "";
  const apiUrl = ``;

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
    <div>
<img  className='mt-0  img-fluid ' src={logo} alt="Logo" />

<div className="input-group mb-3 display-flex"> 
  <input className="form-control display-flex curvas" 
  onKeyDown={handleKeyPress}
   onChange={(e) => setSearch(e.target.value)}
  type="text"
  placeholder="Pesquise por filmes" />

  <img onClick={() => searchMovies(search)} className='display-flex m-2' src={lupa} alt="lupa" />
</div>

<MovieCard/>


<Footer devName=" Deverick" devLink="https://github.com/ErickPenazzi07" />


</div>
</>
  )

  
}

export default App
