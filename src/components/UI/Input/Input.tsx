import React, { ChangeEvent, FC } from 'react';
import './Input.css';
import classNames from 'classnames';
import { HandySvg } from 'handy-svg';
import fileAddSrc from '../../../assets/file-add.svg';

interface IInputProps {
    classes?: string;
    onChange?: (e: ChangeEvent <HTMLInputElement>) => void;
    required?: boolean;
    valid?: boolean;
    error?: boolean
    type?: "text" | "file";
    value?: string;
    label: string;
    name: string;
}

const Input: FC<IInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes, 
    label, 
    valid = false,
    error = false, 
    value,
    onChange,
    name,
    required = true,
    type = "text", 
    ...attrs 
}) => {
    let computedClasses = classNames('input-container', 
        {
        "input-container_valid": valid,
        "input-container_error": error,
        "input-container_file": type === "file"
    }, classes)

    if(required) label += "*";
        
    return (
        <div className={computedClasses}>
            <input value={value} id={name} className="input" type={type} placeholder=" " {...attrs} onChange={onChange}/>
            <div className="cut"></div>
            <label htmlFor={name} className="placeholder">{label}</label>
            {type === 'file' && <HandySvg src={fileAddSrc} className="input-container__file-icon"/>}
            {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
        </div>
    );
};

export default Input;