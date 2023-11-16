import { MessageRequest } from "@/types/chat";
import { Client } from "@stomp/stompjs";
import { Storage } from "./storage";
import { FriendRequestMessage } from "@/types/social";

export const Stomp = Object.freeze({
  connect(client: any, url: string, onConnect: () => void) {
    if (client.current) {
      console.log("client가 이미 존재합니다.");
      return;
    }

    const accessToken = Storage.getAccessToken();
    const newClient = new Client({
      brokerURL: `${url}?Authorization=${accessToken}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        onConnect();
        client.current = newClient;
        console.log("client 생성 완료", client.current);
      },
      onStompError: (data) => {
        console.error(data);
      },
    });

    newClient.activate();
    console.log("connect 실행", client.current);
  },

  disconnect(client: Client) {
    client.deactivate();

    console.log("disconnect 실행", client);
  },

  subscribe(client: Client, url: string, callback: (data: any) => void) {
    client.subscribe(url, callback, { id: url });

    console.log("subscribe 실행", url);
  },

  unsubscribe(client: Client, url: string) {
    client.unsubscribe(url);

    console.log("unsubscribe 실행", url);
  },

  publish(
    client: Client,
    url: string,
    message: MessageRequest | FriendRequestMessage
  ) {
    client.publish({
      destination: url,
      body: JSON.stringify(message),
    });

    console.log("publish 실행", url);
  },
});
