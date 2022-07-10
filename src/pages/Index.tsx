import { Link } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';


const Index = () => {
    
    
    

    return (
        <div>
            <>
                <h1 className='pagetext'>Hi. <br /> <br/>
                    Welcome to Producthief. <br /> <br />
                    It's time to steal your life back.
                </h1>

                <br /> <br />
                
                <Link to={'/todo'} style={{ textDecoration: 'none' }}>
                
            </Link>

                

               
                
            </>
            

        </div>
    );
};

export default Index;