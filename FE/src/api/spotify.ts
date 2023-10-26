import { SPOTIFY_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpotifyToken, UserProfile } from '@/types/spotify';
import { spotifyApi, spotifyTokenApi } from '.';
import { isString } from '@/utils/typeCheck';
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from '@/utils/generateCode';

const getSpotifyToken = async (
  clientId: string,
  code: string,
): Promise<SpotifyToken> => {
  // const verifier = await AsyncStorage.getItem('verifier');
  const verifier =
    'fInbkGtp3bG11XTb7uTYYkFi2mX6WjanfvPbNpZ1GYgP6XuAEhA8Ah2JDgyfp3oBPtMvHBQ2LWZ4HFt9YTisBoRHJpjV8NwPNL8pXMr3Qvoz6UwVkLYz68Jy3TW83if7';
  console.log(verifier);
  isString(verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:8081/callback');
  params.append('code_verifier', verifier);
  console.log(params);

  // const result = await spotifyTokenApi.post<SpotifyToken>('token', params);
  // return result.data;
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await result.json();
  console.log(data);

  return data;
};

const getProfile = async (code: string): Promise<UserProfile> => {
  const result = await spotifyApi.get<UserProfile>('me', {
    headers: { Authorization: `Bearer ${code}` },
  });

  return result.data;
};

const getAccessToken = async (
  clientId: string,
  code: string,
): Promise<string> => {
  // const verifier = await AsyncStorage.getItem('verifier');
  const verifier =
    'fInbkGtp3bG11XTb7uTYYkFi2mX6WjanfvPbNpZ1GYgP6XuAEhA8Ah2JDgyfp3oBPtMvHBQ2LWZ4HFt9YTisBoRHJpjV8NwPNL8pXMr3Qvoz6UwVkLYz68Jy3TW83if7';

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:8081/callback');
  params.append('code_verifier', verifier);

  const result = await spotifyTokenApi.post<SpotifyToken>('token', params);
  return result.data.access_token;
};

const redirectToAuthCodeFlow = async (clientId: string = SPOTIFY_CLIENT_ID) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  await AsyncStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:8888/callback');
  params.append('scope', 'user-read-private user-read-email');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export { getSpotifyToken, getAccessToken, getProfile, redirectToAuthCodeFlow };
