import { useRef, useState, useEffect } from 'react';
import { v4 as uniqueId } from "uuid";

import './Warehouse.css';

function Warehouse(props) {
  // logic: hooks, props calculation
  const { name, products, setProducts, isTableOpen, setIsTableOpen } = props;
  const inputRef = useRef();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [validationError, setValidationError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // validation
    if (productName && productQuantity && productPrice) {
      setProducts([...products, {
        id: uniqueId(),
        name: productName,
        quantity: productQuantity,
        price: productPrice,
      }]);
      setProductName("");
      setProductPrice("");
      setProductQuantity("");
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
          <label htmlFor={`${name}-product-name-input`}>Product:</label>
          <input
            type="text"
            ref={inputRef}
            value={productName}
            id={`${name}-product-name-input`}
            onChange={e => setProductName(e.target.value)}
          />
        </div>
        <div className="new-product-input">
          <label htmlFor={`${name}-product-quantity-input`}>Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            id={`${name}-product-quantity-input`}
            onChange={e => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="new-product-input">
          <label htmlFor={`${name}-product-price-input`}>Price:</label>
          <input
            type="number"
            value={productPrice}
            id={`${name}-product-price-input`}
            onChange={e => setProductPrice(e.target.value)}
          />
        </div>
        <button id={`${name}-submit-button`} type="submit">Add</button>
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
        <button
          type="button"
          onClick={() => setIsTableOpen(!isTableOpen)}
          aria-label={isTableOpen ? "Collapse Warehouse" : "Expand Warehouse"}
        >
          {isTableOpen ? "⇧" : "⇩"}
        </button>
      </div>
      {isTableOpen ? tableContent : null}
    </section>
  );
}

export default Warehouse;
