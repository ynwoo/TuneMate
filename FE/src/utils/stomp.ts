import { CONNECT_SOCKET_URL } from '@/constants/url';
import {Client} from '@stomp/stompjs';

const Stomp = Object.freeze({
    connect(client:any) {
        client.current = new Client({
            brokerURL: CONNECT_SOCKET_URL,
            onConnect: () => {
              console.log('success');
              Stomp.subscribe(client);
              Stomp.publishOnWait(client);
            },
          });
          client.current.activate();
    },

    subscribe = (client:any) => {
        client.current.subscribe(`/sub/chat/wait/${userId}`, (body) => {
          const watingRoomBody = JSON.parse(body.body) as WatingRoomBody;
          const { type, roomId: newRoomId } = watingRoomBody;
  
          if (type === 'open') {
            console.log('채팅 웨이팅 시작');
          }
  
          if (type === 'match') {
            console.log('매칭이 되었습니다!');
            subscribeAfterGetRoomId(newRoomId);
            setRoomId(newRoomId);
            setIsMatch(true);
          }
        });
      };
  
      publishOnWait = (client:any) => {
        if (!client.current.connected) return;
  
        client.current.publish({
          destination: '/pub/chat/wait',
          body: JSON.stringify({
            type: 'open',
            userId,
            selectMbti: `${selectedMbti}`,
          }),
        });
      };
})