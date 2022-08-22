import React, {useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

const user = doc(db, "users", "amyyu");

function App() { // TO DO: delete list, rearrange list order

  const [lists, setLists] = useState(["main"]); // establishes default list
  updateDoc(user, {lists: lists}); // inputs list names into lists 

  // // add button
  // const deleteList = () => {

  // }
=======
  updateDoc(user, {lists: lists}); // inputs list names into lists 

  const addList = () => {
    setLists([...lists, "new list"]); 
    updateDoc(user, {lists: lists}); // adds new list name to dv
  }

  // // add button
  // const deleteList = () => {

  // }

  // update anything in lists
  const renameList = (index, text) => {
    lists[index] = text;
    setLists([...lists]); 
    setDoc(user, {lists: lists}); // updates db with new list name
  }
    // const onTaskAdded = (listIndex, taskList) => {
    //   // 
    // }
  
    // const onTaskDeleted = () => {
    //   // 
    // }
  
    const onActionChecked = (listindex, taskindex, title) => {
      alert(`You checked an action item! ${title} it was at listindex=${listindex} taskIndex=${taskindex}`)
    }

    return (
      <div class="px-3">
        <h1 class="text-center">t o d a y i s t</h1>
        <div class="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>+</Button>
        </div>
        {lists.map((x, index) => <TodoList listName={x} listIndex={index} 
          onListNameChange={renameList} //onTaskAdded={onTaskAdded} onTaskDeleted={onTaskDeleted} 
          onActionChecked={onActionChecked} 
        />)}
      </div>
    )
}


export default App;
// export { user, listsHolder };