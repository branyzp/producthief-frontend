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

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

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
  api: string;
}


export default function ToDoCard({ title, description, completed, id, todos, setTodos, api }: Props) {
  


  const handleDelete = (id: number) => {
    axios.delete(api + id)
    setTodos(todos.filter(todo=>todo.id !== id))
  
}
  
  const handleEdit = (id: number) => {
    axios.put(api + id)

}

  const handleCompleted = (id: number) => {
  setTodos(todos.map(todo=>todo.id === id?{...todo,completed:!todo.completed}:todo))
  
}
  

  return (
    <Card className='ToDoCard' sx={{ maxWidth: 500 , maxHeight: 345}}>
      {/* <CardActionArea> */}
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {completed ? <s>{title}</s> : <b>{title}</b>}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {completed ? <>Way to go!</> : <>{ description }</>}
        </Typography>
        <Button onClick={()=>handleEdit(id)}><EditIcon/></Button>
        <Button onClick={()=> handleDelete(id)}><DeleteIcon /></Button>
        <Button onClick={()=>handleCompleted(id)}><CheckIcon/></Button>
          
      </CardContent>
      
      {/* </CardActionArea> */}
    </Card>
  );
}
