import { useState } from 'react';
//import ToggleButton from './App.js';
import ToggleButton from './ToggleButton';


export default function TodoHeading({ children , num, setType, toggleBtn, setToggleBtn, handleClickAdd, handleToggle}){
    const [inputText, setInputText] = useState('');

    return (
        <div id="root">
        <div className="todoapp">
            <h1>Todo</h1>
            <form id="myForm" onSubmit={e=>e.preventDefault()}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-input" className="label_lg">What needs to be done?</label>
                </h2>
                <input type="text" id="new-input" className="input input_lg" name="text" value={inputText} onChange={e=>setInputText(e.target.value)}/>
                <button type="submit" className="btn btn_primary btn_lg" onClick={() => {setInputText(''); handleClickAdd(inputText);}}> Add </button>
            </form>
            <ToggleButton toggleBtn={toggleBtn} handleToggle={handleToggle}/>
            <h2 id="list-heading">{num} tasks remaining</h2>
            <ul aria-labelledby="list-heading" className="todo-list">
                {children}
            </ul>
        </div>
    </div>

    );
}


