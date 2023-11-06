import React from "react";
import Props from "@/types";
import styles from './IndividualProfile.module.css';
import ProfileImageBox from "../ProfileImageBox/ProfileImageBox";
import NameBar from "../NameBar/NameBar";

interface IndividualProfileProps extends Props {
  src: string;
  name: string;
}

const IndividualProfile = ({ src, name }: IndividualProfileProps) => {
 return (
  <div className={styles['individual-profile']}>
    <ProfileImageBox src={src} width={200} height={200} />
    <NameBar name={name} />
  </div>
 );
};

export default IndividualProfile;
