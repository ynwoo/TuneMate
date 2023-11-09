import React from "react";
import Props from "@/types";
import Image from "next/image";
import styles from './Cover.module.css'

interface CoverProps extends Props {
  src: string;
  alt: string;
}

const Cover = ({ src, alt }: CoverProps) => {
  return (
    <div className={styles['cover']}>
      <Image src={src} alt={alt} width={100} height={100}/>
    </div>
  );
};

export default Cover;