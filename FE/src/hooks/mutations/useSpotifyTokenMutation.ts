import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { spotifyTokenState } from '@/store/spotifyToken';
import { getSpotifyToken } from '@/api/spotify';

const useSpotifyTokenMutation = () => {
  const setSpotifyTokenState = useSetRecoilState(spotifyTokenState);
  const mutation = useMutation({
    mutationFn: getSpotifyToken,
    mutationKey: ['useSpotifyTokenMutation'],
    onSuccess(data) {
      console.log(data);
      setSpotifyTokenState(data);
    },
    onError(error) {
      console.error(error);
    },
  });

  return mutation;
};

export default useSpotifyTokenMutation;
