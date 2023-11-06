import React from "react";
import Props from "@/types";
import Image from "next/image";
import styles from "./ProfileImage.module.css";
import { classNameWrapper } from "@/utils/className";

interface ProfileImageProps extends Props {
  src: string;
  alt: string;
  type: "recommendation" | "friend" | "profile";
  onClick?: () => void;
}

const ProfileImage = ({
  src,
  alt,
  type,
  className,
  onClick,
}: ProfileImageProps) => {
  return (
    <div
      className={classNameWrapper(
        className,
        styles["profile-image"],
        styles[type]
      )}
      onClick={onClick}
    >
      <Image src={src} alt={alt} objectFit="cover" width={100} height={100} />
    </div>
  );
};

export default ProfileImage;
