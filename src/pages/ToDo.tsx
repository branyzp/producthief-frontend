import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { style } from '@mui/system';
import { Button, Pagination, TextField } from '@mui/material';
import ToDoCard from '../components/ToDoCard';
import { Link } from 'react-router-dom';


// const local = 'http://localhost:8000/api/todos/'
// const heroku = 'https://producthief-backend.herokuapp.com/api/todos/'
// const todoapi = local;

const quoteURL = 'https://quotable.io/random'

interface Props{
    todoapi: string;
}
interface todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface quote{
    // _id: string;
    content: string;
    author: string;
    // tags: string[];
    // authorSlug: string;
    // length: number;
    // dateAdded: string;
    // dateModified: string;
}


    
export default function ToDo ({todoapi}:Props) {
    const [newTodoTitle, setNewTodoTitle] = useState<string>('')
    const [newTodoDesc,setNewTodoDesc] = useState<string>('')
    const [todos, setTodos] = useState<todo[]>([])
    const [quotes, setQuotes] = useState<quote>({content: '' , author: ''})
    const [compliment, setCompliment] = useState<string>('Yes, you can.')
    const [time, setTime] = useState(new Date());
    const [greeting, setGreeting] = useState<string>('Hello')    
    
    
   
    
    
   
    
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get',
                url:todoapi
            }).then(res => setTodos(res.data)).catch(err => console.log(err))
        }
        fetchData();
    },[])
   
    
    
    // const getTodos = () => {
    //     axios({
    //         method: 'get',
    //         url:'http://localhost:8000/api/todos/?format=json'
    //     }).then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    // }

    

     useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
    
    useEffect(() => {
        const currentHour = time.getHours()
        if (currentHour < 12) {
            setGreeting('Good Morning')
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Evening')
        }
    }
        , [])
    
    
    useEffect(() => {
        axios.get(quoteURL).then(res=> setQuotes(res.data)).catch(err=>console.log(err))
    }
    ,[])
    
    console.log(quotes)

    const handleAdd = () => {
        

        //update state of todos
        if (newTodoTitle && newTodoDesc) {
            
        //send the POST request to update the backend
            axios.post(todoapi, {
                title: newTodoTitle,
                description: newTodoDesc,
                completed: false
            }).then(res => setTodos([...todos,res.data]))
                .catch(err => console.log(err))
            
            
            
        } else {
            alert('Please fill in both "Title" and "Description"')
        }
        
    }

    

    console.log(todos)
  

    return (
        <div>
            <div id='clock'>
                    <h1 className='pagetext'>{time.toDateString()}</h1>
                    <h1 className='pagetext'>{time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</h1>
                    
                </div>
            <div className='pagetextdiv'>
                
                

                <h1 className='pagetext'> {greeting}, Brandon.</h1> 
                {quotes && (
                <><p className='pagetext'>"{quotes.content}"</p>
                <p className='pagetext'>-{quotes.author}</p></>)}
                
                
               
                
            </div>
            
            <table className='todoTable' >
                 <tbody>
                     <tr>
                        <td>
                            {/* <TextField
                                label='focus title'
                                required
                                style={{
                                backgroundColor: "white",
                                outline: 'None'
                                      }} className='input_box' placeholder='what is your main focus today?' size={"medium"} onChange={(e)=>setNewTodoTitle(e.target.value)} /> */}
                              <input id='inputbox1' className='input_box' placeholder='what is your main focus today?' name='title' size={37} onChange={(e)=>setNewTodoTitle(e.target.value)}/>
                         </td>
                     </tr>
                    <tr>  
                        <td>
                            {/* <TextField
                                label='focus description'
                                required
                                style={{
                                backgroundColor: "white",
                                outline: 'None'
                                      }} className='input_box' placeholder='what is included in this focus?' onChange={(e)=>setNewTodoDesc(e.target.value)} /> */}
                               <textarea id='inputbox2' className='input_box' placeholder='what is included in this focus?' rows={2} cols={20} onChange={(e)=>setNewTodoDesc(e.target.value)}></textarea>
                         </td>
                    </tr>
                </tbody>
            </table>
            
                    <Button sx={{
								':hover': {
									bgcolor: 'black',
									color: 'white',
								},
								backgroundColor: 'white',
                color: 'black',
                                fontFamily: 'Oxygen'
                                
                                
            }} variant='contained' className='input_submit' onClick={() => {
                handleAdd()
                const todocontainer = document.getElementById('ToDoCompliment')!
                setTimeout(() => {
                todocontainer.scrollIntoView({behavior:'smooth'});
			}, 1000);
            }
            }>Add Focus</Button>

            {todos[0] && <div id='ToDoCardContainer' className='ToDoCardContainer'>
                <h1 id='ToDoCompliment' className='pagetext'>{compliment}</h1>
                    {todos.map((todo, index) => {
                        return (
                            
                            <ToDoCard key={index} id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} todos={todos} setTodos={setTodos} todoapi={todoapi} setCompliment={setCompliment} />
                          
                        
                        )
                    })}
               </div>}
                   
        </div>
    );
};

