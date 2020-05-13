import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Card from '../Cart/Cart';
import Product from '../Products/Products';
import {  addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    const first11 = fakeData.slice(0, 12);
    //console.log(fakeData);
    const [products, setProducts] = useState(first11);
    //console.log(products);
    const [card, setCard] = useState([]);
    const handleAddProduct = (product) => {
        const newSetCard = [...card, product];
        setCard(newSetCard);
        const sameProducts=newSetCard.filter(pd=>pd.key===product.key);
        const count=sameProducts.length;
        addToDatabaseCart(product.key,count);
        console.log('added',sameProducts);

    }
    //console.log(card);
    return (<div className="twin-container" >
        <div className="product-container" >

            {
                products.map(prod => <Product
                    product={prod}
                    showAddToCart={true}
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