import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

const MyCard = () => {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-7"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          The Eras tour
        </p>
        <h4 className="text-white/90 font-medium text-xl">
          Taylor en Argentina
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src="https://soombaradio.com/wp-content/uploads/2023/11/654a5bb6c1566.jpg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 white:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/100">Estadio Monumental</p>
            <p className="text-tiny text-white/60">
              Disfrutá de lo mejor con Taylor Swift.
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { MyCard };
