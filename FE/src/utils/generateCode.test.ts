import { redirectToAuthCodeFlow } from './generateCode';

test('redirectToAuthCodeFlow test', async () => {
  const uri = await redirectToAuthCodeFlow();
  expect(uri).toContain('https://accounts.spotify.com/authorize?');
  expect(uri).toContain('response_type=code');
});
