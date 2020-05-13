import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Card from '../Cart/Cart';
import Product from '../Products/Products';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first11 = fakeData.slice(0, 12);
    //console.log(fakeData);
    const [products, setProducts] = useState(first11);
    //console.log(products);
    const [card, setCard] = useState([]);
    useEffect(() => {
        const savedCard = getDatabaseCart();
        const productKeys = Object.keys(savedCard);

        const cardProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCard[key];
            return product;
        });
        //console.log(cardProducts);
        setCard(cardProducts);
    },[])
    const handleAddProduct = (product) => {
        const toBeAaddedKey = product.key;
        const sameProduct = card.find(pd => pd.key === toBeAaddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = card.filter(pd => pd.key !== toBeAaddedKey);
            newCart = [...others, sameProduct];

        }
        else {
            product.quantity = 1;
            newCart = [...card, product];
        }

        setCard(newCart);

        addToDatabaseCart(product.key, count);
        //console.log('added', sameProducts);

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
            <Card card={card}>
            {<Link to="/review">
                <button className="main-button">Review Order</button>
            </Link>}
            </Card>
        </div>


    </div>
    );
};

export default Shop;