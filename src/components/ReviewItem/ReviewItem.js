import React from 'react';

const ReviewItem = (props) => {

    const { name, quantity, key, price } = props.product;

    return (
        <div style={{
            paddingBottom: '5px', borderBottom: '1px solid lightgray', marginBottom: '5px', marginLeft: '200px'
        }} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>quantity:{quantity}</p><br />
            <p><small>${price}</small></p>
            <button className="main-button"
                onClick={() => props.handleRemoveProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;