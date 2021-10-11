import { useState } from 'react';
import Warehouse from '../Warehouse';
import './App.css';

const DEFAULT_WAREHOUSES = [
  {
    id: 1,
    name: "Warehouse on Bond Street",
    products: []
  },
  {
    id: 2,
    name: "Warehouse on Fleet Street",
    products: []
  },
  {
    id: 3,
    name: "Warehouse on Queen Street",
    products: []
  },
]

function App() {
  const [warehouses, setWarehouses] = useState(DEFAULT_WAREHOUSES);
  const [activeWarehouseId, setActiveWarehouseId] = useState(null); // number | null

  const setProducts = (newProducts, id) => {
    setWarehouses(prev =>
      prev.map(wh => wh.id === id
        ? { ...wh, products: newProducts }
        : wh
      )
    )
  };

  return (
    <div className="App">
      <h1>Warehouses</h1>
      {warehouses.map(warehouse => (
        <Warehouse
          key={warehouse.id}
          name={warehouse.name}
          products={warehouse.products}
          setProducts={(newProducts) => setProducts(newProducts, warehouse.id)}
          isTableOpen={activeWarehouseId === warehouse.id}
          setIsTableOpen={(isOpen) => setActiveWarehouseId(isOpen ? warehouse.id : null)}
        />
      ))}
    </div>
  );
}

export default App;
