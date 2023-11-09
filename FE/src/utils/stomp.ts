import { SOCKET_URL } from "@/constants/url";
import { Friend } from "@/types/social";
import { MessageRequest } from "@/types/chat";
import { Client } from "@stomp/stompjs";
import { Storage } from "./storage";

export const Stomp = Object.freeze({
  connect(onConnect?: () => void) {
    const accessToken = Storage.getAccessToken();
    const client = new Client({
      brokerURL: `${SOCKET_URL.brokerURL()}?Authorization=${accessToken}`,
      reconnectDelay: 2000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onStompError = (data) => {
      console.error(data);
    };
    if (onConnect) {
      client.onConnect = onConnect;
    }
    client.activate();

    return client;
  },

  disconnect(client: Client) {
    client.deactivate();
  },

  subscribe(
    client: Client,
    relationId: Friend["relationId"],
    callback: (data: any) => void
  ) {
    const subscribeUrl = SOCKET_URL.subscribeURL(relationId);
    client.subscribe(subscribeUrl, callback);
  },

  publish(client: Client, messageRequest: MessageRequest) {
    const publishURL = SOCKET_URL.publishURL();
    client.publish({
      destination: publishURL,
      body: JSON.stringify(messageRequest),
    });
  },
});
