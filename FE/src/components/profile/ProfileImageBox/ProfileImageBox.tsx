import React from 'react';
import Props from '@/types';
import ProfileImage from '@/components/image/ProfileImage/ProfileImage';
import styles from './ProfileImageBox.module.css'

interface ProfileImageBoxProps extends Props {
  src: string;
  width: number;
  height: number;
}

const ProfileImageBox = ({src, width, height}: ProfileImageBoxProps) => {
  return (
    <div className={styles["profile-image-box"]} style={{width:`${width}px`, height:`${height}px`}}>
      <ProfileImage src={src} alt='profile-img' width={width - 20} height={height - 20} />
    </div>
  );
};

export default ProfileImageBox;
