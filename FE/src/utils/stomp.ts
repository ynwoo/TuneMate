import { SOCKET_URL } from "@/constants/url";
import { Friend } from "@/types/social";
import { MessageRequest } from "@/types/chat";
import { Client } from "@stomp/stompjs";
import { Storage } from "./storage";

export const Stomp = Object.freeze({
  connect(
    client: any,
    relationIds?: Friend["relationId"][],
    subscibeCallback?: (data: any) => void
  ) {
    console.log("relationIds", relationIds);

    const accessToken = Storage.getAccessToken();
    client.current = new Client({
      brokerURL: `${SOCKET_URL.brokerURL()}?Authorization=${accessToken}`,
      reconnectDelay: 2000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("웹소켓 연결 성공!!!", client.current);
        if (relationIds && subscibeCallback) {
          relationIds.forEach((relationId) => {
            Stomp.subscribe(client.current, relationId, subscibeCallback);
            console.log(`${relationId}번 방 연결 성공`);
          });
        }
      },
      onStompError: (data) => {
        console.error(data);
      },
    });

    client.current.activate();
    console.log("connect 실행", client.current);
  },

  disconnect(client: Client) {
    client.deactivate();

    console.log("disconnect 실행", client);
  },

  subscribe(
    client: Client,
    relationId: Friend["relationId"],
    callback: (data: any) => void
  ) {
    const subscribeUrl = SOCKET_URL.subscribeURL(relationId);
    client.subscribe(subscribeUrl, callback);

    console.log("subscribe 실행", client);
  },

  publish(client: Client, messageRequest: MessageRequest) {
    const publishURL = SOCKET_URL.publishURL();
    client.publish({
      destination: publishURL,
      body: JSON.stringify(messageRequest),
    });

    console.log("publish 실행", client);
  },
});
