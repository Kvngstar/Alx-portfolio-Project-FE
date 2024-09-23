import { io } from "socket.io-client";

const Socket = (token, route) => {
  try {
    const socketInst = io(`http://127.0.0.1:3000/${route}`, {
      transports: ["websocket"],
      query: { token },
    });
    return socketInst;
  } catch (error) {
    console.log("Error: Socket connection failed");
  }
};

export default Socket;
