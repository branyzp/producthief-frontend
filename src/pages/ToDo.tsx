import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { style } from '@mui/system';
import { Button } from '@mui/material';
import ToDoCard from '../components/ToDoCard';

const local = 'http://localhost:8000/api/todos/'
const heroku = 'https://producthief-backend.herokuapp.com/api/todos/'
const todoapi = local;

const motivationapi_url = 'https://zenquotes.io/api/quotes/'

interface todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

    
const ToDo: React.FC = () => {
    const [newTodoTitle, setNewTodoTitle] = useState<string>('')
    const [newTodoDesc,setNewTodoDesc] = useState<string>('')
    const [todos, setTodos] = useState<todo[]>([])
    const [quotes,setQuotes] = useState<string>('')
    
    
    console.log('newtodotitle:',newTodoTitle)
    console.log('newtododesc',newTodoDesc)
    
    
    // const getTodos = () => {
    //     axios({
    //         method: 'get',
    //         url:'http://localhost:8000/api/todos/?format=json'
    //     }).then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    // }

    useEffect(() => {
        const fetchData = async()=>{
            await axios({
            method: 'get',
            url:todoapi
        }).then(res => setTodos(res.data))
                .catch(err => console.log(err))
        }
        
        
        fetchData();
        
    }, [])
    
    
    const handleAdd = () => {

        //update state of todos
        if (newTodoTitle && newTodoDesc) {
            
        //send the POST request to update the backend
            axios.post(todoapi, {
                title: newTodoTitle,
                description: newTodoDesc,
                completed: false
            }).then(res => setTodos([...todos,res.data]))
            .catch(err=>console.log(err))
            
        } else {
            alert('Please fill in both "Title" and "Description"')
        }

    }

    console.log(todos)
    console.log(quotes)

    return (
        <div>
            <h1> Good Afternoon, Brandon.</h1>
            <h2>Quote</h2>
            <table className='todoTable' >
                 <tbody>
                     <tr>
                         <td>
                              <input id='inputbox1' className='input_box' placeholder='what is your main focus today?' name='title' size={37} onChange={(e)=>setNewTodoTitle(e.target.value)}></input>
                         </td>
                     </tr>
                    <tr>  
                         <td>
                               <textarea id='inputbox2' className='input_box' placeholder='what can help you achieve this focus?' rows={5} cols={30} onChange={(e)=>setNewTodoDesc(e.target.value)}></textarea>
                         </td>
                    </tr>
                </tbody>
            </table>
                    <Button onClick={handleAdd}>Add</Button>
            
                   <div className='ToDoCardContainer'>
                    {todos.map((todo, index) => {
                        return (
                            <ToDoCard key={index} id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} todos={todos} setTodos={setTodos} todoapi={todoapi} />
                        )
                    })}
               </div>
        </div>
    );
};

export default ToDo;