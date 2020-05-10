import React from 'react';
import './Products.css';
const Product = (props) => {
    // console.log(props);
    const { img, seller, price, stock,} = props.product;
    return (

        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"> </h4><br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p><br />
                <p>only {stock} left in stock</p>
                <button className="main-button"
                    onClick={() => props.handleAddProduct(props.product)}> add to cart
                    </button>

            </div>

        </div>



    );
};

export default Product;