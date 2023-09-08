import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import socket from "../socket";
import { setOpponent } from "../slices/playerSlice";
const GameRoom = () => {
    
    const [isFull, setIsFull] = useState(0);
    const name = useSelector((state) => state.name);
    const id = useSelector((state) => state.id);
    const room = useSelector((state) => state.room);
    const opponent = useSelector((state) => state.opponent);
    const [myTurn, setMyTurn] = useState(0);
    const boardRef = useRef(null);
  
    const [result, setResult]=useState(null);
    const [iWon, setIWon]=useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        if(id === 1){
            setMyTurn(1);
        } else setMyTurn(0);
    });

    socket.on("result", (data) => {
        setResult(data);

        setMyTurn(0);
        if(id === data.id){
            setIWon(1);
        } else setIWon(0);
    })

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
        
        <div className={`flex flex-col w-full h-full justify-center ${iWon===1? "bg-confetti bg-cover": ""}`}>
            <div className="flex">
                {!result && (<div className="flex mx-auto w-fit mb-6 min-h-fit">
                    {isFull ? (<h1 className="text-2xl md:text-6xl text-gradient">{myTurn===1?"Your":opponent+"'s"} turn</h1>): (<h1 className="text-2xl md:text-4xl text-gradient">Waiting for Second Player...</h1>)}
                </div>)}
                {result && (<div className="flex mx-auto w-fit mb-6 min-h-fit">
                    <h1 className="text-2xl md:text-6xl text-gradient">
                        {result.status==="Draw!" && <p className="text-2xl md:text-6xl text-gradient">{result.status}</p>}
                        {result.status!=="Draw!" ? result.id === id ? (<p className="text-2xl md:text-6xl text-gradient">You Won!<span className="text-black">😆</span></p>): (<p className="text-2xl md:text-6xl text-gradient">{opponent} Won! <span className="text-black">☹️</span></p>) : ""}
                    </h1>
                </div>)}
                <div className="flex justify-end px-4">
                    <h1 className="text-2xl md:text-4xl text-gradient">{room}</h1>
                </div>
            </div>
            
            <div ref={boardRef} className="relative w-[18rem] md:w-[28rem] min-h-fit mx-auto mb-6">  
                <div className="grid grid-cols-3 w-full min-h-fit">
                    {/* Column wise lines */}
                    { result? result.c0 ? (<svg className="absolute w-full h-full ">
                        <line x1="16.665%" y1="0" x2="16.665%" y2="100%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    
                    {result? result.c1 ? (<svg className="absolute w-full h-full">
                        <line x1="49.995%" y1="0" x2="49.995%" y2="100%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    
                    {result? result.c2 ? (<svg className="absolute w-full h-full">
                        <line x1="83.325%" y1="0" x2="83.325%" y2="100%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}

                    {result? result.r0 ? (<svg className="absolute w-full h-full">
                        <line x1="0" y1="16.665%" x2="100%" y2="16.665%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    
                    {result? result.r1 ? (<svg className="absolute w-full h-full">
                        <line x1="0" y1="49.995%" x2="100%" y2="49.995%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    
                    {result? result.r2 ? (<svg className="absolute w-full h-full">
                        <line x1="0" y1="83.325%" x2="100%" y2="83.325%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    
                    {result? result.rd ? (<svg className="absolute w-full h-full ">
                        <line x1="0" y1="0" x2="100%" y2="100%" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}

                    {result? result.ld ? (<svg className="absolute w-full h-full ">
                        <line x1="0" y1="100%" x2="100%" y2="0" className=" stroke-red-600 stroke-[3px]" />
                    </svg>): "":
                    ""}
                    {boxes.map(box => (
                        <div onClick={()=> {makeMove(box)}} key={box.i} className={`border-black border-2 h-20 md:h-28 ${box.css} flex flex-col justify-center text-center text-4xl md:text-6xl hover:bg-rose-100`}>
                            {box.v==='O' &&  (<span className=" text-green-600">{box.v}</span>) }
                            {box.v==='X' && (<span className=" text-red-600">{box.v}</span>)}
                        </div>
                    ))}
                </div>
            </div> 
            {result && <button className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto" onClick={()=>navigate("/")}>Go Home</button> }
        </div>
    )
}
export default GameRoom;