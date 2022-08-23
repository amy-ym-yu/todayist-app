import React, {useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

/* USERS COLLECTION
- if there were multiple users, there would be one document per user including:
  * username, password, accessible lists...
    * name of list, tasks... 
*/

 /* DOCUMENT
   * {
   *  userID: 'myUserID',
   *  lists: [ { name: 'list1', todos: []
   * }
   */

function App() { 
  const save = async (userID, data) => {
    // Takes all the properties on UserData and calls update/addDoc in firebase
    await updateDoc(userID, data);
    // set data in db, load data in db 
  }

  const load = async (userID) => {
    // Given user ID, pull down all the UserData and initialize this object
    const docSnap = await getDoc(userID); console.log("load:", docSnap.data());
    setTempData(docSnap.data()); console.log("temp:", docSnap.data());
    return docSnap.data();
  }

  const user = doc(db, "users", "amyyu"); 
  var [tempData, setTempData] = useState(
    {
    username: "amyyu",
    lists: [{
      listName: "main",
      tasks: []
      }]
    });
  save(user, tempData);

  /* thoughts:
  load the app:
    - if updating: 
      * have a temp hold, edit temp obj
      * update doc
   */

  useEffect(() => {
    load(user);
  }, [])
  

  const addList = async () => {
    // load data into temp, change temp, save data, put data into lists
    const data = await load(user);
    const newObj = { listName: "new list", tasks: [] }; console.log("newObj:", newObj);
    data.lists = [...data.lists, newObj];
    setTempData(data); console.log(tempData);
  }

  // add button / setting for delete list
  // const deleteList = () => {}

  // UPDATE LIST INFO ---------------------------------------------------------
  const renameList = (index, text) => {
    tempData.lists[index] = text;
     
    // update db with new list name
    updateDoc(user, tempData); 
  }
    // const onTaskAdded = (listIndex, taskList) => {}
  
    // const onTaskDeleted = () => {}
  
    const onActionChecked = (listindex, taskindex, title) => {
      alert(`You checked an action item! ${title} it was at listindex=${listindex} taskIndex=${taskindex}`)
      // write data into temp
      updateDoc(user, tempData); // updates db with new list name
    }

    return (
      <div className="px-3" >
        <h1 className="text-center">t o d a y i s t</h1>
        <div className="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>New List</Button>
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-center">
          {(tempData.lists || []).map((x, index) => <TodoList listName={x.listName} listIndex={index} 
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