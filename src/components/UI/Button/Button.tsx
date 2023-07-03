import React, { FC } from 'react';
import './Button.css';
import classNames from 'classnames';

interface IButtonProps {
    classes?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: (e : any) => void;
    variant?: 'default' | 'cancel';
    children: React.ReactNode;
}

const Button: FC<IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
    classes, 
    disabled, 
    loading,
    onClick,
    children,
    variant = 'default',
    ...attrs 
}) => {

    let computedClasses = classNames('btn',{
        [`btn-${variant}`]: variant,
        'btn_disabled': disabled,
    }, classes)


    return (
        <button
            onClick={onClick} 
            className={computedClasses} 
            disabled={disabled}
            {...(attrs as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {loading ?
                '...':
                children
            }
        </button>
    )
};

export default Button;