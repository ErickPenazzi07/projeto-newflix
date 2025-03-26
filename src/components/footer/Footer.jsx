import styles from './Footer.module.css'

const Footer = (props) => {
  
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

    return (
    <footer className='text-center' >
      <p>
        Feito com ❤️ por
        <a href={props.devLink}>{props.devName}</a>
      </p>
    </footer>
    )
}

export default Footer