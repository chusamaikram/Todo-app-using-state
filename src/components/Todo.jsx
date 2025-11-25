
import { useState, useEffect, use } from "react";

export default function TodoApp() {

    const [newtodo, setNewtodo] = useState("");
    const [todos, setTodos] = useState(() => {
        const savedData = localStorage.getItem("todos")
        return savedData ? JSON.parse(savedData) : []
    });
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newtodo) {

            setTodos([...todos, { text: newtodo, completed: false }]);
            setNewtodo("")
        }
    }

    const handleDelete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = true;
        setTodos(updatedTodos);

    }

    return (
        <>
            <div className="max-w-[1400px] px-20 mx-auto">
                <h1 className="text-center text-6xl font-bold uppercase my-8">todo app</h1>
                <div className="py-4 flex flex-col items-center justify-start  min-h-[400px]">
                    <form className=" flex flex-col items-center gap-3" onSubmit={handleSubmit}>
                        <input className="p-4 border border-gray-400 rounded-sm"
                            type="text" placeholder="I have to..."
                            value={newtodo}
                            onChange={(e) => setNewtodo(e.target.value)} />
                        <button type="submit" className="py-2 px-3 cursor-pointer bg-blue-500 text-white rounded-sm font-semibold " >Add Todo</button>
                    </form>
                    <ul className="flex flex-col items-start gap-2 mt-4 border border-gray-300 rounded-md p-4 w-1/2 ">
                        {todos.map((todo, index) => (
                            <li key={index} className="flex items-center justify-between gap-4 py-2 w-full">
                                <span className={`${todo.completed ? "line-through" : "no-underline"}`}> {index + 1}:- I have to {todo.text}</span>
                                <button className={`py-2 px-3 font-semibold  ${todo.completed ? " bg-green-400 cursor-not-allowed" : "bg-red-400 cursor-pointer"} text-white rounded-sm`}
                                    onClick={() => handleDelete(index)}>{todo.completed ? "Completed" : "Delete"}</button>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </>
    )
}