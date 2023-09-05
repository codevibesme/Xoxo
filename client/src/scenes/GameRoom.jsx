const GameRoom = () => {
    const boxes = [
        {
            id: 0,
            css: 'border-s-0 border-t-0 border-b-0',
            value:"",
        },
        {
            id: 1,
            css: 'border-s-0 border-t-0 border-e-0 border-b-0',
            value:"",
        },
        {
            id: 2,
            css: 'border-e-0 border-t-0 border-b-0',
            value:"",
        },
        {
            id: 3,
            css: 'border-s-0 border-b-0',
            value:"",
        },
        {
            id: 4,
            css: 'border-s-0 border-e-0 border-b-0',
            value:"",
        },
        {
            id: 5,
            css: 'border-e-0 border-b-0',
            value:"",
        },
        {
            id: 6,
            css: 'border-s-0 border-b-0',
            value:"",
        },
        {
            id: 7,
            css: 'border-s-0 border-e-0 border-b-0',
            value:"",
        },
        {
            id: 8,
            css: 'border-e-0 border-b-0',
            value:"",
        },
    ];
    return (
        <div className="flex flex-col w-screen h-screen justify-center">
            <div className="flex mx-auto w-fit bg-confetti bg-cover mb-6">
                <div className="flex flex-col justify-end me-4">
                    <img src="" alt="img" className="h-16 w-16 rounded-md" />
                </div>
                <h1 className="text-xl lg:text-2xl text-gradient">Name1's turn</h1>
            </div>
            <div className="grid grid-cols-3 w-4/5 md:w-1/3 min-h-fit mx-auto mb-6">
                {boxes.map(box => (
                    <div key={box.id} className={`border-black border-2 h-20 md:h-28 ${box.css} flex flex-col justify-center text-center text-4xl md:text-6xl hover:bg-rose-100`}>
                        {/* <span className=" text-green-600">O</span> */}
                        <span className=" text-red-600">X</span>
                    </div>
                ))}
            </div>
            <button className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto">Play Again</button>
            <button className="w-1/3 h-12 rounded-lg bg-red-400 text-yellow-200 hover:scale-105 hover:shadow-md hover:shadow-red-200 mb-8 mx-auto">Leave</button>
        </div>
    )
}
export default GameRoom;