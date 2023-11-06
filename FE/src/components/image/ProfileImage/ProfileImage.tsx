import React from "react";
import Props from "@/types";
import Image from "next/image";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps extends Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ProfileImage = ({ src, alt, width, height }: ProfileImageProps) => {
  return <Image src={src} alt={alt} width={width} height={height} />;
};

export default ProfileImage;
