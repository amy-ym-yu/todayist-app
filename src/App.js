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
    const docSnap = await getDoc(userID); //console.log("load:", docSnap.data());
    setTempData(docSnap.data()); //console.log("temp:", docSnap.data());
    return docSnap.data();
  }

  const user = doc(db, "users", "amyyu"); 

  var [tempData, setTempData] = useState(
    {
    username: "amyyu",
    lists: [{
      listName: "main",
      tasks: [{
        text: "This is a sample todo",
        isDone: false
      }]
      }]
    });
  save(user, tempData);
  
  useEffect(() => {
    load(user);
  }, [])

  const addList = async () => {
    // load data into temp, change temp, save data, put data into lists
    const data = await load(user);
    const newObj = {
      listName: "new list", 
      tasks: [{
      text: "This is a sample todo",
      isDone: false
    }] }; //console.log("newObj:", newObj);
    data.lists = [...data.lists, newObj];
    setTempData(data);
    save(user, tempData);
  }

  const deleteList = (listIndex) => {
    const data = [...tempData.lists];
    data.splice(listIndex, 1); // returns a new array for data without list at index
    tempData.lists = data;
    setTempData(data);
    save(user, tempData); // 
  }
  
  const renameList = (index, text) => {
    tempData.lists[index].listName = text;
    save(user, tempData);
    setTempData(load(user));
  }

    return (
      <div className="px-3" >
        <h1 className="text-center">t o d a y i s t</h1>
        <div className="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>New List</Button>
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-center">
          {(tempData.lists || []).map((x, index) => <TodoList listName={x.listName} listIndex={index} 
          onListNameChange={renameList} onDeleteList={deleteList} 
          tempData={tempData} setTempData={setTempData}
        />)}
        </div>
      </div>
    )
}

export default App;

/* REMINDERS:
- if time permits: rearrange list order
*/