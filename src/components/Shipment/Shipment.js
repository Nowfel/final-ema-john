import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/Use-auth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../../CheckoutForm/CheckoutForm';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    const onSubmit = data => {

        const saveCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: saveCart,
            shipment: data
        };
        fetch('http://localhost:4200/placeOrder', {
            method: 'POST',

            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(orderDetails),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('ur order');
                processOrder();
            })

    };


    return (
        <div className="container">
            <div className="row">
                <div className="col md 6">
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
                <div className="col md 6">
                    <h4>
                        payment information
                        <Elements stripe={stripePromise}>
                            <CheckoutForm></CheckoutForm>
                        </Elements>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Shipment;