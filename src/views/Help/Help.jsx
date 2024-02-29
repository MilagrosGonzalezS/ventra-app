import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import colors from "../../assets/imgs/recurso-colores.png";
import helpImg from "../../assets/imgs/help-image.png";

function Help() {
  return (
    <main className="bg-myaccount min-h-screen md:px-20 px-10 grid grid-cols-12 gap-x-10">
      <h1 className="h-fit font-accent font-medium text-3xl mx-auto col-span-full mt-32 mb-4">
        Preguntas frecuentes
      </h1>
      <div className="col-span-full mx-auto">
        <img src={colors} />
      </div>
      <div className="col-span-12 flex gap-8 bg-opacity">
        <div className="w-1/3">
          <img src={helpImg} alt="simpatico emoji sobre ayuda" />
        </div>
        <div className="flex justify-center items-center w-2/3">
          <Accordion variant="light" className="border rounded-2xl p-8">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="¿Cómo creo mi evento?"
            >
              Para crear tu evento primero tenés que crear tu cuenta e iniciar
              sesión. Luego simplemente ingresás a "Crear evento" y ahí vas a
              encontrar un formulario para ingresar todos los datos del evento.
              Por último, le das click a "crear evento" y el evento será creado
              instantaneamente.
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="¿Dónde puedo ver los eventos que creé?"
            >
              Todos los eventos que hayas creado, sean públicos o privados,
              podrás encontrarlos en "Mis eventos", que se encuentra en el menú
              desplegable de la derecha.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="¿Dónde están las entradas que compré?"
            >
              Todas las entradas que hayas comprado, podrás encontrarlas en "Mis
              entradas", que se encuentra en el menú desplegable de la derecha.
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="¿Puedo cambiar mi nombre de usuario?"
            >
              Para cambiar tu nombre de usuario solo tenés que acceder a "Mi
              perfil" que se encuentra en el menú desplegable de la derecha. Ahí
              encontrarás tus datos y un botón que dice "Editar mis datos".
              Luego, solo tenés que cambiar lo que quieras y hacer click en
              "Editar datos" para ver los cambios.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

export { Help };
