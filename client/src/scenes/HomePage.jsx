import { useEffect, useRef, useState } from "react";
import RoomModal from "../components/RoomModal";
const HomePage = () => {
    const [popUp, setPopUp] = useState(false);
    const [action, setAction] = useState('');
    const modalRef = useRef(null);
    const createRef = useRef(null);
    const joinRef = useRef(null);

    useEffect(() => {
        window.addEventListener('mousedown', (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setPopUp(false);
                createRef.current.style.pointerEvents='auto';
                joinRef.current.style.pointerEvents='auto';
            }
        });
        return (
            () => {
                window.removeEventListener('mousedown', (event) =>{
        
                });
            }
        )
    }, [modalRef]); //eslint-disable-line

    const openRoomModal = (e) => {
        setPopUp(true);
        createRef.current.style.pointerEvents='none';
        joinRef.current.style.pointerEvents='none';
        if(e.target.innerHTML.includes("Create"))
            setAction("create");
        else setAction("join");
        
    }

    return (
        <div className=" w-full h-full">
            <h1 className="text-5xl md:text-8xl bg-gradient-to-r from-red-500 to-yellow-500 text-center text-transparent bg-clip-text font-bold w-fit mx-auto">XOXO RIVALS</h1>
            <div className="h-full w-full relative flex justify-center">
                <div className={`h-full w-full flex flex-col p-8 ${popUp? "blur-sm": ""}`}>
                    <img src="/assets/home.jpg" alt="banner" className="h-72 w-80 mx-auto mb-8"/>
                    <button ref={createRef} className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto" onClick={openRoomModal}>Create a Room</button>
                    <button ref={joinRef} className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto" onClick={openRoomModal}>Join a Room</button>
                </div>
                {popUp && (
                    <div className="absolute w-4/5 md:w-1/3 min-h-fit top-10 bg-white mx-auto" ref={modalRef}>
                        <RoomModal action={action}/>
                    </div>
                )}
            </div>
        </div>
        
    )
}
export default HomePage;