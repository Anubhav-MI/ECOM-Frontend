import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ProductPage = () => {
  const [products, setproducts] = useState("");
  const [avcategory, setavcategory] = useState([]);
  const [cart, setCart] = useCart();

  const getcategory = async () => {
    try {
      const data = await axios.get("http://localhost:3001/getcategory");
      setavcategory(data.data);
      console.log(avcategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("http://localhost:3001/products/get");
      setproducts(data);
      // console.log(products);
      // console.log(products.data[0].title);
      getcategory();
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div class="page-heading" id="top">
        <div class="container mb-24">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-content">
                <h2>Check Our Products</h2>
                <span>
                  Browse through our products and find the best one for you.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-16">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Our Latest Products</h2>
              <span>Check out all of our products.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-100 md:py-12 md:px-32 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
          {products &&
            products?.data.map((product) => (
              <div className="p-4 hover:border shadow flex-col content-between ">
                <div>
                  <img className="" src={product.imgURL} alt="..." />
                </div>

                <div className="mt-4 py-3">
                  <h5 class=" text-xl pb-2">{product.title}</h5>
                  <div className="flex justify-between pb-2">
                    <p class=" text-xl font-semibold">₨.{product.price}</p>
                    <p class="text-xl rounded bg-green-600 text-white py-1 px-2">
                      {product.rating}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      <button class="btn btn-primary text-xl">
                        Add to cart
                      </button>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};
export default ProductPage;
