import React, { FC } from 'react';
import classNames from 'classnames';
import './productCard.css';
import { useAppDispatch } from '../../hooks/redux';
import { useDeleteProductMutation } from '../../store/services/ProductsService';
import { setCurrentProduct } from '../../store/reducers/reducerProducts';

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
    const [deletePost, response] = useDeleteProductMutation()

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
                <span className='product-card__price'>{price} &#8381;</span>
            </div>
            <button className="product-card__button product-card__button-edit" onClick={() => dispatch(setCurrentProduct(id))}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.7175 2.365C19.2031 1.85473 18.508 1.56813 17.7834 1.5675C17.1557 1.56955 16.5475 1.78627 16.06 2.18167L7.47086 9.16667L7.33336 9.30417C6.13623 10.4911 5.87065 12.3276 6.68253 13.805C6.34945 13.7034 6.00401 13.6479 5.65586 13.64C3.63082 13.64 1.9892 15.2816 1.9892 17.3067V19.5983C1.9892 20.3577 2.60481 20.9733 3.3642 20.9733H5.65586C6.92875 20.9664 8.10695 20.2997 8.76844 19.2122C9.42993 18.1246 9.48006 16.7718 8.90086 15.6383C9.26723 15.762 9.65086 15.827 10.0375 15.8308C11.0528 15.8377 12.0278 15.4344 12.7417 14.7125L12.8334 14.6117L19.8642 6.02251C20.7516 4.94314 20.6886 3.36984 19.7175 2.365ZM5.69253 19.5983H3.40086V17.3067C3.40086 16.041 4.42688 15.015 5.69253 15.015C6.95818 15.015 7.9842 16.041 7.9842 17.3067C7.9842 18.5723 6.95818 19.5983 5.69253 19.5983ZM11.8067 13.75L18.8375 5.15167C19.2685 4.61184 19.225 3.83438 18.7366 3.34593C18.2482 2.85749 17.4707 2.81403 16.9309 3.24501L8.3417 10.2758C7.38233 11.2327 7.38028 12.7861 8.33711 13.7454C9.29395 14.7048 10.8473 14.7068 11.8067 13.75Z" fill="black"/>
                    <path d="M12.1 9.01084L9.35003 11.7608C9.08195 12.0293 9.08195 12.4641 9.35003 12.7325C9.61845 13.0006 10.0533 13.0006 10.3217 12.7325L13.0717 9.98251C13.2556 9.81112 13.3313 9.553 13.2691 9.30941C13.2069 9.06582 13.0167 8.87561 12.7731 8.8134C12.5295 8.75119 12.2714 8.82691 12.1 9.01084Z" fill="black"/>
                </svg>
            </button>
            <button className="product-card__button product-card__button-trash" onClick={() => deletePost(id)}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.70831 1.30164H13.2916C16.3292 1.30164 18.7916 3.76407 18.7916 6.80164V15.0516C18.7916 18.0892 16.3292 20.5516 13.2916 20.5516H8.70831C5.67075 20.5516 3.20831 18.0892 3.20831 15.0516V6.80164C3.20831 3.76407 5.67075 1.30164 8.70831 1.30164ZM13.2916 18.865C15.3977 18.865 17.105 17.1577 17.105 15.0516V6.80164C17.105 4.69559 15.3977 2.9883 13.2916 2.9883H8.70831C6.60227 2.9883 4.89498 4.69559 4.89498 6.80164V15.0516C4.89498 17.1577 6.60227 18.865 8.70831 18.865H13.2916Z" fill="black"/>
                    <path d="M13.8691 5.26164C12.2955 6.31097 10.2453 6.31097 8.67165 5.26164C8.44941 5.09049 8.15037 5.05732 7.89604 5.1756C7.6417 5.29388 7.47438 5.54394 7.46207 5.82417C7.44975 6.1044 7.5945 6.36817 7.83748 6.5083C8.85118 7.18924 10.0446 7.55302 11.2658 7.5533C12.4774 7.54596 13.66 7.18255 14.6666 6.5083C14.9096 6.36817 15.0544 6.1044 15.0421 5.82417C15.0297 5.54394 14.8624 5.29388 14.6081 5.1756C14.3538 5.05732 14.0547 5.09049 13.8325 5.26164H13.8691Z" fill="black"/>
                </svg>
            </button>
        </div>
    );
};

export default ProductCard;