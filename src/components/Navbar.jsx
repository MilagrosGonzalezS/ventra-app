import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { AuthContext } from "../context/AuthContext.jsx";
import VentraLogo from "../assets/imgs/logo-blanco.png";
import { logout } from "../index.js";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigation = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);
  const { auth } = useContext(AuthContext);
  const token = { token: auth };

  useEffect(() => {
    if (token) {
      setTokenExists(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigation("/");
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[3px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-green",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/">
            <img src={VentraLogo} alt="logo-tailus" className="w-32" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-11" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" to="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/crear-evento">
            Crear Evento
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/ayuda">
            Ayuda
          </Link>
        </NavbarItem>
      </NavbarContent>
      {tokenExists ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="mi_perfil"
                onClick={() => {
                  navigation("/mi-cuenta");
                }}
              >
                Mi Perfil
              </DropdownItem>
              <DropdownItem
                key="mis_eventos"
                onClick={() => {
                  navigation("/mis-eventos");
                }}
              >
                Mis eventos
              </DropdownItem>
              <DropdownItem
                key="mis_entradas"
                onClick={() => {
                  navigation("/mis-entradas");
                }}
              >
                Mis entradas
              </DropdownItem>
              <DropdownItem
                key="favoritos"
                onClick={() => {
                  navigation("/favoritos");
                }}
              >
                Favoritos
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={handleLogout}
                endContent={<FontAwesomeIcon icon={faRightFromBracket} />}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Button
            color="danger"
            onPress={() => {
              navigation("/iniciar-sesion");
            }}
            variant="shadow"
            endContent={<FontAwesomeIcon icon={faUser} />}
          >
            Iniciar Sesión
          </Button>
        </NavbarContent>
      )}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="text-bluelight" className="w-full" to="/" size="lg">
            Inicio
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="text-bluelight"
            className="w-full"
            to="/crear-evento"
            size="lg"
          >
            Crear Evento
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="text-bluelight" className="w-full" to="/ayuda" size="lg">
            Ayuda
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export { NavBar };
