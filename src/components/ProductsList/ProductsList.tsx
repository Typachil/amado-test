import React, { FC, useState } from 'react';
import classNames from 'classnames';
import './ProductsList.css';
import { useAppSelector } from '../../hooks/redux';
import ProductCard from '../productCard/productCard';
import { useGetProductsQuery } from '../../store/services/ProductsService';

interface propsProductsList{
    classes?: string;
}

const ProductsList : FC<propsProductsList> = ({
    classes
    }
)=> {

    const {isLoading} = useGetProductsQuery();

    const { products } = useAppSelector((state) => state.reducerProducts);
    console.log(products)

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
            {!products && 
            <div className='products-empty'>
                {isLoading ? <div className="lds-dual-ring"></div> : 
                    <>
                        <img src='img/Empty.svg' />
                        <h1>В данный момент товары отсутствуют</h1>
                    </>
                }
            </div>
            }  
        </div>
    );
};

export default ProductsList;