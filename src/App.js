import React, {useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase"; 
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

/* USERS COLLECTION
- if there were multiple users, there would be one document per user including:
  * username, password, accessible lists...
*/

/* ALL LISTS COLLECTION
- WHY? Allows for possibility to expand list features (collaborative lists)
- HOW: one document per list with information including:
  * users allowed to access, name of list, index (for default user), tasks... 
*/

const user = doc(db, "users", "amyyu"); // simplyifying to one user with possibility to expand

function App() { 
  /* thoughts:
  load the app:
    - if map of lists is blank, create new doc in allLists with users and name field filled out
    - if adding doc, same as above
    - if deleting doc, LOOK UP DELETING
    
    - if renaming list: rename field
    - if updating list: 
      * have a temp hold array, splice task array
      * update item, append new task to array
      * update entire tasks field
   */
  var [userData, setUserData] = useState([]);


  const loadUserData = async () => {
    const docSnap = await getDoc(user)
    setUserData(docSnap.data());
    console.log(docSnap.data()); // has not updated userData yet
  }

  useEffect(() => {
    loadUserData();
  }, []);
  
  const [lists, setLists] = useState([]); // establishes default list
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
      <div className="px-3" >
        <h1 className="text-center">t o d a y i s t</h1>
        <div className="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>New List</Button>
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-center">
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