import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import './Form.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useAddNewProductMutation, useUpdateProductMutation } from '../../store/services/ProductsService';
import { setCurrentProduct } from '../../store/reducers/reducerProducts';

interface propsForm{
    classes?: string;
}

const Form : FC<propsForm> = ({ classes }) => {
    const dispatch = useAppDispatch();
    const [addNewProduct, responseAdd] = useAddNewProductMutation();
    const [updateProduct, responseUpdate] = useUpdateProductMutation();

    const [valueName, setValueName] = useState<string>("");
    const [valuePrice, setValuePrice] = useState<number | string>();
    const [valueImg, setValueImg] = useState<any>();
    const [valueDesc, setValueDesc] = useState<string>("");
    const [validForm, setValidForm] = useState<boolean>(false)
    const { currentProduct } = useAppSelector((state) => state.reducerProducts)

    const computedClasses = classNames('form-block', classes);

    useEffect(() => {
        setValueName(currentProduct?.title || "")
        setValuePrice(currentProduct?.price || "")
        setValueImg(currentProduct?.image || "")
        setValueDesc(currentProduct?.description || "")
    }, [currentProduct])

    useEffect(() => {
        setValidForm(validateFormInputs(valueName, String(valuePrice), valueDesc))
    }, [valueName, valuePrice, valueDesc])

    const cleanForm = () => {
        setValueName("");
        setValuePrice("");
        setValueImg("");
        setValueDesc("");
    } 

    const validateFormInputs = (...args : string[]) => {
        let validate = false;
        for(var i = 0; i < args.length; i++){
            if(!args[i]){
                validate = false
                break;
            }
            validate = true
        }
        return validate;
    }

    const createData = () => {
        const data = new FormData();
        data.append("title", valueName);
        data.append("price", String(valuePrice));
        data.append("description", valueDesc);
        if(valueImg?.name) data.append("image", valueImg);
        return data;
    }

    const addNewProductEvent = () => {
        const productData = createData();   
        addNewProduct(productData)
          .unwrap()
          .then((res) => { 
            if(res){
                cleanForm();
            }
          })
    }

    const updateProductEvent = () => {
        const productData = createData();
        productData.append("id", String(currentProduct?.id));
        updateProduct(productData)
        .unwrap()
        .then((res) => { 
            if(res){
                dispatch(setCurrentProduct(0))
            }
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValueImg(e.target.files[0]);
        }
      };

    return (
        <div className={computedClasses}>
            <h2>Добавление товара</h2>
            <p>Заполните все обязательные поля с *</p>
            <form>
                <Input name='name' label='Название' 
                    value={valueName} 
                    onChange={(e) => setValueName(e.target.value)} 
                />
                <Input name='price' label='Цена'
                    type='number' 
                    value={valuePrice}
                    onChange={(e) => setValuePrice(e.target.value)} 
                    />
                <Input name='img' type='file' label='Фото'
                    value={valueImg?.name}
                    required={false}
                    onChange={handleFileChange}  
                    accept='image/*,.png,.jpg'/>
                <Input name='desc' label='Описание товара'
                    type='desc' 
                    value={valueDesc}
                    onChange={(e) => setValueDesc(e.target.value)}  
                    classes='form-block__input-desc'/>
                {!currentProduct && <Button disabled={!validForm && true} types='default' classes='form-block__button' onClick={addNewProductEvent}>
                    Добавить товар
                </Button>}
                {currentProduct &&
                    <>
                        <Button disabled={!validForm && true} types='default' classes='form-block__button' onClick={updateProductEvent}>
                            Редактировать товар
                        </Button>
                        <Button types='cancel' classes='form-block__button' onClick={() => dispatch(setCurrentProduct(0))}>
                            Отменить редактирование
                        </Button>
                    </>      
                }
            </form>
        </div>
    );
};

export default Form;