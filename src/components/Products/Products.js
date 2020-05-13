import React from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
const Product = (props) => {
    //console.log(props.product.key);
    const { img, name, seller, price, stock, key } = props.product;
    return (

        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link> </h4><br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p><br />
                <p>only {stock} left in stock</p>
                {props.showAddToCart && <button className="main-button"
                    onClick={() => props.handleAddProduct(props.product)}
                > add to cart
                    </button>}

            </div>

        </div>



    );
};

export default Product;