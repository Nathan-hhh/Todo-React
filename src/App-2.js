//import logo from './logo.svg';
import './App.css';
import TodoHeading from './TodoHeading';
import { useState } from 'react';

function App() {
  const [state, setState] = useState(initialState);
  const [type, setType] = useState("all");
  // const [num, setNum] = useState(state.length);
  const [toggleBtn, setToggleBtn]=useState(["true", "false", "false"]); // to set the appearance of toggle
  // console.log('state -- ', state);
  // console.log('state 0 -- ', state[0]);
  const selectedState=getSelectedState(type);

  function getSelectedState(taskType="all") {
    let selectedState ;
    if (taskType === "all") {
      selectedState = [...state];
    } else if (taskType === "active") {
      selectedState = state.filter((item) => item.checked===false);
    } else if (taskType === "completed") {
      selectedState = state.filter((item) => item.checked===true);
    }
    return selectedState
  }

  function handleChecked(e){
    const newState = state.map((t) => {
      if (String(t.id) === e.target.id) {
      //  console.log('t --', t);
        return {...t, checked: e.target.checked};
      } else {  
      //  console.log('else ...');
        return t ;
      }
    }
    )
    setState(newState);
  }

  function handleAdd(text){
    // set a state variable text to store the input. 
    const newState = [...state, {id: generateRandomKey(), value: text, checked: false}]
    console.log('newState --', newState)
    setState(newState); 
  }

  function handleDelete(e){
    console.log('delete button activated ');
    console.log('e.target.id -- ', e.target.id)
    const newState = state.filter(item => String(item.id) !== e.target.dataset.key)
    setState(newState); 
  }

  function handleSave(editText, id) {
    const newState = state.map(
      item => {if (item.id == id) {
        return {...item, value:editText}
      } else { return item }
    }
    ); 
    setState(newState); 
  }

  return (
    //<h1>Todo</h1>       <DisplayItems taskType="all" state = {state} /> 
    <TodoHeading num={selectedState.length} setType={setType} toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} handleClickAdd={handleAdd}>
      <DisplayItems selectedState={selectedState} handleSave={handleSave} handleChecked={handleChecked} handleDelete={handleDelete}/>
    </TodoHeading>

  );
}



function DisplayItems({taskType="all", selectedState, handleSave, handleChecked, handleDelete}) {
  console.log('selectedState --', selectedState);
  //setNum(selectedState.length);
  return (
    selectedState.map(
      (item) => <AnItem key={generateRandomKey()} taskObject={item} handleSave={handleSave} handleChecked={handleChecked} handleDelete={handleDelete}/>
    )
  )
};



function AnItem({ taskObject, handleSave, handleChecked, handleDelete}) {
  // taskObject is supposed to be one object in the state array
  // console.log("taskObject -- ", taskObject)
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(taskObject.value);
  if (!isEditing){
    return (
      <li className="todo"> 
      <div className="stack-small"> 
      <div className="c-cb"> 
      <input id={taskObject.id} type="checkbox" data-key={taskObject.id} checked={taskObject.checked}  onChange={handleChecked}/> 
      <label htmlFor={taskObject.id} className="todo-label" ><>{taskObject.value}</></label></div> 
      <div className="btn-group-2"> 
      <button type="button" className="btn" data-key={taskObject.id} onClick={()=>setIsEditing(!isEditing)}>Edit</button> 
      <button type="button" className="btn btn__danger" data-key={taskObject.id} onClick={handleDelete}>Delete</button> 
      </div></div></li> 
      )
  } else {
    return (
      <li className="todo"><form className="stack-small" onSubmit={e=>e.preventDefault()}> 
      <div className="form-group"> 
      <label className="todo-label-2" htmlFor={taskObject.id}>New name for {taskObject.value} </label> 
      <input type="text" id={taskObject.id} className="todo-text" value={editText} onChange={e=>setEditText(e.target.value)}/></div> 
      <div className="btn-group-2"> 
      <button type="button" className="btn btn__cancel" onClick={()=>setIsEditing(!isEditing)}>Cancel</button> 
      <button type="button" className="btn btn__save" onClick={()=>{handleSave(editText, taskObject.id);}}>Save</button></div></form></li>
    )
  }
}

function generateRandomKey(length=10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomKey += characters.charAt(randomIndex);
  }
  return randomKey;
}

export default App;

const initialState = [
  {
    id: 0, 
    value: "Eat",
    checked: false
  },
  {
    id: 1, 
    value: "Sleep",
    checked: false
  },
  {
    id: 2, 
    value: "Repeat",
    checked: false
  }, 
];

