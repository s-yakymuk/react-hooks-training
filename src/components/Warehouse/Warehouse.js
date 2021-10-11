import { useRef, useState, useEffect } from 'react';
import { v4 as uniqueId } from "uuid";

import './Warehouse.css';

const DEFAULT_NEW_PRODUCT = {
  name: "",
  quantity: "",
  price: ""
};

function Warehouse(props) {
  // logic: hooks, props calculation
  const { name, products, setProducts, isTableOpen, setIsTableOpen } = props;
  const inputRef = useRef();
  const [newProduct, setNewProduct] = useState(DEFAULT_NEW_PRODUCT);
  const [validationError, setValidationError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // validation
    if (newProduct.name && newProduct.quantity && newProduct.price) {
      setProducts([...products, {
        id: uniqueId(),
        name: newProduct.name,
        quantity: newProduct.quantity,
        price: newProduct.price,
      }]);
      setNewProduct(DEFAULT_NEW_PRODUCT);
      setValidationError("");
    } else {
      setValidationError("Enter data in all fields!");
    }
  }

  const grandTotal = products
    .reduce((sum, product) =>
      sum + Number(product.price) * Number(product.quantity)
      , 0);

  const tableContent = (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{Number(product.price) * Number(product.quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onSubmit}>
        <div className="new-product-input">
          <label htmlFor="product-name-input">Product:</label>
          <input ref={inputRef} id="product-name-input" type="text" value={newProduct.name}
            onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="new-product-input">
          <label htmlFor="product-name-input">Quantity:</label>
          <input id="product-name-input" type="number" value={newProduct.quantity}
            onChange={e => setNewProduct(prev => ({ ...prev, quantity: e.target.value }))}
          />
        </div>
        <div className="new-product-input">
          <label htmlFor="product-name-input">Price:</label>
          <input id="product-name-input" type="number" value={newProduct.price}
            onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {!!validationError && <div className="new-product-error">{validationError}</div>}
    </>
  );

  useEffect(() => {
    if (isTableOpen) {
      inputRef.current.focus();
    }
  }, [isTableOpen]);

  useEffect(() => {
    if (grandTotal > 100000) {
      window.alert("Too much!");
    }
  }, [grandTotal]);

  // render
  return (
    <section>
      <div className="warehouse-header">
        <h2>{name}</h2>
        <button type="button" onClick={() => setIsTableOpen(!isTableOpen)}>
          {isTableOpen ? "🠑" : "🠓"}
        </button>
      </div>
      {isTableOpen ? tableContent : null}
    </section>
  );
}

export default Warehouse;
