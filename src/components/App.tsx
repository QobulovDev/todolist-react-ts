import { useState, useEffect, useRef } from "react";
import { TodoList } from "./TodoList";
import { ITodo } from "../types/data";

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const hendleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(e.key === 'Enter') addTodo()
  }

  const changeHandle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const addTodo = ()=> {
    if (!value) return;
    setTodos([...todos, {
      id: Date.now(),
      title: value,
      completed: false
    }])
    setValue('')
  }
  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id!=id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if(todo.id!==id) return todo;
      return {
        ...todo,
        completed: !todo.completed
      }
    }))
  }
  useEffect(()=>{
    inputRef.current?.focus();
  }, [])
  return (
    <>
      <div>
        <input type="text" value={value} onChange={changeHandle} ref={inputRef} onKeyDown={hendleKeyDown}/>
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </>
  )
}

export {App};