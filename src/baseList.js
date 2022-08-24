import React, {useEffect, useState} from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-next-line
import { db } from "./firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export function TodoList(props) {
    const user = doc(db, "users", "amyyu"); 

    const save = async (userID, data) => {
        // Takes all the properties on UserData and calls update/addDoc in firebase
        await updateDoc(userID, data);
        // set data in db, load data in db 
    }

    const load = async (userID) => {
        // Given user ID, pull down all the UserData and initialize this object
        const docSnap = await getDoc(userID); //console.log("load:", docSnap.data());
        props.setTempData(docSnap.data()); //console.log("temp:", docSnap.data());
        return docSnap.data();
    }
    const [todos, setTodos] = useState([]);
    //console.log(todos);

    useEffect(() => {
        load(user);
        setTodos(props.tempData.lists[props.listIndex].tasks);
    }, []);
    
    const [toggle, setToggle] = useState(true);
    const [name, setName] = useState(props.listName);
  
    const addTodo = (text) => {
      const newTodos = [...todos, { text: text, isDone: false }]; // appending text to list of tasks
      //console.log("updated:",newTodos);
      props.tempData.lists[props.listIndex].tasks = newTodos;
      //console.log(props.tempData.lists[props.listIndex].tasks);
      save(user, props.tempData);
      setTodos(props.tempData.lists[props.listIndex].tasks)
    };
  
    const markTodo = (listIndex, taskIndex) => {
      //console.log("todos:",todos);
      const newTodos = [...todos]; // copies entire list of tasks
      //console.log(newTodos);
      newTodos[taskIndex].isDone = true; // marks task at index as true
      props.tempData.lists[props.listIndex].tasks = newTodos;
      //console.log(newTodos, props.tempData.lists[props.listIndex].tasks);
      save(user, props.tempData);
      setTodos(props.tempData.lists[props.listIndex].tasks);
    };
  
    const removeTodo = (listIndex, taskIndex) => {
      const newTodos = [...todos]; // copies entire list of task
      newTodos.splice(taskIndex, 1); // returns a new array for newTodos without task at index
      props.tempData.lists[props.listIndex].tasks = newTodos;
      save(user, props.tempData);
      setTodos(props.tempData.lists[props.listIndex].tasks);
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
          <Button variant="outline-danger" onClick={() => props.onDeleteList()}>delete</Button>
              {/* input section for task */}
          <FormTodo addTodo={addTodo} /> 

              {/* displays all tasks */}
          <div>
        <div className="pb-3">
            {props.tempData.lists[props.listIndex].tasks.map((todo, index) => {
                        return <Card key={index}>
                                    <Card.Body>
                                    <Todo
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
                markTodo(listIndex, taskIndex, todo.text);
            }}>check off</Button>{' '}
            <Button variant="outline-danger" onClick={() => removeTodo(listIndex, taskIndex)}>delete</Button>
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
  