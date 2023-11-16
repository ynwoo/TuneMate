import React from "react";
import {
  PickTrackUriState,
  ListInfoState,
  MainplaylistState,
  AlbumArtState,
  AccessTokenState,
} from "@/store/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from "next/image";
import useUpdateIndividualPlayListMutation from "@/hooks/mutations/music/individual/useUpdateIndividualPlayListMutation";
import useIndividualPlayListRepresentativeQuery from "@/hooks/queries/music/individual/useIndividualPlayListRepresentativeQuery";
import PlaylistDetails from "./PlaylistDetails";
import Player from "./Player";

export default function PullPlayer() {
  const AlbumArt = useRecoilValue(AlbumArtState);
  const accessToken = useRecoilValue(AccessTokenState);
  const PickTrackUri = useRecoilValue(PickTrackUriState);
  const { data: individualPlayListRepresentative } =
    useIndividualPlayListRepresentativeQuery();

  return (
    <div>
      {/* {AlbumArt && (
        <Image src={AlbumArt} alt={AlbumArt} width={200} height={200} />
      )} */}
      <Player accessToken={accessToken} playTrack={PickTrackUri} />
      <div style={{ border: "1px solid black" }}>
        <PlaylistDetails playlistDetails={individualPlayListRepresentative} />
      </div>
    </div>
  );
}
