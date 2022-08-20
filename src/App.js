import React, {useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

const user = doc(db, "users", "amyyu");

function App() { // TO DO: delete list, rearrange list order
  setDoc(user, {lists: []}); // sets up empty array for data field

  const [lists, setLists] = useState(["main"]); // establishes default list
  updateDoc(user, {lists: lists});

  // onLoad, onTaskAdded, onTaskDeleted, onListRenamed

  const onActionChecked = (listindex, taskindex, title) => {
    alert(`You checked an action item! ${title} it was at listindex=${listindex} taskIndex=${taskindex}`)
  }

  const addList = () => {
    setLists([...lists, "new list"]); 
    updateDoc(user, {lists: lists});
  }

  const renameList = (index, text) => {
    console.log(lists);
    lists[index] = text;
    setLists([...lists]); 
    setDoc(user, {lists: lists}); // updates db with new list names
  }

    return (
      <div class="px-3">
        <h1 class="text-center">t o d a y i s t</h1>
        <div class="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>+</Button>
        </div>
        {lists.map((x, index) => <TodoList listName={x} listIndex={index} 
          onListNameChange={renameList} onActionChecked={onActionChecked}
        />)}
      </div>
    )

}


export default App;
// export { user, listsHolder };