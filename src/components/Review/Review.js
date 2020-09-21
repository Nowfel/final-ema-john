import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/Use-auth';


const Review = () => {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     setOrderPlaced(true);
    //     processOrder();
    // }
    const handleRemoveProduct = (productkey) => {
        const newCard = cart.filter(pd => pd.key !== productkey);
        setCart(newCard);
        removeFromDatabaseCart(productkey)
    }
    useEffect(() => {
        const savedCard = getDatabaseCart(); //retrieve
        const productKeys = Object.keys(savedCard);
        console.log(productKeys);
        fetch('http://localhost:4200/getProductsByKey', {
            method: 'POST',

            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productKeys),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const cardProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCard[key];
                    return product;
                });

                setCart(cardProducts);
            });
        //console.log(cardProducts);

    }, [])
    // let thanku;
    // if (orderPlaced) {
    //     thanku = <img src={happyImages} alt="" />
    // }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd}
                        key={pd.key}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
                {/* {thanku} */}
                {
                    !cart.length && <h1>your cart is empty. <a href="/shop">keep shoping</a> </h1>
                }
            </div>
            <div className="cart-container">
                <h1>cart</h1>
                <Card card={cart}>
                    <Link to='/shipment'>
                        {
                            auth.user ? <button className="main-button">Place Order</button> :
                                <button className="main-button">Pls login</button>

                        }
                    </Link>

                </Card>
            </div>

        </div>
    );
};

export default Review;