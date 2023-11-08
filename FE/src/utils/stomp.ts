import { SOCKET_URL } from "@/constants/url";
import { Friend } from "@/types/social";
import { MessageRequest } from "@/types/chat";
import { Client } from "@stomp/stompjs";
import { Storage } from "./storage";

export const Stomp = Object.freeze({
  connect(client: any) {
    const accessToken = Storage.getAccessToken();
    client = new Client({
      brokerURL: SOCKET_URL.brokerURL(),
      connectHeaders: {
        Authorization: accessToken,
      },
      // reconnectDelay: 5000,
    });

    client.activate();
  },

  subscribe(client: Client, relationId: Friend["relationId"]) {
    const subscribeUrl = SOCKET_URL.subscribeURL(relationId);
    client.subscribe(subscribeUrl, (data) => {
      console.log(data);
    });
  },

  publish(client: Client, messageRequest: MessageRequest) {
    const publishURL = SOCKET_URL.publishURL();
    client.publish({
      destination: publishURL,
      body: JSON.stringify(messageRequest),
    });
  },
});
