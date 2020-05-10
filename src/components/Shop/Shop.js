import React from 'react';
//import fakeData from '../../fakeData';
import fakeData from '../../fakeData';
import { useState} from 'react';
import './Shop.css';
import Card from '../Cart/Cart';
import Product from '../Products/Products';


const Shop = () => {
    //    console.log(fakeData);
      const first11= fakeData.slice(0,12);
    const [products, setProducts] = useState(first11);
    const [card, setCard] = useState([]);
    const handleAddProduct = (product) => {
        const newSetCard = [...card, product];
        setCard(newSetCard);
        
    }
    return (<div className="twin-container" >
        <div className="product-container" >

            {
                products.map(prod => <Product
                    product={prod}
                    handleAddProduct={handleAddProduct}
                >

                </Product>)
            }
        </div>
        <div className="card-container" >
            <Card card={card}></Card>
        </div>


    </div>
    );
};

export default Shop;