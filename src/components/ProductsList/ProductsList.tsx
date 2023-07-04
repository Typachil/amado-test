import React, { FC } from 'react';
import classNames from 'classnames';
import './ProductsList.css';
import { useAppSelector } from '../../hooks/redux';
import ProductCard from '../ProductCard/ProductCard';
import { useGetProductsQuery } from '../../store/services/ProductsService';

interface propsProductsList{
    classes?: string;
}

const ProductsList : FC<propsProductsList> = ({classes}) => {
    const { products, isLoading } = useAppSelector((state) => state.reducerProducts);
    const {} = useGetProductsQuery();

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
            {!products?.length && !isLoading && 
            <div className='products-empty'>
                <img src='/img/Empty.svg' />
                <h1>В данный момент товары отсутствуют</h1>
            </div>
            }  
        </div>
    );
};

export default ProductsList;