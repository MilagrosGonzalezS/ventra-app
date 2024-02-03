import { TermsText } from "../index.js";
import LogoVentra from "../assets/imgs/logo-blanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <footer className="bg-opacity border-t-1 md:h-[150px] flex flex-col h-[400px] py-12 md:py-0 md:flex md:flex-row justify-evenly items-center">
      <ul className="text-center md:text-left">
        <li className="hover:text-lightblue my-4 md:my-0">
          <Link to="/crear-evento">Crear evento</Link>
        </li>
        <li className="hover:text-lightblue my-4 md:my-0">
          <Link to="/help">Preguntas frecuentes</Link>
        </li>
        <li className="hover:text-lightblue my-4 md:my-0">
          <button onClick={onOpen}>Términos y Condiciones</button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Términos y condiciones.
                  </ModalHeader>
                  <ModalBody>
                    <TermsText></TermsText>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      Entendido
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </li>
      </ul>
      <img src={LogoVentra} alt="logo ventra" className="w-40 my-8 md:my-0" />
      <div className="flex flex-col items-center gap-2 md:block">
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
