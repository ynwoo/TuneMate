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
  params.append('redirect_uri', 'http://10.0.2.2:8081/callback');
  params.append('scope', SPOTIFY_SCOPES);
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', codeChallenge);

  console.log('redirectToAuthCodeFlow', params.toString());

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export { redirectToAuthCodeFlow };
