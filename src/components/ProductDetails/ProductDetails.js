import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Products';

const ProductDetails = () => {
    const {productkey}=useParams();
    const product=fakeData.find(pd=>pd.key===productkey);
    //console.log(product);
    return (
        <div>
            <h2>coooming sooon</h2>
            <Product product={product}
                     showAddToCart={false}
                     ></Product>
        </div>
    );
};

export default ProductDetails;