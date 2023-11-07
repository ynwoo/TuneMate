import React, { useEffect, useState } from "react";
import Dashboard from "../components/player/Dashboards";
import axios from "axios";

const accessToken =
  "BQDAb4CQx1kT1cI_VDT0yzLKq06Vq43z7n6Z2N1lQ8f-Ojj_y62VKAF8-UzizzAiA68PVtWzrDGWsaimkkx72T9gL1gWvcRHCuQ0NY82yj-LEwSOx_eAzB7CVEUWyh9Olx5_IjAwmwGjH_-yz6F2WAw9tpDE2IJPbynitJmiiKcw_Hez8xoB67usaiRx8_jvtHgXlXHZXp2uUigMLlMtXVV5dwhRBGjTiMMl36upxbmrFLDL8ddH4hIPo1eKbtOD4A9O_OmYNmi9oxXwm46uW0iOuMoa6iNmqIrK-dRd1zs";

const MainPage: React.FC = () => {
  return (
    <div>
      <Dashboard accessToken={accessToken} />
    </div>
  );
};

export default MainPage;
