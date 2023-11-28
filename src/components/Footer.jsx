import LogoVentra from "../assets/imgs/logo-blanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark h-[200px] flex justify-evenly items-center">
      <ul>
        <li className="hover:text-lightblue">
          <Link to="/crear-evento">Crear evento</Link>
        </li>
        <li className="hover:text-lightblue">
          <Link to="/help">Preguntas frecuentes</Link>
        </li>
        <li className="hover:text-lightblue">Términos y Condiciones</li>
      </ul>
      <img src={LogoVentra} alt="logo ventra" className="w-40" />
      <div>
        <Link
          className="flex gap-2 items-center hover:text-lightblue"
          to="https://www.instagram.com/ventra.ar/"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ fontSize: "20px" }}
            className="hover:text-lightblue"
          />
          <p className="text-lg">ventra.ar</p>
        </Link>
        <Link className="flex gap-2 items-center hover:text-lightblue" to="">
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ fontSize: "20px" }}
            className="hover:text-lightblue"
          />
          <p className="text-lg">info@ventra.com.ar</p>
        </Link>
      </div>
    </footer>
  );
}

export { Footer };
