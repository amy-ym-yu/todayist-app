import React, { useState} from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-next-line
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export function TodoList(props) {
    // todos - js list that will hold all of the tasks
    // useState contains current state and setter
    const [todos, setTodos] = useState([
      {
        text: "This is a sample todo",
        isDone: false
      }
    ]);
  
    const [toggle, setToggle] = useState(true);
    const [name, setName] = useState(props.listName);
  
    const addTodo = (text) => {
      const newTodos = [...todos, { text: text, isDone: false }]; // appending text to list of tasks
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
      <div className='app rounded border border-primary flex-grow-1 m-2' style={{maxWidth: '60%',
      minWidth:'20%'}}>
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
                  props.onListNameChange(props.listIndex, name);
                }
              }}
            />
          )}
              {/* input section for task */}
          <FormTodo addTodo={addTodo} /> 

              {/* displays all tasks */}
          <div>
        <div class="pb-3">
            {todos.map((todo, index) => {
                        return <Card>
                                    <Card.Body>
                                    <Todo
                                    key={index}
                                    taskIndex={index}
                                    todo={todo}
                                    markTodo={markTodo}
                                    removeTodo={removeTodo}
                                    onActionChecked={props.onActionChecked}
                                    listIndex={props.listIndex}
                                    />
                                    </Card.Body>
                                </Card>
                        }
                        )}
        </div>
            
          </div>
        </div>
      </div>
    );
  
    // display task + add/delete buttons
    function Todo({todo, taskIndex, markTodo, removeTodo, onActionChecked, listIndex}) {
      return (
        <div className="todo">
          <span style={{ textDecoration: todo.isDone ? "line-through" : ""}}>{todo.text}</span>
  
          <div>
            <Button variant="outline-success" onClick={() => {
                markTodo(taskIndex);
                onActionChecked(listIndex, taskIndex, todo.text);
            }}>✓</Button>{' '}
            <Button variant="outline-danger" onClick={() => removeTodo(taskIndex)}>✕</Button>
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
  