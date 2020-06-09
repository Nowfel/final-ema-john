import React from 'react';
import fakeData from '../../fakeData'

const Inventory = () => {
    const handleAddInventory = ()=>{
        const product = fakeData;
        console.log(product);
        
        fetch('http://localhost:4200/addProduct', {
            method:'POST',
            
            headers: {
               "Content-type": "application/json"
            },
            body:JSON.stringify(fakeData),
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data);
        })



    }
    return (
        <div>
            <h1> inveeeen </h1>
            <button onClick={handleAddInventory}>add product</button>
        </div>
    );
};

export default Inventory;