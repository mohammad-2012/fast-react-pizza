import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from "./EmptyCart"

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector(state => state.user.username)
  const cart = useSelector(getCart);
  const dispatch = useDispatch()

  if(!cart.length) return <EmptyCart />

  return (
    <div className='px-3 py-4'>
     <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold mt-7'>Your cart, {username}</h2>

      <ul className='mt-3 border-b divide-y divide-slate-300'>
        {cart.map(item => <CartItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className='mt-6 space-x-4'>
        <Button to="/order/new" type="primary">Order Pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
