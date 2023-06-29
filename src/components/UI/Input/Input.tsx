import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './Input.css';
import classNames from 'classnames';
import { HandySvg } from 'handy-svg';
import fileAddSrc from '../../../assets/file-add.svg';

interface IInputProps {
    classes?: string;
    onChange?: (e: any ) => void;
    required?: boolean;
    type?: "text" | "file" | "desc" | "number";
    value?: string | number;
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
    let computedClasses = classNames(
        {
        "input-container": type !== "file",
        "input-container_valid": valid,
        "input-container_error": error,
        "input-container_file": type === "file",
        
    }, classes)

    if(required) label += "*";

    if(type === "desc"){
        return (
            <label className={computedClasses}>
                <textarea
                    id={name} 
                    className="input" 
                    placeholder=" " 
                    onBlur={() => setDirty(true)}
                    onChange={onChange}
                    value={value}>
                        
                </textarea>
                <div className="placeholder">{label}</div>
                {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
            </label>
        )
    }

    if(type === "file"){
        return(
            <label className={computedClasses}>
                <input id={name} className="input" type={type} placeholder=" " {...attrs} onChange={onChange} onBlur={() => setDirty(true)}/>
                <div className="file-value">{type === "file" && value}</div>
                <div className="placeholder-file">{label}</div>
                {type === 'file' && <HandySvg src={fileAddSrc} className="input-container__file-icon"/>}
                {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
            </label>
        )
        
    }
        
    return (
        <label className={computedClasses}>
            <input value={value} id={name} className="input" type={type} placeholder=" " {...attrs} onChange={onChange} onBlur={() => setDirty(true)}/>
            <div className="placeholder">{label}</div>
            {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
        </label>
    );
};

export default Input;