//import logo from './logo.svg';
import './App.css';
import TodoHeading from './TodoHeading';
//import TodoHeading1 from './TodoHeading1';
import Items from './Items';
import { useState , useEffect} from 'react';

//let dataArray;

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [loaded, setLoaded] = useState(false); // why do we need this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('useEffect runs in App');
        //await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        const randomNumber = Math.floor(Math.random() * 100);
        console.log('randomNumber -- ', randomNumber)
        //const slicedDataArray = data.todos.slice(randomNumber, randomNumber+5);
        let slicedDataArray = data.todos.slice(0, 0+5);
        //let slicedDataArray = data.todos.slice(randomNumber, randomNumber+5);
        console.log('slicedDataArray ', slicedDataArray);
        setDataArray(slicedDataArray);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Render your component with the fetched data
  // If there is no loaded data, do not return. 
  console.log('runs in App - I run first');
  //return <App1 dataArray={dataArray.slice()} />
  return (
    loaded && <App1 dataArray={dataArray.slice()} />
  );
}

function App1({dataArray}) {
  const [state, setState] = useState(dataArray); //initialState -- timing?
  const [type, setType] = useState("all");
  // const [num, setNum] = useState(state.length);
  const [toggleBtn, setToggleBtn]=useState(["true", "false", "false"]); // to set the appearance of toggle
  //const [selectedState, setSelectedState]=useState([]) ; 
  useEffect(() => {
    if (state!==dataArray) {setState(dataArray)}
    console.log('useEffect runs ');
    // Code to run when dependencies change
  }, [dataArray]);

  
  function getSelectedState(taskType="all") {

    //setState(dataArray);
    let selectedState ;
    if (taskType === "all") {
      selectedState = [...state];
    } else if (taskType === "active") {
      selectedState = state.filter((item) => item.completed===false);
    } else if (taskType === "completed") {
      selectedState = state.filter((item) => item.completed===true);
    }
    return selectedState
  }

  function handleChecked(e){
    const newState = state.map((t) => {
      if (String(t.id) === e.target.id) {
      //  console.log('t --', t);
        return {...t, completed: e.target.checked};
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
    const newState = [...state, {id: generateRandomKey(), todo: text, completed: false}]
    setState(newState); 
  }

  function handleDelete(e){
    const newState = state.filter(item => String(item.id) !== e.target.dataset.key)
    setState(newState); 
  }

  function handleSave(editText, id) {
    const newState = state.map(
      item => {if (String(item.id) === String(id)) {
        return {...item, todo:editText}
      } else { return item }
    }
    ); 
    setState(newState); 
  }

  function handleToggle(e) {
    console.log('e.target.textContent.trim()  ', e.target.textContent.trim());
    if (e.target.textContent.trim() === "All") {
        setType("all"); 
        setToggleBtn(["true","false","false"]);
    } else if (e.target.textContent.trim() === "Active") {
        setType("active"); 
        setToggleBtn(["false","true","false"])
    } else if (e.target.textContent.trim() === "Completed"){
        setType("completed"); 
        setToggleBtn(["false","false","true"])
    }
  }

  return (
    //<h1>Todo</h1>       <DisplayItems taskType="all" state = {state} /> 
    <TodoHeading num={getSelectedState(type).length} setType={setType} toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} handleClickAdd={handleAdd} handleToggle={handleToggle}>
      <Items selectedState={getSelectedState(type)} handleSave={handleSave} handleChecked={handleChecked} handleDelete={handleDelete}/>
    </TodoHeading>

  );
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
    todo: "Eat",
    completed: false
  },
  {
    id: 1, 
    todo: "Sleep",
    completed: false
  },
  {
    id: 2, 
    todo: "Repeat",
    completed: false
  }, 
];

