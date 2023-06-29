import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import './ProductsList.css';
import { useAppSelector } from '../../hooks/redux';
import ProductCard from '../productCard/productCard';

interface propsProductsList{
    classes?: string;
}

const ProductsList : FC<propsProductsList> = ({classes}) => {
    const { products } = useAppSelector((state) => state.reducerProducts);

    const computedClasses = classNames('products-list__wrapper', classes);
    return (
        <div className={computedClasses}>
            <div className="products-list">
                {products?.map((item) =>{
                    return (
                        <ProductCard
                            key={item.id}
                            id={item.id} 
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            desc={item.description}/>
                    )
                })}
            </div> 
            {!products?.length && 
            <div className='products-empty'>
                <img src='/img/Empty.svg' />
                <h1>В данный момент товары отсутствуют</h1>
            </div>
            }  
        </div>
    );
};

export default ProductsList;