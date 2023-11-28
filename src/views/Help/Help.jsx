import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

function Help() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-pattern">
      <div className="w-3/5">
        <h1 className="text-3xl text-left mb-4 text-green">
          Preguntas frecuentes
        </h1>
        <div className="flex justify-center items-center w-full bg-opacity">
          <Accordion variant="light" className="border rounded-2xl p-8">
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 4" title="Accordion 4">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

export { Help };
