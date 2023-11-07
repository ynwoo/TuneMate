import { useRouter } from "next/router";

export default function Album({ albumUrl }) {
  const router = useRouter();
  // const { albumUrl } = router.query;

  // albumUrl 디코딩
  const decodedAlbumUrl = decodeURIComponent(albumUrl);

  return (
    <div>
      <img src={decodedAlbumUrl} alt="Album Art" />
    </div>
  );
}
