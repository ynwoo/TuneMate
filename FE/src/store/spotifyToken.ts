import { atom, selector } from 'recoil';
import { SpotifyToken } from '@/types/spotify';

const spotifyTokenState = atom<SpotifyToken | undefined>({
  key: 'spotifyTokenState',
  default: undefined,
});

const spotifyAccessTokenState = selector<string | undefined>({
  key: 'spotifyAccessTokenState',
  get: ({ get }) => {
    const spotifyToken = get(spotifyTokenState);
    return spotifyToken?.access_token;
  },
});

export { spotifyTokenState, spotifyAccessTokenState };
