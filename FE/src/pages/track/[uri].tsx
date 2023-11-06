import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "c8e6cccf84bd478eb050941460eb765f",
});

export async function getStaticPaths() {
  return {
    paths: [], // 경로는 미리 알 수 없으므로 빈 배열
    fallback: "blocking", // 경로가 생성되면 페이지가 정적으로 생성되어야 함
  };
}

export async function getStaticProps({ params }) {
  const { uri } = params;

  // Spotify에서 앨범 정보를 가져오는 코드
  const albumInfo = await spotifyApi.getAlbum(uri);

  return {
    props: {
      albumInfo: albumInfo.body,
    },
    revalidate: 60, // 60초마다 페이지를 다시 생성
  };
}

export default function TrackPage({ albumInfo }) {
  const { images } = albumInfo;

  return (
    <div>
      <h1>Album Images</h1>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={`Album Image ${index}`} />
      ))}
    </div>
  );
}
