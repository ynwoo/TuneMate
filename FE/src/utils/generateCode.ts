import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '@env';
import pkceChallenge from 'react-native-pkce-challenge';
import { SPOTIFY_SCOPES } from '@/constants/spotify';

const redirectToAuthCodeFlow = async () => {
  const { codeChallenge, codeVerifier } = pkceChallenge();

  await AsyncStorage.setItem('verifier', codeVerifier);

  const params = new URLSearchParams();
  params.append('client_id', SPOTIFY_CLIENT_ID);
  params.append('response_type', 'code');
  // params.append('redirect_uri', SPOTIFY_REDIRECT_URI);
  // params.append('redirect_uri', 'http://tunemate.co.kr');
  // params.append('redirect_uri', 'https://tunemate-be9fb.web.app/callback');
  params.append('redirect_uri', 'https://tunematebe9fb.page.link/link');
  // params.append(
  //   'redirect_uri',
  //   'https://k9a603.p.ssafy.io/api/v1/user-service/login/oauth2/code/spotify',
  // );
  params.append('scope', SPOTIFY_SCOPES);
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', codeChallenge);

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export { redirectToAuthCodeFlow };
