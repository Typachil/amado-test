import React, { useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import ProductsList from './components/ProductsList/ProductsList';
import { useGetProductsQuery } from './store/services/ProductsService';

function App() {
  return (
    <div>
      <Form id={1} />
      <ProductsList />
    </div>
  );
}

export default App;
