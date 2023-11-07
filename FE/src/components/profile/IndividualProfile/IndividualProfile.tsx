import React from "react";
import Props from "@/types";
import styles from "./IndividualProfile.module.css";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import NameBar from "../NameBar/NameBar";

interface IndividualProfileProps extends Props {
  src: string;
  name: string;
}

const IndividualProfile = ({ src, name }: IndividualProfileProps) => {
  return (
    <div className={styles["individual-profile"]}>
      <ProfileImage src={src} alt="profile-img" type={"profile"} />
      <NameBar name={name} />
    </div>
  );
};

export default IndividualProfile;
