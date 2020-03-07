import React from 'react';
import TodoList from "./Todo/TodoList";
import AddTodo from "./Todo/addTodo";
import Context from "./context";

function App() {
    const [todos, setTodos] = React.useState([
        {id: 1, completed: false, title: "Купить хлеб"},
        {id: 2, completed: true, title: "Купить масло"},
        {id: 3, completed: false, title: "Купить молоко"},
        {id: 4, completed: false, title: "Купить гарчицу"}
    ]);

    function toggleTodo(id) {
        setTodos(todos.map(todo=>{
         if(todo.id === id){
             todo.completed = !todo.completed
         }
         return todo
     }))
    }

   function removeTodo(id) {
     setTodos(todos.filter(todo=> todo.id !== id))
   }

   function addTodo(title) {
     setTodos(todos.concat([{
         title,
         id: Date.now()
     }]))
   }

  return (
      <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Todo App React</h1>
          <AddTodo onCreate={addTodo}/>
          {todos.length ?<TodoList todos={todos} onToggle={toggleTodo}/>: <p>No todos!</p> }

      </div>
      </Context.Provider>
  )
}

export default App;

