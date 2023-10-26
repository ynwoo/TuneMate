import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { SPOTIFY_CLIENT_ID } from '@env';
import { spotifyTokenState } from '@/store/spotifyToken';
import { SpotifyToken } from '@/types/spotify';
import { getSpotifyToken } from '@/api/spotify';

const codeInit =
  'AQCwmsy84sb2YG1Cs6W8kCA1obeMH-z8ol9h8_8RmXP9CL2SPvv2cQkHp71IDRsMGdAIZcpO5NrrSD2Zzr8U0a-Nc2xTSoHY8SB0VP22294yijV2gNZaHmXsEHN2LI4OBUR6_dxBvYVzPIVRvfI74JyKCUDV91qmB2Dbfw7brxaW8KK8wEfSlrTikvC3sQsQb_-Y2Unv7PJTEwgAgVv52LHZRfLT8RfVnEbEphXrCWFtPUPMSeMKHAjTGlS4BgFpbg4TIYDvCY-uYJgAylbU_KGDmd06bDdNHA';

const useSpotifyTokenMutation = (
  code: string = codeInit,
  clientId: string = SPOTIFY_CLIENT_ID,
) => {
  const setSpotifyTokenState = useSetRecoilState(spotifyTokenState);
  const mutation = useMutation<SpotifyToken>({
    mutationFn: () => getSpotifyToken(clientId, code),
    mutationKey: ['useSpotifyTokenMutation', { clientId, code }],
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
