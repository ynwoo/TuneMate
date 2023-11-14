import React from "react";
import Props from "@/types";
import Image from "next/image";
import styles from "./ConcertImage.module.css";
import { classNameWrapper } from "@/utils/className";

interface ConcertImageProps extends Props {
  src: string;
  alt: string;
  type: "list" | "detail";
  onClick?: () => void;
}

const ConcertImage = ({
  src,
  alt,
  className,
  onClick,
  type,
}: ConcertImageProps) => {
  return (
    <div
      className={classNameWrapper(
        className,
        styles["concert-image"],
        styles[type]
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        priority
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default ConcertImage;
