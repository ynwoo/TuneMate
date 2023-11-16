import React from "react";
import Props from "@/types";
import styles from "./CommonProfile.module.css";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import NameBar from "../NameBar/NameBar";
import Icon from "@/components/icons";

interface CommonProfileProps extends Props {
  srcList: string[];
  name: string;
}

const CommonProfile = ({ srcList, name }: CommonProfileProps) => {
  return (
    <div className={styles["common-profile"]}>
      <div className={styles["profile-img-zone"]}>
        <ProfileImage src={srcList[0]} alt="profile-img" type={"common-profile"} />
        <Icon.HeadPhone />
        <ProfileImage src={srcList[1]} alt="profile-img" type={"common-profile"} />
      </div>
      <NameBar name={name} />
    </div>
  );
};

export default CommonProfile;
