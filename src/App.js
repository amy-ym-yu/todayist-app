import React, {useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

/* USERS COLLECTION
- if there were multiple users, there would be one document per user including:
  * username, password, accessible lists...
*/
const user = doc(db, "users", "amyyu"); // simplyifying to one user with possibility to expand

/* ALL LISTS COLLECTION
- WHY? Allows for possibility to expand list features (collaborative lists)
- HOW: one document per list with information including:
  * users allowed to access, name of list, index (for default user), tasks... 
*/

function App() { 
  const [lists, setLists] = useState(["main"]); // establishes default list
  updateDoc(user, {listIDs: lists}); // inputs list names into lists 

  const addList = () => {
    setLists([...lists, "new list"]); 
    updateDoc(user, {listIDs: lists}); // adds new list name to dv
  }

  // add button / setting for delete list
  // const deleteList = () => {}

  // UPDATE LIST INFO 
  const renameList = (index, text) => {
    lists[index] = text;
    setLists([...lists]); 
    setDoc(user, {listIDs: lists}); // updates db with new list name
  }
    // const onTaskAdded = (listIndex, taskList) => {}
  
    // const onTaskDeleted = () => {}
  
    const onActionChecked = (listindex, taskindex, title) => {
      alert(`You checked an action item! ${title} it was at listindex=${listindex} taskIndex=${taskindex}`)
    }

    return (
      <div class="px-3">
        <h1 class="text-center">t o d a y i s t</h1>
        <div class="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>New List</Button>
        </div>
        <div class="d-flex flex-wrap flex-row justify-content-center">
          {lists.map((x, index) => <TodoList listName={x} listIndex={index} 
          onListNameChange={renameList} //onTaskAdded={onTaskAdded} onTaskDeleted={onTaskDeleted} 
          onActionChecked={onActionChecked} 
        />)}
        </div>
      </div>
    )
}

export default App;

/* REMINDERS:
- if time permits: rearrange list order
*/