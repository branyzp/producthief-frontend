import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { style } from '@mui/system';
import { Button } from '@mui/material';
import ToDoCard from '../components/ToDoCard';

const local = 'http://localhost:8000/api/todos/'
const heroku = 'https://producthief-backend.herokuapp.com/api/todos/'
const api = local;

interface todo {
    id: number,
    title: string,
    description: string,
    completed: boolean
}


    
const ToDo: React.FC = () => {
    const [newTodoTitle, setNewTodoTitle] = useState<string>('')
    const [newTodoDesc,setNewTodoDesc] = useState<string>('')
    const [todos, setTodos] = useState<todo[]>([])
    
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
            url:api
        }).then(res => setTodos(res.data))
        .catch(err => console.log(err))
        }
        fetchData(); 
    }, [])
    
    // const addTodo = async () => {
    //     await axios.post('/')
    // }
    const handleAdd = () => {

        //update state of todos
        if (newTodoTitle && newTodoDesc) {
            
        //send the POST request to update the backend
            axios.post(api, {
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

    return (
        <div>
            <table className='todoTable' >
                 <tbody>
                     <tr>
                         <td>
                              <input id='inputbox1' className='input_box' placeholder='what is your main focus today?' name='title' size={37} onChange={(e)=>setNewTodoTitle(e.target.value)}></input>
                         </td>
                     </tr>
                    <tr>  
                         <td>
                               <textarea id='inputbox2' className='input_box' placeholder='type your todo description here' rows={5} cols={30} onChange={(e)=>setNewTodoDesc(e.target.value)}></textarea>
                         </td>
                    </tr>
                </tbody>
            </table>
                    <Button onClick={handleAdd}>Add</Button>
            
                   <div className='ToDoCardContainer'>
                    {todos.map((todo, index) => {
                        return (
                            <ToDoCard key={index} id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} todos={todos} setTodos={setTodos} api={api} />
                        )
                    })}
               </div>
        </div>
    );
};

export default ToDo;