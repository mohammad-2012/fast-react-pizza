import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

function isValidPhone(phone) {
  return /^[0-9]{11}$/.test(phone);
}

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {username , status : addressStatus , position , address , error : errorAddress} = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">  
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">First Name :</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            autoComplete="off"
            defaultValue={username}
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">Phone number :</label>
          <div className="grow">
            <input
              className="w-full input"
              type="tel"
              name="phone"
              autoComplete="off"
              required
            />
            {formErrors?.phone && (
              <p className="p-2 mt-2 text-red-700 bg-red-100 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">Address :</label>
          <div className="grow">
            <input
              className="w-full input"
              type="text"
              name="address"
              autoComplete="off"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
           {addressStatus === "error" && (
              <p className="p-2 mt-2 text-red-700 bg-red-100 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>

         {!position.latitude && !position.longtitude && <span className="absolute right-[3px] sm:right-[5px] sm:top-[5px] top-[3px] z-50">
          <Button disabled={isLoadingAddress} type="small" onClick={(e) => {
            e.preventDefault()
            dispatch(fetchAddress())}} >
            Get Position
          </Button>
          </span>}
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium select-none">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longtitude ? `${position.latitude} ${position.longtitude}` : ""} />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? "Placing Order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. we might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}
