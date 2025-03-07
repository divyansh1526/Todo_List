import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handlecheck = (e) => {
    let i = e.target.name;
    let newtodos = todos.map((item) =>
      item.id === i ? { ...item, iscompleted: !item.iscompleted } : item
    );
    settodos(newtodos);
  };

  const handleadd = () => {
    if (todo.trim()) {
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
      settodo("");
    }
  };

  const handleedit = (id) => {
    let t = todos.find((item) => item.id === id);
    settodo(t.todo);
    settodos(todos.filter((item) => item.id !== id));
  };

  const handledelete = (id) => {
    settodos(todos.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="cont bg-violet-100 mt-9 w-3/4 mx-auto min-h-[80vh]">
        <div className="add p-5">
          <h2 className="text-center font-bold text-2xl underline italic">ADD TODO</h2>
          <div className="info mt-9 flex justify-center gap-15">
            <input
              className="w-1/2 bg-white rounded-md border hover:bg-gray-100 p-2"
              type="text"
              value={todo}
              onChange={(e) => settodo(e.target.value)}
            />
            <button onClick={handleadd} className="bg-violet-700 font-bold cursor-pointer hover:bg-violet-900 text-white p-3 py-1 rounded-md">
              SAVE
            </button>
          </div>
          <div className="tasks mt-9">
            <h2 className="text-center font-bold text-2xl mb-10">Your tasks</h2>
            <div className="todos">
              {todos.length === 0 && <h2 className="text-center font-bold text-2xl">No Todos To Display</h2>}
              {todos.map((item) => (
                <div key={item.id} className="todo flex justify-between mt-5 ml-25 mr-25 gap-25">
                  <div className="sentence flex gap-8">
                    <input
                      name={item.id}
                      checked={item.iscompleted}
                      className="mb-0.75 w-4"
                      onChange={handlecheck}
                      type="checkbox"
                    />
                    <span className={`break-words font-bold max-w-[375px] ${item.iscompleted ? "line-through" : ""}`}>
                      {item.todo}
                    </span>
                  </div>
                  <div className="func flex gap-3 items-center">
                    <button onClick={() => handleedit(item.id)} className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white p-3 py-1 rounded-md font-bold max-h-10">
                      EDIT
                    </button>
                    <button onClick={() => handledelete(item.id)} className="bg-red-700 max-h-10 cursor-pointer hover:bg-red-800 text-white p-3 py-1 rounded-md font-bold">
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
