import { useState, useEffect } from "react";

export default function Stopwatch() {
    const [time, setTime] = useState(0); 
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                setTime((prev) => prev + 10); 
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running]);

    const formatTime = () => {
        const ms = ("0" + ((time / 10) % 100)).slice(-2);
        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
        const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
        return `${minutes}:${seconds}:${ms}`;
    };

    return (
        <div className="p-6 bg-gray-100 rounded-xl w-[200px] text-center flex flex-col items-center gap-4 w-full ">
            <h1 className="text-xl font-bold mb-4">{formatTime()}</h1>

            <button
                onClick={() => setRunning(true)}
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
                Start
            </button>

            <button
                onClick={() => setRunning(false)}
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
            >
                Stop
            </button>

            <button
                onClick={() => {
                    setRunning(false);
                    setTime(0);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded"
            >
                Reset
            </button>
        </div>
    );
}
