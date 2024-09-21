import React from "react";

const Mali = () => {
  return (
    <div className="container mx-auto py-10">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6">Your cart</h2>

      {/* Cart Table */}
      <div className="border-t border-gray-300">
        <div className="grid grid-cols-5 py-4">
          <div className="col-span-3">
            <h3 className="font-medium text-gray-500">PRODUCT</h3>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-gray-500">QUANTITY</h3>
          </div>
          <div className="text-right">
            <h3 className="font-medium text-gray-500">TOTAL</h3>
          </div>
        </div>

        {/* Product Row */}
        <div className="grid grid-cols-5 py-4 items-center">
          {/* Image */}
          <div className="col-span-1">
            <img
              className="w-20 h-20 rounded object-cover"
              src="https://via.placeholder.com/100"
              alt="Product"
            />
          </div>

          {/* Product Details */}
          <div className="col-span-2 pl-4">
            <h4 className="font-semibold">Garden Maintenance Packages</h4>
            <p className="text-sm text-gray-500">Duration: 4 hours</p>
            <p className="text-sm text-gray-500">
              Frequency of visit: Once a Month
            </p>
            <p className="text-sm text-gray-500">
              Duration of Contract: 3 months (Silver)
            </p>
          </div>

          {/* Quantity */}
          <div className="col-span-1 flex justify-center items-center">
            <button className="text-gray-500 hover:text-gray-900">−</button>
            <span className="mx-3">1</span>
            <button className="text-gray-500 hover:text-gray-900">+</button>
            <button className="ml-4 text-gray-500 hover:text-gray-900">
              <i className="fas fa-trash"></i>
            </button>
          </div>

          {/* Total */}
          <div className="col-span-1 text-right">
            <p className="font-semibold">Rs. 3,510.00</p>
          </div>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center mt-8">
        <a href="/" className="text-sm text-gray-500 hover:underline">
          Continue shopping
        </a>
        <div className="text-right">
          <p className="text-sm text-gray-500">Subtotal</p>
          <p className="text-xl font-semibold">Rs. 3,510.00</p>
          <p className="text-sm text-gray-500">
            Taxes and shipping calculated at checkout
          </p>
          <button className="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mali;
