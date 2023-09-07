import io from "socket.io-client";

const socket = io.connect("https://xoxo-ewkn.onrender.com");
export default socket;