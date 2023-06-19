import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './Input.css';
import classNames from 'classnames';
import { HandySvg } from 'handy-svg';
import fileAddSrc from '../../../assets/file-add.svg';

interface IInputProps {
    classes?: string;
    onChange?: (e: ChangeEvent <HTMLInputElement>) => void;
    required?: boolean;
    type?: "text" | "file";
    value?: string;
    label: string;
    name: string;
}

const Input: FC<IInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes, 
    label, 
    value,
    onChange,
    name,
    required = true,
    type = "text", 
    ...attrs 
}) => {
    const [isDirty, setDirty] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        if(required){
            if(value){
                setError(false)
                setValid(true);
            }
            if(isDirty && !value){
                setError(true);
                setValid(false);
            }
        }
    }, [valid, value, isDirty])
    let computedClasses = classNames('input-container', 
        {
        "input-container_valid": valid,
        "input-container_error": error,
        "input-container_file": type === "file"
    }, classes)

    if(required) label += "*";
        
    return (
        <div className={computedClasses}>
            <input value={value} id={name} className="input" type={type} placeholder=" " {...attrs} onChange={onChange} onBlur={() => setDirty(true)}/>
            <div className="cut"></div>
            <label htmlFor={name} className="placeholder">{label}</label>
            {type === 'file' && <HandySvg src={fileAddSrc} className="input-container__file-icon"/>}
            {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
        </div>
    );
};

export default Input;