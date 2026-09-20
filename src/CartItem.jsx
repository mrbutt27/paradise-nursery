import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './redux/CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + parseFloat(item.cost.replace('$', '')) * item.quantity;
  }, 0).toFixed(2);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total: ${totalAmount}</h3>
      {cartItems.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          <div>
            <h4>{item.name}</h4>
            <p>Price: {item.cost}</p>
            <div>
              <button onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })) : dispatch(removeItem(item.name))}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
            </div>
            <button onClick={() => dispatch(removeItem(item.name))} style={{ color: 'red', marginTop: '5px', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping} style={{ marginRight: '10px', padding: '10px 15px' }}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon')} style={{ background: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
