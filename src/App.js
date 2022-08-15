import React, {useState} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from "./baseList";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // eslint-disable-next-line
import { collection, doc, setDoc, getDoc, addDoc, updateDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsFwpXXAIEJchk8uL3aJ0wEMq5Eg7B9lE",
  authDomain: "todayist-c3b28.firebaseapp.com",
  projectId: "todayist-c3b28",
  storageBucket: "todayist-c3b28.appspot.com",
  messagingSenderId: "941265907808",
  appId: "1:941265907808:web:ff8241e13a7a59a6965305",
  measurementId: "G-4WS3QW1ZHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // eslint-disable-next-line
const db = getFirestore(app); 

/* Data Structure: document
doc name: mainList
* 1
  - text: default text
  - status: not done
* 2
  - text: default text
  - status: not done
*/

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
