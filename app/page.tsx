"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { MoonIcon, SunIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function Home() {
  const { theme, setTheme, input, setInput, todos, setTodos, filter, setFilter } = useGlobalContext();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      if (typeof document !== "undefined") {
        document.querySelector("html")?.classList.add("dark");
      }
    } else {
      setTheme("light");
      if (typeof document !== "undefined") {
        document.querySelector("html")?.classList.remove("dark");
      }
    }
  };

  const AddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    setTodos([
      ...todos,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: input,
        completed: false,
        visible: true,
      },
    ]);
    setInput('')
  }

  const DeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const CompleteTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed, visible: todo.completed };
        }
        return todo;
      })
    );
  }

  const RemoveCompleted = () => {
    setTodos(todos.filter((todo) => todo.completed !== true));
  }

  const SetAllVisible = () => {
    setFilter('all');
    setTodos(todos.map((todo) => {todo.visible = true; return todo;}));
  }

const SetActiveVisible = () => {
    setFilter('active');
    var active = todos.filter((todo) => todo.completed !== true).map((todo) => {todo.visible = true; return todo;});
    var completed = todos.filter((todo) => todo.completed === true).map((todo) => {todo.visible = false; return todo;});
    setTodos([...active, ...completed]);
}

const SetCompletedVisible = () => {
    setFilter('completed');
    var active = todos.filter((todo) => todo.completed !== true).map((todo) => {todo.visible = false; return todo;});
    var completed = todos.filter((todo) => todo.completed === true).map((todo) => {todo.visible = true; return todo;});
    setTodos([...active, ...completed]);
}

  const onDragEnd = (result:DropResult) => {
    const {destination, source, draggableId} = result;
    // Check if user dropped item outside of droppable area
    if(!destination) return;
    // Check if user dropped item in same place
    if(destination.index === source.index && destination.droppableId === source.droppableId) return;
    console.log(result)

    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, reorderedItem);
    setTodos(newTodos);

  }
  return (
    <main className="w-full h-full">
      <div className="h-full flex flex-col">
        <div className="bg-mobile-light dark:bg-mobile-dark bg-no-repeat bg-cover h-72 w-full bg-center absolute" />
        <div className="flex flex-col z-[999] w-11/12 mx-auto h-full">
          <div className="flex flex-row justify-between mt-12">
            {/* Header and theme switch */}
            <h1 className="tracking-[0.7rem] text-4xl font-bold text-white">
              TODO
            </h1>
            {theme === "light" ? (
              <SunIcon className="w-10 h-10 text-white" onClick={() => toggleTheme()} />
            ) : (
              <MoonIcon className="w-10 h-10 text-white" onClick={() => toggleTheme()} />
            )}
          </div>
          {/* Todo form */}
          <form onSubmit={(e) => AddTodo(e)}>
            <input
              type="text"
              className="border-0 shadow-lg my-12 focus:outline-none w-full h-12 rounded-md px-4 py-10 text-lg text-gray-700 dark:text-white dark:bg-D_VeryDarkDesaturatedBlue dark:placeholder-gray-400 dark:placeholder-opacity-50"
              placeholder="Create a new todo..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </form>
          {/* Todo list */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
            {
              (provided) => (
                <ul className="overflow-x-auto bg-white shadow-md rounded-md dark:bg-D_VeryDarkDesaturatedBlue" ref={provided.innerRef} {...provided.droppableProps} >
                {todos.filter(x => x.visible).map((todo, idx) => (
                    <Draggable draggableId={todo.id} index={idx}  key={todo.id}>
                      {
                        (provided) => (
                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="py-6 pl-8 border-b-[2px] border-gray-500/[0.1] last:border-0 flex flex-row items-center relative text-gray-700 dark:text-white dark:bg-D_VeryDarkDesaturatedBlue dark:placeholder-gray-400">
                            <input type="checkbox" className="w-8 h-8 mr-4 rounded-full focus:outline-none focus:ring-0 checked:bg-gradient-to-r checked:from-CheckFrom checked:to-CheckTo " checked={todo.completed} onChange={() => CompleteTodo(todo.id)} />
                            {todo.completed && <CheckIcon className='h-6 w-6 absolute left-9 text-white pointer-events-none' /> }
                            {todo.title}
                            <TrashIcon className="w-6 h-6 absolute right-8 text-gray-400 hover:text-gray-700 cursor-pointer" onClick={() => DeleteTodo (todo.id)} />
                          </li>
                        )
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <li className="flex flex-row justify-between py-3 dark:bg-D_VeryDarkDesaturatedBlue">
            {
              todos.length > 0 ? <p className="text-gray-400 text-sm px-8 py-4">{todos.length} items left {`(${todos.filter(x => x.visible == false).length} hidden)`}</p> : <p className="text-gray-400 text-sm px-8 py-4">No items left</p>
            }
            <button className="text-gray-400 text-sm px-8 py-4" onClick={() => RemoveCompleted()}>Clear Completed</button>
          </li>
                </ul>
              )
            }
            </Droppable>
          </DragDropContext>

          <div className="flex flex-row my-8 rounded-[0.6rem] bg-white shadow-md dark:bg-D_VeryDarkDesaturatedBlue">
              <div className="py-6 space-x-8 w-fit mx-auto">
                <button className={`${filter === 'all' ? 'text-blue-500' : 'text-black dark:text-white'}`} onClick={() => SetAllVisible()}>All</button>
                <button className={`${filter === 'active' ? 'text-blue-500' : 'text-black dark:text-white'}`}  onClick={() => SetActiveVisible()}>Active</button>
                <button className={`${filter === 'completed' ? 'text-blue-500' : 'text-black dark:text-white'}`}  onClick={() => SetCompletedVisible()}>Completed</button>
              </div>
          </div>
          <div className="flex flex-row items-end justify-center grow">
            <p className="text-center mb-10">Drag and drop to reorder list</p>
          </div>
        </div>
      </div>
    </main>
  );
}
