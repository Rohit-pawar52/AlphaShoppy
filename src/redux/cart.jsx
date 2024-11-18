import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCartData,
  addCartItemCount,
  removeCartItemCount,
  clearCartItem,
} from "../redux/slicer";
import { FaRegTrashAlt } from "react-icons/fa";

export function Cart() {
  let data = useSelector((state) => state.data.cart);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);

  // funtion for remove cart item//
  function handleRemoveCartItem(e) {
    const removeID = e.target.id;
    if (window.confirm("Record Deleted.\nAre you sure?") === true) {
      dispatch(removeCartData(removeID));
    } else {
      return false;
    }
  }
  // function for add cart count//
  function handleAddCartCount(e) {
    const countID = e.target.id;
    dispatch(addCartItemCount(countID));
  }
  // function for add cart count//
  function handleRemoveCartCount(e) {
    const countID = e.target.id;
    dispatch(removeCartItemCount(countID));
  }

  // function for total amount

  useEffect(() => {
    const newAmount = data.reduce(
      (acc, item) => acc + item.min_max_price.min_price * item.count,
      0
    );
    setAmount(newAmount);

    const newTax = (newAmount * 5) / 100;
    setTax(newTax);
  }, [data]);

  return (
    <>
      {/* cart list */}
      <div className="bg-[#addadd] p-8 px-20 grid place-items-center lg:flex lg:justify-between mt-1">
        <h4 className="text-3xl">Cart</h4>

        <p className="">
          <Link to="/">Home</Link>/<span className="text-gray-500">Cart</span>
        </p>
      </div>

      <div className="my-4 flex flex-wrap justify-evenly">
        <div>
          <div className="grid justify-end mb-3">
            <button
              onClick={() => {
                dispatch(clearCartItem([]));
              }}
              className="content-end border rounded-md p-1 px-5 bg-[#f70000] text-white font-semibold active:scale-75 duration-150 ease-in-out"
            >
              Clear
            </button>
          </div>
          <table>
            <thead>
              <tr className="bg-gray-300 uppercase">
                <th className="w-32 p-2">Image</th>
                <th className="w-32 p-2">Price</th>
                <th className="w-32 p-2">Quantity</th>
                <th className="w-32 p-2">Total</th>
                <th className="p-[1.92rem]"></th>
              </tr>
            </thead>
          </table>

          <div style={{ maxHeight: "450px", overflow: "auto", scrollbarWidth:"none"}}>
            <table>
              <tbody className="border-red-500">
                {data.map((item) => (
                  <tr key={item.id} className="text-center hover:bg-gray-200 cursor-pointer">
                    <td className="w-32 p-2">
                      <img
                        src={item.image}
                        className="h-20 w-20 m-auto"
                        alt=""
                      />
                      <p>{item.name}</p>
                    </td>
                    <td className="w-32 p-2">{item.min_max_price.min_price}</td>
                    <td className="w-32 p-2">
                      <div className="flex justify-between items-center border border-green-500 rounded-md w-28">
                        <button
                          id={item.id}
                          className="cursor-pointer border-0 w-6 rounded-md border-gray-500 active:scale-75 duration-100 ease-in-out text-2xl font-semibold"
                          onClick={handleRemoveCartCount}
                        >
                          -
                        </button>
                        {item.count}
                        <button
                          id={item.id}
                          className="cursor-pointer border-0 w-6 rounded-md border-gray-500 active:scale-75 duration-100 ease-in-out text-2xl font-semibold"
                          onClick={handleAddCartCount}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="w-32 p-2">
                      {item.min_max_price.min_price * item.count}
                    </td>
                    <td className="p-3">
                      <div className="border border-gray-200 hover:border hover:border-red-500 rounded-md p-2">
                      <FaRegTrashAlt
                        onClick={handleRemoveCartItem}
                        id={item.id}
                        className="text-xl text-red-500 cursor-pointer active:scale-75 duration-100 ease-in-out"
                        title="Remove"
                      />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="border-2 rounded-md w-96 p-2 my-5 lg:my-12">
            <h3 className="text-xl font-semibold">Bill Amount:-</h3>
            <hr />
            <div className="flex justify-between p-3 text-xl">
              <div>
                <p>Grand Total</p>
                <p>Tax(5%)</p>
              </div>
              <div>
                <p>{amount}</p>
                <p>{tax}</p>
                <hr />
              </div>
            </div>
                <button className="border w-full rounded bg-blue-500 p-1 text-white font-semibold text-xl active:scale-75 duration-150 ease-in-out">Pay&nbsp;{Math.floor(amount + tax)}&nbsp;/-</button>
          </div>
        </div>
      </div>
    </>
  );
}