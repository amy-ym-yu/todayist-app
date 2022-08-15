import React, {useState} from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function TodoList(props) {
    // todos - js list that will hold all of the tasks
    // setTodos is a function which
    // useState contains current state and setter
    // console.log("props are: ", props);
    const [todos, setTodos] = useState([
      {
        text: "This is a sample todo",
        isDone: false
      }
    ]);
  
    const [toggle, setToggle] = useState(true);
    const [name, setName] = useState(props.listName);
  
    const addTodo = (text) => {
      const newTodos = [...todos, { text }]; // appending text to list of tasks
      setTodos(newTodos); // setting new state for todo variable
    };
  
    const markTodo = (index) => {
      const newTodos = [...todos]; // copies entire list of tasks
      newTodos[index].isDone = true; // marks task at index as true
      setTodos(newTodos); // sets new state for todo variable
    };
  
    const removeTodo = (index) => {
      const newTodos = [...todos]; // copies entire list of task
      newTodos.splice(index, 1); // returns a new array for newTodos without task at index
      setTodos(newTodos); // sets new state for todo variable
    };
  
    return (
      <div className='app'>
        <div className='container'>
            {/* name of list + toggle name */}
          {toggle ? (
            <h3 className='text-center mb-4' onDoubleClick={() => {
              setToggle(false);
              }}
              >{props.listName}</h3>
          ) : (
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key==='Escape') {
                  setToggle(true);
                  event.preventDefault();
                  event.stopPropagation();
                  props.onListNameChange(props.index, name);
                }
              }}
            />
          )}
              {/* input section for task */}
          <FormTodo addTodo={addTodo} /> 

              {/* displays all tasks */}
          <div>
            {todos.map((todo, index) => {
              return <Card>
                        <Card.Body>
                          <Todo
                          key={index}
                          index={index}
                          todo={todo}
                          markTodo={markTodo}
                          removeTodo={removeTodo}
                          />
                        </Card.Body>
                      </Card>
            }
            )}
          </div>
        </div>
      </div>
    );
  
    // display task + add/delete buttons
    function Todo({todo, index, markTodo, removeTodo}) {
      return (
        <div className="todo">
          <span style={{ textDecoration: todo.isDone ? "line-through" : ""}}>{todo.text}</span>
  
          <div>
            <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
            <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
          </div>
        </div>
      );
    }
  
    // input for task description
    function FormTodo({ addTodo }) {
      const [value, setValue] = React.useState("");
  
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
      };
  
      return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><b>Add Todo</b></Form.Label>
          <Form.Control type="text" className="input" value={value}
          onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
        </Form.Group>
        <Button variant="primary mb-3" type="submit">Submit</Button>
        </Form>
      );
    }
  
  }
  