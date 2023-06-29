import React, { FC, useEffect, useState } from 'react';
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
    dirtyForm?: boolean;
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
    dirtyForm, 
    ...attrs 
}) => {

    const [isDirty, setDirty] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if(!dirtyForm){
            setDirty(false);
        }
        if(required){
            if(value){
                setError(false)
                setValid(true);
            }
            if(isDirty && !value){
                setError(true);
                setValid(false);
            }
            if(!dirtyForm){
                setValid(false);
                setError(false);
            }
        }
    }, [valid, value, isDirty, dirtyForm])

    let computedClasses = classNames(
        {
        "input-wrapper": type !== "file",
        "input-wrapper--valid": valid,
        "input-wrapper--error": error,
        "input-wrapper--file": type === "file",
        
    }, classes)

    if(required) label += "*";

    if(type === "desc"){
        return (
            <div className='input-container'>
                <label className={computedClasses}>
                    <textarea
                        id={name} 
                        className="input-wrapper__input" 
                        placeholder=" " 
                        onBlur={() => setDirty(true)}
                        onChange={onChange}
                        value={value}>
                            
                    </textarea>
                    <div className="input-wrapper__placeholder">{label}</div>    
                </label>
                {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
            </div>
        )
    }

    if(type === "file"){
        return(
            <div className='input-container'>
                <label className={computedClasses}>
                    <input id={name} className="input-wrapper__input" type={type} placeholder=" " {...attrs} onChange={onChange} onBlur={() => setDirty(true)}/>
                    <div className="input-wrapper__file-value">{type === "file" && value}</div>
                    <div className="input-wrapper__placeholder-file">{label}</div>
                    {type === 'file' && <HandySvg src={fileAddSrc} className="input-wrapper__file-icon"/>}
                </label>
                {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
            </div>
            
        )
        
    }
        
    return (
        <div className='input-container'>
            <label className={computedClasses}>
                <input value={value} id={name} className="input-wrapper__input" type={type} placeholder=" " {...attrs} onChange={onChange} onBlur={() => setDirty(true)}/>
                <div className="input-wrapper__placeholder">{label}</div>
            </label>
            {error && <div className='input-container__message-error'>Обязательное поле для заполнения</div>}
        </div>
    );
};

export default Input;