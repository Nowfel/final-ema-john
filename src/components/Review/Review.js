import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Cart/Cart';


const Review = () => {
    const [cart, setCart] = useState([]);
    const handleRemoveProduct = (productkey) => {
        const newCard = cart.filter(pd => pd.key !== productkey);
        setCart(newCard);
        removeFromDatabaseCart(productkey)
    }
    useEffect(() => {
        const savedCard = getDatabaseCart();//retrieve
        const productKeys = Object.keys(savedCard);

        const cardProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCard[key];
            return product;
        });
        //console.log(cardProducts);
        setCart(cardProducts);
    }, [])

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd}
                        key={pd.key}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <h1>cart</h1>
                <Card card={cart}></Card>
            </div>

        </div>
    );
};

export default Review;