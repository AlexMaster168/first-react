import React, {useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
import Context from "./context";

const AddTodo = React.lazy(
    ()=>
        new Promise(resolve => {
    setTimeout(()=>{
     resolve(import('./Todo/addTodo'))
    },3000)
}));

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading,setLoading] = React.useState(true);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos =>{
                setTimeout(()=>{
                    setTodos(todos);
                    setLoading(false)
                },2000);
            })
    },[]);

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
          <Modal />
          <React.Suspense fallback={<Loader/>}>
              <AddTodo onCreate={addTodo}/>
          </React.Suspense>

          {loading && <Loader/>}
          {todos.length ?<TodoList todos={todos} onToggle={toggleTodo}/>: loading ? null:<p>No todos</p> }

      </div>
      </Context.Provider>
  )
}

export default App;

