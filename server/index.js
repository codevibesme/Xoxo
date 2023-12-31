import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(helmet({crossOriginResourcePolicy:false,}))
let games = {};
const winningLogic = (data) => {
    games[data.room].board[data.i].v=data.v;
    games[data.room].board[data.i].p=data.p;
    const x = data.v;
    const board = [...games[data.room].board];
    
    //row-wise
    if(board[0].v === x && board[1].v === x && board[2].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:1, r1:0, r2:0, c0:0, c1:0, c2:0, rd:0, ld:0});
    }
    if(board[3].v === x && board[4].v === x && board[5].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:1, r2:0, c0:0, c1:0, c2:0, rd:0, ld:0});
    }
    if(board[6].v === x && board[7].v === x && board[8].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:1, c0:0, c1:0, c2:0, rd:0, ld:0});
    }

    //Column wise
    if(board[0].v === x && board[3].v === x && board[6].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:0, c0:1, c1:0, c2:0, rd:0, ld:0});
    }
    if(board[1].v === x && board[4].v === x && board[7].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:0, c0:0, c1:1, c2:0, rd:0, ld:0});
    }
    if(board[2].v === x && board[5].v === x && board[8].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:0, c0:0, c1:0, c2:1, rd:0, ld:0});
    }

    //right diagonal
    if(board[0].v === x && board[4].v === x && board[8].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:0, c0:0, c1:0, c2:0, rd:1, ld:0});
    }

    //left diagonal
    if(board[2].v === x && board[4].v === x && board[6].v === x){
        io.to(data.room).emit("result", {status:"Won", id: data.p, r0:0, r1:0, r2:0, c0:0, c1:0, c2:0, rd:0, ld:0});
    }
    // let c=0;
    // check for draw

    let c=0;
    for(let k=0; k<board.length; k++)
        if(board[k].v===0 || board[k].v===1) c++;
    if(c===9){
        io.to(data.room).emit("result", {status:"Draw!", id: 3});
    }
}

const io = new Server(httpServer, {
    cors: {
        origin: "https://xoxo-tictac.netlify.app",
        methods:["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on("join_room", (data) => {
        if(games[data.room]?.count === 2){
            socket.emit("full", {full: 1});
            return;
        }
        if(games[data.room] === undefined)
            games[data.room] = {count: 1, p1: data.name};
        else{
            games[data.room]["p2"]=data.name;
            games[data.room] = {...games[data.room], count: games[data.room].count+1, p2: data.name, board: [{i:"0", p:"", v:""}, {i:"1", p:"", v:""}, {i:"2", p:"", v:""}, {i:"3", p:"", v:""}, {i:"4", p:"", v:""}, {i:"5", p:"", v:""}, {i:"6", p:"", v:""}, {i:"7", p:"", v:""}, {i:"8", p:"", v:""}]};
        }
        socket.join(data.room);
        io.to(data.room).emit("success", {room: data.room});
        // all users in room use io.to
        // all other users except sender use socket.to
        if(games[data.room]?.count===2) io.to(data.room).emit("begin", {p1: games[data.room].p1, p2:games[data.room].p2, full: 1});
    });

    socket.on("move", (data) => {
        const {room, i, p, v} = data;
        socket.to(data.room).emit("enemy_move", ({i, p}));
        winningLogic(data);
    });

    socket.on("disconnect", ()=>{console.log("user disconnected");});
});
httpServer.listen(process.env.PORT, () => console.log("Server running..."));