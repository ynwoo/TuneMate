import Props from "@/types";
import { PlayList } from "@/types/playList";
import { classNameWrapper } from "@/utils/className";
import styles from "./FriendPlayList.module.css";
import useFriendPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useFriendPlayListRepresentativeQuery";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import usePlayList from "@/hooks/usePlayList";

interface FriendPlayListProps extends Props {
  playListId: PlayList["id"];
}

const FriendPlayList = ({ playListId, className }: FriendPlayListProps) => {
  const { data: friendPlayList } = useFriendPlayListRepresentativeQuery(playListId);
  const { changePlayList } = usePlayList();

  return (
    <ul className={classNameWrapper(styles["friend-play-list"], className)}>
      {friendPlayList?.tracks.items?.map(({ track }, index) => (
        <li key={track.uri} className={styles["friend-play-list__item"]}>
          <ConcertImage
            src={track.album.images[0].url}
            alt={track.name}
            type="small"
            onClick={() => changePlayList(friendPlayList, index)}
          />
        </li>
      ))}
    </ul>
  );
};

export default FriendPlayList;
