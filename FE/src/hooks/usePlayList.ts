import { PlayListContext } from "@/contexts/PlayListContext";
import { useContext } from "react";

const usePlayList = () => {
  const context = useContext(PlayListContext);
  return context;
};

export default usePlayList;
