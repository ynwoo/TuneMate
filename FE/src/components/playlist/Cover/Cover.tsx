import React from "react";
import Props from "@/types";
import Image from "next/image";

interface CoverProps extends Props {
  src: string;
  alt: string;
}

const Cover = ({ src, alt }: CoverProps) => {
  return (
    <Image src={src} alt={alt} width={100} height={100}/>
  );
};

export default Cover;