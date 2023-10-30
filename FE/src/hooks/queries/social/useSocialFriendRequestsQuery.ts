import { getSocialFriendRequests } from '@/api/social';
import { FriendRequest } from '@/types/social';
import { useQuery } from '@tanstack/react-query';

const useSocialFriendRequestsQuery = () => {
  const query = useQuery<FriendRequest[]>({
    queryKey: ['useSocialFriendRequestsQuery'],
    queryFn: getSocialFriendRequests,
  });

  return query;
};

export default useSocialFriendRequestsQuery;
