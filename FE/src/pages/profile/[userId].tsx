import React from "react";
import Props from "@/types";
import { UserInfo } from "@/types/user";
import IndividualProfile from "@/components/profile/IndividualProfile/IndividualProfile";

const ProfilePage = () => {
  const name = 'name';
  const imgSrc = 'https://3.bp.blogspot.com/-XKyHG9ipUuk/WxvKRN9CeYI/AAAAAAABMn8/usJ7TuHvS4s8Qff7wFV6iY6vtRwM3bQwgCLcBGAs/s400/music_headphone_man.png';
  return (
    <div>
      <IndividualProfile name={name} src={imgSrc} />
    </div>
  );
};

export default ProfilePage;
