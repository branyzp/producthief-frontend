
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const Index = () => {
    
    
    

    return (
        <div>
            <>
                <h1 className='pagetext'>Hi. <br /> <br/>
                    Welcome to Producthief. <br /> <br />
                    It's time to steal your life back.
                </h1>

                
                
                <Link to={'/todo'}>Find Your Focus</Link> <br /> <br />
                <Link to={'/Blog'}>Blog</Link><br /> <br />
                <Link to={'/Tells'}>Tell yourself something you'd like to achieve</Link><br /> <br />

                

               
                
            </>
            

        </div>
    );
};

export default Index;