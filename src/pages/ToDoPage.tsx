import React, { useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { title } from 'process';

interface Props{
    todoapi: string;
}

interface todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export default function ToDoPage({todoapi}:Props) {
    const [todo,setTodo] = useState<any>()
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async()=>{
            await axios({
            method: 'get',
            url:todoapi + id
        }).then(res => setTodo(res.data))
                .catch(err => console.log(err))
        }

        fetchData();
        
    }, [])

    console.log(todo)

    return (
        <div>
            <h1>Focus:
            </h1>
        </div>
    );
};

