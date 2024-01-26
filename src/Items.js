import { useState } from 'react';


export default function Items({selectedState, handleSave, handleChecked, handleDelete}) {
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
    const [editText, setEditText] = useState(taskObject.todo);
    if (!isEditing){
      return (
        <li className="todo"> 
        <div className="stack-small"> 
        <div className="c-cb"> 
        <input id={taskObject.id} type="checkbox" data-key={taskObject.id} checked={taskObject.completed}  onChange={handleChecked}/> 
        <label htmlFor={taskObject.id} className="todo-label" ><>{taskObject.todo}</></label></div> 
        <div className="btn-group-2"> 
        <button type="button" className="btn" data-key={taskObject.id} onClick={()=>setIsEditing(!isEditing)}>Edit</button> 
        <button type="button" className="btn btn__danger" data-key={taskObject.id} onClick={handleDelete}>Delete</button> 
        </div></div></li> 
        )
    } else {
      return (
        <li className="todo"><form className="stack-small" onSubmit={e=>e.preventDefault()}> 
        <div className="form-group"> 
        <label className="todo-label-2" htmlFor={taskObject.id}>New name for {taskObject.todo} </label> 
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
