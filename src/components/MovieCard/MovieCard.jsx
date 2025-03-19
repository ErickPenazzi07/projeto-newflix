import styles from './MovieCard.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import foto from '../../assets/Cat_November_2010-1a.jpg'
const MovieCard = () => {

  return (
    <>
    <div onClick="" className="w-100 h-100 d-flex justify-content bghover ">
    <div>
      <p className='text-bg-light'>2025</p>
    </div>

    <div>
      <img src={foto} alt="" />
    </div>

    <div>
      <span className='text-bg-light d-flex '>ação</span>
      <h3 className='text-bg-light border-top '>batman</h3>
    </div>                                          
    </div>

    </>
  )
    }
export default MovieCard