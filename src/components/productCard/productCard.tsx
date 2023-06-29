import React, { FC } from 'react';
import classNames from 'classnames';
import './ProductCard.css';
import {ReactComponent as EditIcon} from '../../assets/Edit-icon.svg';
import {ReactComponent as TrashIcon} from '../../assets/Trash-icon.svg';
import { useAppDispatch } from '../../hooks/redux';
import { useDeleteProductMutation } from '../../store/services/ProductsService';
import { setCurrentProduct } from '../../store/reducers/reducerProducts';
import { priceFix } from '../../hooks/priceFix';

interface propsProductCard{
    id: number;
    title: string;
    desc: string;
    price: number;
    image?: string;
    classes?: string;
}

const ProductCard : FC<propsProductCard> = ({
    id,
    title,
    price,
    image,
    classes,
    desc}
)=> {
    const dispatch = useAppDispatch();
    const [deletePost, response] = useDeleteProductMutation();

    const deletePostEvent = (id : number) => {
        deletePost(id)
          .unwrap()
          .then((res) => {})
    }

    const computedClasses = classNames('product-card', classes);
    return (
        <div className={computedClasses}>
            <div className='product-card__img'>
                <img src={image ? image : "/img/no-img.svg"} />
            </div>
            <div className='product-card__content'>
                <h3 className='product-card__title'>{title}</h3>
                <p className='product-card__desc'>
                    <b>Описание:</b>
                    {desc}
                </p>
                <span className='product-card__price'>{priceFix(price)}</span>
            </div>
            <button className="product-card__button product-card__button--edit" onClick={() => dispatch(setCurrentProduct(id))}>
                <EditIcon />
            </button>
            <button className="product-card__button product-card__button--trash" onClick={() => deletePostEvent(id)}>
                <TrashIcon />
            </button>
        </div>
    );
};

export default ProductCard;