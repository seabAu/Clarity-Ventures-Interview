import React from 'react';

interface Product
{
    _id: number,
    name: string,
    brand: string,
    description: string,
    price: number,
    quantity: number,
    stock: number,
    image: string,
}

const ProductComponent = () => {
    return (
        <div>ProductComponent</div>
    );
}

export default ProductComponent;