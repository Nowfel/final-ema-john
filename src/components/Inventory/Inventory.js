import React from 'react';
import fakeData from '../../fakeData'

const Inventory = () => {
    const handleAddInventory = ()=>{
        console.log(fakeData[0]);
    }
    return (
        <div>
            <h1> inveeeen </h1>
            <button onClick={handleAddInventory}>add product</button>
        </div>
    );
};

export default Inventory;