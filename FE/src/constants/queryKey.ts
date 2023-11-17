import { ConcertSearchOption } from "@/types/concert";
import { Group, GroupSearchOptions } from "@/types/group";
import { Meeting } from "@/types/meeting";
import { PlayList } from "@/types/playList";
import { Friend } from "@/types/social";
import { UserInfo } from "@/types/user";

export const QueryKey = Object.freeze({
  // user
  useLoginQuery: () => ["useLoginQuery"],
  useReissueTokenQuery: () => ["useReissueTokenQuery"],
  useUserInfoQuery: (userId: UserInfo["userId"]) => ["useUserInfoQuery", userId],
  useAnotherUserInfoQuery: (userId: UserInfo["userId"]) => ["useAnotherUserInfoQuery", userId],

  // social
  useChatsQuery: (relationId: Friend["relationId"]) => ["useChatsQuery", relationId],
  useMyChatRoomsQuery: () => ["usemyChatRooms"],
  useSendSocialFriendRequestsQuery: () => ["useSendSocialFriendRequestsQuery"],
  useSocialFriendRequestsQuery: () => ["useSocialFriendRequestsQuery"],
  useSocialFriendsQuery: () => ["useSocialFriendsQuery"],

  //   recommendataion
  useRecommendationFriendsQuery: () => ["useRecommendationFriendsQuery"],
  useRecommendationSongsQuery: () => ["useRecommendationSongsQuery"],

  //   music
  useCommonPlayListQuery: (playlistId: string) => ["useCommonPlayListQuery", playlistId],
  useIndividualPlayListRepresentativeQuery: () => ["useIndividualPlayListRepresentativeQuery"],
  useIndividualPlayListsQuery: (userId: UserInfo["userId"]) => [
    "useIndividualPlayListsQuery",
    userId,
  ],
  useFriendPlayListRepresentativeQuery: (playlistId: PlayList["id"]) => [
    "useFriendPlayListRepresentativeQuery",
    playlistId,
  ],

  //   meeting
  useMeetingsQuery: (relationId: Meeting["relationId"]) => ["useMeetingsQuery", relationId],

  //   group
  useGroupQuery: (groupId: Group["groupId"]) => ["useGroupQuery", groupId],
  useGroupReceivedParticipationsQuery: () => ["useGroupReceivedParticipationsQuery"],
  useGroupSentParticipationsQuery: () => ["useGroupSentParticipationsQuery"],
  useGroupsQuery: (groupSearchOptions: GroupSearchOptions) => [
    "useGroupsQuery",
    groupSearchOptions,
  ],
  useMyGroupsQuery: () => ["useMyGroupsQuery"],

  //   concert
  useConcertsQuery: (concertSearchOption: ConcertSearchOption) => [
    "useConcertsQuery",
    concertSearchOption,
  ],
});
