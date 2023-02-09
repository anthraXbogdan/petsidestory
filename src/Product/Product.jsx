import { useParams, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { AdminContext } from "../AppContext";
import "./Product.css";

export default function Product() {
   const params = useParams();
   const { ptsProducts } = useContext(AdminContext);
   const [product, setProduct] = useState({});

   const getProduct = async () => {
      const productRef = doc(ptsProducts, params.product);
      const docSnap = await getDoc(productRef);
      setProduct(docSnap.data());
   };

   useEffect(() => {
      getProduct();
   }, []);

   return (
      <div className="product-layout">
         <div className="product-details-wrapper">
            <h2>{product.category}</h2>
            <div className="productName-wrapper">
               <h1>{product.name}</h1>
            </div>

            <div className="product-image-wrapper">
               <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  height="200"
               />
            </div>

            <div className="tabs">
               <ul>
                  <NavLink to="" end>
                     <li>Cumpără</li>
                  </NavLink>
                  <NavLink to="info">
                     <li>Informații</li>
                  </NavLink>
               </ul>
            </div>
            <Outlet context={product}></Outlet>
         </div>
      </div>
   );
}
