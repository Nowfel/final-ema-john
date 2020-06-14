import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/Use-auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [shipmentInfo, setShipmentInfo] = useState(null);
    const [orderId,setOrderId] = useState(null);
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_51GstNME7XFOHi8LiRFBWJZ5U7eqVflqMTnfsmR8Dw9LSPXQjN008NQ01Z8ZudpAIsOY1oHoStI4lOaKE3bGcf7qC00vXtHtjQQ');


    const onSubmit = data => {
        setShipmentInfo(data);


    };
     const handlePlaceOrder = (payment)=>{
         
        const saveCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: saveCart,
            shipment: shipmentInfo,
            payment:payment
        };
        fetch('http://localhost:4200/placeOrder', {
            method: 'POST',

            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(orderDetails),
        })
            .then(res => res.json())
            .then(order => {
                //console.log(data);
                setOrderId(order.id);


                
                //alert('ur order');
                processOrder();
                // usr gives tnku
            })
     }

    return (
        <div className="container">
            <div className="row">
                <div className="col md 6" style={{display: shipmentInfo && 'none'}}>
                    <h3>
                        shipment information
                    </h3>

                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
                        {errors.name && <span className="error">Name is required</span>}

                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="email" />
                        {errors.email && <span className="error">email is required</span>}

                        <input name="addressline1" ref={register({ required: true })} placeholder="addressline1" />
                        {errors.addressline1 && <span className="error">addressline1 is required</span>}

                        <input name="addressline1" ref={register({ required: true })} placeholder="zipCode" />


                        <input name="city" ref={register({ required: true })} placeholder="city" />
                        {errors.city && <span className="error">city is required</span>}

                        <input name="country" ref={register({ required: true })} placeholder="zipCode" />
                        {errors.country && <span className="error">country is required</span>}

                        <input name="zipcode" ref={register({ required: true })} placeholder="zipCode" />
                        {errors.nazipcodeme && <span className="error">zipcode is required</span>}

                        <input type="submit" />
                    </form>
                </div>
                <div className="col md 6" style={{  marginTop: '200px',display: shipmentInfo ?'block' : 'none '}}>
                    <h4>payment information</h4>
                         <Elements stripe={stripePromise}>
                            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                        </Elements>
                        <br/>
                        {
                            orderId && <div>
                                <h3> Thank you for shoping with us </h3>
                        <p> Your order id : {orderId}</p>
                            </div>
                        }
                </div>
            </div>
        </div>
    );
};

export default Shipment;