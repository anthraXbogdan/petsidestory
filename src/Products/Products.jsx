import { useState, useEffect, useContext } from "react";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AdminContext } from "../AppContext";
import "./Products.css";

export default function Products() {
   const [categoryList, setCategoryList] = useState("");
   const { ptsCategories } = useContext(AdminContext);

   const getCategoryList = async () => {
      const querySnapshot = await getDocs(ptsCategories);
      const list = [];
      querySnapshot.forEach((doc) => {
         list.push(doc.data());
      });
      setCategoryList(list);
   };

   useEffect(() => {
      getCategoryList();
   }, []);

   return (
      <div className="products-layout">
         <h1>Produsele noastre</h1>

         <div className="categories-wrapper">
            {categoryList &&
               categoryList.map((category) => {
                  return (
                     <div key={category.id} className="category-wrapper">
                        <h2>{category.name}</h2>
                        <div className="category-grid">
                           {category.products.map((product) => {
                              return (
                                 <div className="product" key={product.id}>
                                    <h3>
                                       <span className="plus-highlight">.</span>
                                       {product.name}
                                    </h3>
                                    <Link to={`${category.id}/${product.id}`}>
                                       <img
                                          className="product-image"
                                          src={product.image}
                                          alt={product.name}
                                          width="100%"
                                          height="200"
                                       />
                                    </Link>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
}
