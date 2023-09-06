import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket";
import { setOpponent } from "../slices/playerSlice";
const GameRoom = () => {
    
    const [isFull, setIsFull] = useState(0);
    const name = useSelector((state) => state.name);
    const id = useSelector((state) => state.id);
    const room = useSelector((state) => state.room);
    const opponent = useSelector((state) => state.opponent);
    const [myTurn, setMyTurn] = useState(id===1? 1: 0);
    const boardRef = useRef(null);
  
    const dispatch = useDispatch();

    useEffect(()=>{
        // console.log(name, id, room);
        if(boardRef?.current){
            if(myTurn === 0)
                boardRef.current.style.pointerEvents='none';
            else boardRef.current.style.pointerEvents='auto';
        }
    }, [boardRef, myTurn]); 
    const [boxes, setBoxes] = useState([
        {
            i: 0,
            css: 'border-s-0 border-t-0 border-b-0',
            v:"",
        },
        {
            i: 1,
            css: 'border-s-0 border-t-0 border-e-0 border-b-0',
            v:"",
        },
        {
            i: 2,
            css: 'border-e-0 border-t-0 border-b-0',
            v:"",
        },
        {
            i: 3,
            css: 'border-s-0 border-b-0',
            v:"",
        },
        {
            i: 4,
            css: 'border-s-0 border-e-0 border-b-0',
            v:"",
        },
        {
            i: 5,
            css: 'border-e-0 border-b-0',
            v:"",
        },
        {
            i: 6,
            css: 'border-s-0 border-b-0',
            v:"",
        },
        {
            i: 7,
            css: 'border-s-0 border-e-0 border-b-0',
            v:"",
        },
        {
            i: 8,
            css: 'border-e-0 border-b-0',
            v:"",
        },
    ]);
    
    socket.on("begin", (data) => {
        console.log("begin")
        setIsFull(data.full);
        if(id === 1) dispatch(setOpponent({opponent: data.p2}));
        else dispatch(setOpponent({opponent: data.p1}));
    });
    socket.on("enemy_move", (data) => {
        const { i, p } = data;
        
        let mov;
        if(p === 1)
            mov = 'X';
        else mov = 'O';
        
        const newBoard = boxes.map( item => {
            if(item.i  === i){
                return {...item, v: mov}
            }
            return item;
        });
        
        setBoxes([...newBoard]);
        setMyTurn(1);
    })
    const makeMove = (box) => {
        if(box.v !== '') return;
        if(id === 1)
            box.v='X';
        else 
            box.v='O';
        let mov= id===1? 1: 0;

        socket.emit("move", {room,i:box.i, p:id, v:mov});
        setBoxes([...boxes]);
        setMyTurn(0);
    }

    return (
        <div className="flex flex-col w-full h-full justify-center">
            <div className="flex mx-auto w-fit mb-6">
                {isFull ? (<h1 className="text-2xl lg:text-6xl text-gradient">{myTurn===1?"Your":opponent+"'s"} turn</h1>): (<h1 className="text-xl-lg:text-2xl text-gradient">Waiting for Second Player...</h1>)}
            </div>
            <div ref={boardRef} className="relative w-[18rem] md:w-[28rem] min-h-fit mx-auto mb-6">  
                <div className="relative grid grid-cols-3 w-full min-h-fit">
                    {boxes.map(box => (
                        <div onClick={()=> {makeMove(box)}} key={box.i} className={`border-black border-2 h-20 md:h-28 ${box.css} flex flex-col justify-center text-center text-4xl md:text-6xl hover:bg-rose-100`}>
                            {box.v==='O' &&  (<span className=" text-green-600">{box.v}</span>) }
                            {box.v==='X' && (<span className=" text-red-600">{box.v}</span>)}
                        </div>
                    ))}
                </div>
            </div>
            
            <button className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto">Play Again</button>
            <button className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto">Leave</button>
        </div>
    )
}
export default GameRoom;