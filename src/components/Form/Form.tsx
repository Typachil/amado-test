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
    const [valuePrice, setValuePrice] = useState<string>("");
    const [valueImg, setValueImg] = useState<any>();
    const [valueDesc, setValueDesc] = useState<string>("");
    const [validForm, setValidForm] = useState<boolean>(false)
    const { currentProduct } = useAppSelector((state) => state.reducerProducts)

    const computedClasses = classNames('form-block', classes);

    useEffect(() => {
        setValueName(currentProduct?.title || "")
        setValuePrice(String(currentProduct?.price || ""))
        setValueImg(currentProduct?.image || "")
        setValueDesc(currentProduct?.description || "")
    }, [currentProduct])

    useEffect(() => {
        setValidForm(validateFormInputs(valueName, valuePrice, valueDesc))
    })

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
        data.append("price", valuePrice);
        data.append("description", valueDesc);
        data.append("image", valueImg);
        return data;
    }

    const addNewProductEvent = (e : any) => {
        const productData = createData();
        addNewProduct(productData)
          .unwrap()
          .then(() => {})
    }

    const updateProductEvent = (e : any) => {
        const productData = createData();
        productData.append("id", String(currentProduct?.id));
        updateProduct(productData)
        .unwrap()
        .then((response) => { response &&  dispatch(setCurrentProduct(0))})
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
                    classes='form-block__input'
                />
                <Input name='price' label='Цена' 
                    value={valuePrice}
                    onChange={(e) => setValuePrice(e.target.value)} 
                    classes='form-block__input'/>
                <Input name='img' type='file' label='Фото'
                    required={false}
                    onChange={handleFileChange}  
                    classes='form-block__input'
                    accept='image/*,.png,.jpg'/>
                <Input name='desc' label='Описание товара' 
                    value={valueDesc}
                    onChange={(e) => setValueDesc(e.target.value)}  
                    classes='form-block__input form-block__input-desc'/>
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