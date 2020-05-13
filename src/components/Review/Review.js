import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Cart/Cart';
import happyImages from '../../images/giphy.gif'


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true);
     processOrder();
    }
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
     let thanku;
     if(orderPlaced){
         thanku=<img src={happyImages} alt=""/>
     }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd}
                        key={pd.key}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
                {thanku}
            </div>
            <div className="cart-container">
                <h1>cart</h1>
                <Card card={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Card>
            </div>

        </div>
    );
};

export default Review;