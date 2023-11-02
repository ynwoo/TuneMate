import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/spotify';

const useSpotifyUserProfileQuery = (code: string) => {
  return useQuery({
    queryKey: ['useSpotifyUserProfileQuery', { code }],
    queryFn: () => getProfile(code),
  });
};

export default useSpotifyUserProfileQuery;
