// import React from 'react';
// import { useState } from 'react';

// interface Props{
//     title: string,
//     description: string,
//     completed: boolean
// }

// const ToDoCard = ({title,description,completed}:Props) => {


//     return (
//         <div>
//             Title: {title}
//             Description: {description}
//             Completed: {completed}

//         </div>
//     );
// };

// export default ToDoCard;

import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, ThemeProvider, createTheme, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import axios from 'axios';
import { Link } from 'react-router-dom';



interface todo {
    id: number,
    title: string,
    description: string,
    completed: boolean
}

interface Props{
  id: number;
  title: string;
  description: string;
  completed: boolean;
  todos: todo[];
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
  todoapi: string;
  setCompliment: React.Dispatch<React.SetStateAction<string>>;
}




export default function ToDoCard({ title, description, completed, id, todos, setTodos, todoapi, setCompliment }: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editDesc, setEditDesc] = useState<string>(description);
  
  const complimentArr = ['Nice.', 'Great work!', 'Amazing!', 'Well done!', 'Keep it up.', 'Wow. That was fast.']
  const randomNum = Math.floor(Math.random() * complimentArr.length)
  const randomCompliment = complimentArr[randomNum]

  const handleDelete = (id: number) => {
    axios.delete(todoapi + id)
    setTodos(todos.filter(todo=>todo.id !== id))
  
}
  
  const handleEdit = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: editTitle,description: editDesc } : todo))

    axios.put(todoapi + id + '/', {
                title: editTitle,
                description: editDesc,
    })
    
   
    console.log('Edit!')
    

}

  const handleCompleted = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))

    if (completed) {
      axios.put(todoapi + id + '/', {
        title: editTitle,
        description: editDesc,
        completed: false
       })
    } else {
      setCompliment(randomCompliment)

      axios.put(todoapi + id + '/', {
        title: editTitle,
        description: editDesc,
        completed: true
      }) 
    }

  
  }
  
  

  return (
    <Card className='ToDoCard' sx={{ maxWidth: 500 , maxHeight: 345, borderRadius: '25px',}}>
      {/* <CardActionArea> */}
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {edit && !completed ? (
          <input className='editInput' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
          ): (
              completed ? <h1><s>{title}</s></h1> : <h1><b>{title}</b></h1>
          )
        }
          
          </Typography>
        <Typography variant="body2" color="text.secondary">
          
          {edit && !completed ? (
            <textarea className='editInput' value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
          ) : (
              completed ? <h2>You're done! Yay!</h2> : <h2>{ description }</h2>
          )
        
        
        }
        </Typography>

        {completed ? (
          <Tooltip title="Undo Complete">
            <Button onClick={() => handleCompleted(id)}>
              <CheckIcon />
            </Button>
          </Tooltip>) : edit ? (
          <><h1>Editing {title} ... </h1>
          <Tooltip title="Undo Edit Mode">
          <Button onClick={() => {
          if (!edit && !completed) {
            setEdit(!edit)
            console.log('edit', edit)
  
          } else {
            setEdit(!edit)
            console.log('close edit', edit)
            handleEdit(id)
          }
                }}><EditIcon /></Button>
                </Tooltip>
          </>
        
          ) : (<>
          <Tooltip title="Edit Focus">
            <Button onClick={() => {
          if (!edit && !completed) {
            setEdit(!edit)
            console.log('edit', edit)
          } else {
            setEdit(!edit)
            console.log('close edit', edit)
            handleEdit(id)
          }
                }}><EditIcon /></Button>
              </Tooltip>
              
          <Tooltip title="Delete Focus">
                <Button onClick={() => handleDelete(id)}><DeleteIcon /></Button></Tooltip>
              
                <Link to={`${id}`} ><Tooltip title="Pomodoro Timer"><Button><AccessAlarmIcon /></Button></Tooltip></Link>
              <Tooltip title="Complete Focus">
          <Button onClick={() => handleCompleted(id)}><CheckIcon /></Button></Tooltip></>)}
        
        
        {/* <Button onClick={() => {
          if (!edit && !completed) {
            setEdit(!edit)
            console.log('edit', edit)
          } else {
            setEdit(!edit)
            console.log('close edit', edit)
            handleEdit(id)
          }
        }}><EditIcon /></Button> */}
        
        {/* {edit ? (<h1>Editing '{title}' ...</h1>) : (<><Button onClick={() => handleDelete(id)}><DeleteIcon /></Button>
        <Link to={`${id}`} ><Button><AccessAlarmIcon/></Button></Link>
        <Button onClick={() => handleCompleted(id)}><CheckIcon /></Button></>)} */}
        {/* {edit ? (<h1>Editing '{title}' ...</h1>) : completed ? (<><Button onClick = { () => handleDelete(id) }><DeleteIcon /></Button>
        <Link to={`${id}`} ><Button><AccessAlarmIcon/></Button></Link>
        <Button onClick={() => handleCompleted(id)}><CheckIcon /></Button></>): (<><Button onClick = { () => handleDelete(id) }><DeleteIcon /></Button>
        <Link to={`${id}`} ><Button><AccessAlarmIcon/></Button></Link>
        <Button onClick={() => handleCompleted(id)}><CheckIcon /></Button></>) }
       */}
        {/* <Button onClick={() => handleDelete(id)}><DeleteIcon /></Button>
        <Link to={`${id}`} ><Button><AccessAlarmIcon/></Button></Link>
        <Button onClick={() => handleCompleted(id)}><CheckIcon /></Button> */}
        
          
      </CardContent>
      
      {/* </CardActionArea> */}
    </Card>
  );
}
