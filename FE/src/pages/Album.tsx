import Props from "@/types";
import { useRouter } from "next/router";

interface AlbumProps extends Props {
  albumUrl: string;
}

export default function Album({ albumUrl }: AlbumProps) {
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
