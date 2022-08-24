import React, {useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore"; 

 /* DOCUMENT
   * {
   *  userID: 'myUserID',
   *  lists: [ { name: 'list1', todos: []
   * }
   */

function App() { 
  const save = async (userID, data) => {
    // Takes all the properties on UserData and calls update/addDoc in firebase
    console.log("CALLED WITH", data);
    await setDoc(userID, data);
    return await load(userID);
    // set data in db, load data in db 
  }

  const load = async (userID) => {
    // Given user ID, pull down all the UserData and initialize this object
    const docSnap = await getDoc(userID); //console.log("load:", docSnap.data());
    if (docSnap.data() === undefined) {
      return defaultData;
    }
    setTempData(docSnap.data()); console.log("temp:", docSnap.data());
    return docSnap.data();
  }

  const [user, setUser] = useState(doc(db, "users", "amyyu"));
  const defaultData = {
    username: user,
    lists: [{
      listName: "main",
      tasks: [{
        text: "This is a sample todo",
        isDone: false
      }]
      }]
    };

  var [tempData, setTempData] = useState(defaultData);
  
  useEffect(() => {
    setTempData(defaultData);
    load(user);
  }, [user])

  const addList = async () => {
    // load data into temp, change temp, save data, put data into lists
    const data = tempData;
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
  }

    return (
      <div className="px-3" >
        <h1 className="text-center">t o d a y i s t</h1>
        <div>
          <span>logged in as: </span>
          <input type="text" defaultValue={user.id} onKeyDown={ (e) => {
            if (e.key === "Enter") {
              const newDoc = doc(db, "users", e.target.value);
              setUser(newDoc);
            }
          }}></input>
        </div>
        
        <div className="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>New List</Button>
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-center">
          {(tempData.lists || []).map((x, index) => <TodoList listName={x.listName} listIndex={index} 
          onListNameChange={renameList} onDeleteList={deleteList} 
          tempData={tempData} setTempData={setTempData}
          key={index} user={user}
        />)}
        </div>
      </div>
    )
}

export default App;

/* REMINDERS:
- if time permits: rearrange list order
*/