import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

// ---------------- Cart Main ------------------

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"
      onClick={() => setOpenCart(false)} // Click outside closes cart
    >
      <div
        className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm"
        onClick={(e) => e.stopPropagation()} // Prevent click inside cart from closing it
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart?.length} items
                </h5>
              </div>

              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={i._id || index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px]">
                  <h1 className="text-white text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ---------------- CartSingle ------------------

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = () => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      quantityChangeHandler({ ...data, qty: value + 1 });
    }
  };

  const decrement = () => {
    const newValue = value === 1 ? 1 : value - 1;
    setValue(newValue);
    quantityChangeHandler({ ...data, qty: newValue });
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center">
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
            onClick={increment}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="py-[5px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={decrement}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
  <img
  src={data?.images?.[0]?.url || "/fallback.jpg"}
  alt={data?.name || "Product image"}
  className="w-[120px] h-[120px] object-cover mx-2 rounded-[5px]"
/>

        <div className="pl-[5px] flex-1">
          <h1 className="text-sm font-medium">{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            USD${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer ml-2"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

// ---------------- Search Suggestion Dropdown ------------------

export const SearchSuggestionDropdown = ({ searchData }) => {
  return (
    <>
      {searchData && searchData.length > 0 && (
        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full max-h-[300px] overflow-y-auto rounded-md">
          {searchData.map((item, idx) => (
            <Link to={`/product/${item._id || item.id}`} key={item._id || idx}>
              <div className="w-full flex items-start py-3">
                <img
                  src={item.image_Url}
                  alt={item.name || item.title}
                  className="w-[60px] h-[60px] mr-3 object-cover rounded"
                />
                <h1 className="text-sm text-black">{item.name || item.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Cart;
