import { useState } from "react";
import socket from "../socket";
import { useNavigate } from "react-router";
import {useDispatch} from "react-redux";
import { setId, setName as sName, setRoom as sRoom } from "../slices/playerSlice";
const RoomModal = ({action}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [isFull, setIsFull] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRoom= () => {
        let r;
        if( action==="create" ) {
            r = Math.floor(Math.random()*100)+1;
            setRoom(r.toString());
        }
        else r = room;
        socket.emit("join_room", {room: r.toString(), name});
    }
    socket.on("full", (data) => {
        setIsFull(data.full);
    });
    socket.on("success", (data) => {
        dispatch(sName({name}));
        dispatch(sRoom({room}));
        if(action==="create")
            dispatch(setId({id: 1}));
        else dispatch(setId({id: 2}));
        navigate(`/game/${data.room}`);
    })
    return (
        <div className=" relative h-full min-w-full mx-auto border-2 border-red-400 rounded-lg flex flex-col p-5">
            <h1 className="text-5xl bg-gradient-to-r from-red-500 to-yellow-500 text-center text-transparent bg-clip-text font-bold mb-6">
                {action === "create" ? 
                    "Create a Room" : "Join a room"
                }
            </h1>
            {isFull ? <h1 className="text-red-800 font-light text-center text-4xl mb-4">Room is Full!</h1>: ""}
            <input placeholder="Enter a nickname" className="text-2xl px-4 rounded-md h-12 w-4/5 border border-red-400 mx-auto mb-4" onChange={(e)=>setName(e.target.value)} />
            {action === "join" && <input placeholder="Enter Room Id" className="text-2xl px-4 rounded-md h-12 w-4/5 border border-red-400 mx-auto mb-6" onChange={(e) => setRoom(e.target.value)} onFocus={()=>setIsFull(0)} />}
            <button className="w-4/5 h-12 rounded-lg text-2xl bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto" onClick={handleRoom}>
                {action === "create" ?
                    "Create" : "Join"
                }
            </button>
        </div>
    )
}
export default RoomModal;