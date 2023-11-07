import React, { useEffect, useState } from "react";
import Dashboard from "../components/player/Dashboards";
import axios from "axios";

const accessToken =
  "BQCEqCB0c7JVVyKUMqnm2oESbxInKXdhHEHmhij2wDHk4fpFSHWss_z1cP1BU7m1agNo_WVUlp-RdpWo_JKkAmquYJWqvySCJ5izKlcg3roQ7-FFNrSilzXIPLaQFJG7gZwdqg88WmCxArw7eCLUqKWfztbKQKdmq_OS8gv9TcEozmkmbAzdKbGI8L7vlbjL3LWR7dClAhO759liVYVJR_Cn76L5CsIICwwDKyfPbeAUoMLJJ07O2udUU8ADhwmz-Axt9NA9eb-vqdUlHQ_bQlerIUD1H3N1wFsnX2jcrwM";

const MainPage: React.FC = () => {
  return (
    <div>
      <Dashboard accessToken={accessToken} />
    </div>
  );
};

export default MainPage;
