const RoomModal = ({action}) => {
    const handleRoom= () => {

    }

    return (
        <div className=" relative h-full min-w-full mx-auto border-2 border-red-400 rounded-lg flex flex-col p-5">
            <h1 className="text-5xl bg-gradient-to-r from-red-500 to-yellow-500 text-center text-transparent bg-clip-text font-bold mb-6">
                {action === "create" ? 
                    "Create a Room" : "Join a room"
                }
            </h1>
            <input placeholder="Enter a nickname" className="text-2xl px-4 rounded-md h-12 w-4/5 border border-red-400 mx-auto mb-4" />
            {action === "join" && <input placeholder="Enter Room Id" className="text-2xl px-4 rounded-md h-12 w-4/5 border border-red-400 mx-auto mb-6" />}
            <button className="w-4/5 h-12 rounded-lg text-2xl bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto">
                {action === "create" ?
                    "Create" : "Join"
                }
            </button>
        </div>
    )
}
export default RoomModal;