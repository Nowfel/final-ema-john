import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Products';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productkey}=useParams();
   const [product, setProduct] = useState(null);
   useEffect(()=>{
    fetch('http://localhost:4200/product/'+productkey)
    .then(res => res.json())
    .then(data=>{
        setProduct(data)
    });
   },[])
    //console.log(product);
    return (
        <div>
            <h2>product details</h2>
           { product && <Product product={product}
                     showAddToCart={false}
                     ></Product>}
        </div>
    );
};

export default ProductDetails;