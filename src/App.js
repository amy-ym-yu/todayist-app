import React, {useState} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";
import { db } from "./firebase";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 

const user = doc(db, "users", "amyyu");

function App() {
  // delete list, rearrange list order
  const [lists, setLists] = useState(["main"]);

  const addList = () => {
    setLists([...lists, "new list"]);
  }

  const renameList = (index, text) => {
    lists[index] = text;
    setLists([...lists]);
  }

    return (
      <div class="px-3">
        <h1 class="text-center">t o d a y i s t</h1>
        <div class="d-flex justify-content-end">
        <Button variant="outline-success" onClick={() => addList()}>+</Button>
        </div>
        {lists.map((x, index) => <TodoList listName={x} onListNameChange={renameList} index={index}/>)}
      </div>
    )

}


export default App;
export { user };