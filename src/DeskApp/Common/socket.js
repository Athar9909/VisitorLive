import { io } from "socket.io-client";

const socket = io("http://ec2-3-210-230-78.compute-1.amazonaws.com:7000", {
  transports: ["websocket"],
});

export default socket;
