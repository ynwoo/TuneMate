// const RequestItem = () => {
//     const router = useRouter();
//     const { mutate: acceptFriendRequest } = useAcceptSocialFriendRequestMutation();
//     const { mutate: declineFriendRequest } = useDeclineSocialFriendRequestMutation();
//     const { mutate: sendSocialFriendRequest } = useSendSocialFriendRequestMutation();

//     const { isFriendRequest, onAccept, onDecline } = useMemo(() => {
//       const isFriendRequest = item.musicalTasteSimilarity ? true : false;
//       const onAccept = (e: MouseEvent<HTMLButtonElement | HTMLElement>) => {
//         e.stopPropagation();
//         if (isFriendRequest) {
//           // 친구 요청 수락
//           acceptFriendRequest(item.userId);
//         } else {
//           const { userId, distance, musicalTasteSimilarity } = item;

//           // 친구 요청 보내기
//           // TODO: 친구 요청 중복 제거 구현 필요
//           sendSocialFriendRequest({
//             userId,
//             distance: distance,
//             musicalTasteSimilarity: String(musicalTasteSimilarity),
//           });
//         }
//       };
//       const onDecline = (e: MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();
//         declineFriendRequest(item.userId);
//       };
//       return {
//         isFriendRequest,
//         onAccept,
//         onDecline,
//       };
//     }, [item, acceptFriendRequest, declineFriendRequest, sendSocialFriendRequest]);
//     return
// };
