import React from 'react';
import Form from './components/Form/Form';
import ProductsList from './components/ProductsList/ProductsList';
import Loader from './components/Loader/Loader';
import { useGetProductsQuery } from './store/services/ProductsService';

function App() {
  
  return (
    <>
      <Loader />
      <Form />
      <ProductsList />
    </>
  );
}

export default App;
