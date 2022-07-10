import axios from 'axios';
import React, { useEffect, useState } from 'react';



interface Props{
    tellsapi: string;
}

interface tells {
    id: number;
    goal: string;
    steps: string;
    created_date: string
}

const Tells = ({ tellsapi }: Props) => {
    const [tell, setTell] = useState<tells[]>([])
    const [newGoal, setNewGoal] = useState<string>('')
    const [newStep, setNewStep] = useState<string>('')
    
    

    useEffect(() => {
        const fetchData = async()=>{
            await axios({
            method: 'get',
            url:tellsapi
        }).then(res => setTell(res.data))
                .catch(err => console.log(err))
        }
        fetchData();
    }, [])
    
    console.log(tell)


    return (
        <div className='newTellContainer'>
            <input className='input_box' placeholder='title' />
            <input className='input_box' placeholder='steps'/>
        </div>
    );
};

export default Tells;