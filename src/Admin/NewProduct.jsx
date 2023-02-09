import { useContext, useEffect } from "react";
import { AdminContext } from "../AppContext";

export default function NewProduct() {
   const {
      selectedCategory,
      onCategorySelect,
      categories,
      onGetCategoryList,
      productId,
      onProductIdChange,
      productName,
      onProductNameChange,
      productInfo,
      onProductInfoChange,
      productImageUrl,
      onProductImageUrlChange,
      onAddNewProductClick,
   } = useContext(AdminContext);

   useEffect(() => {
      onGetCategoryList();
   }, []);

   return (
      <div className="newProduct-layout">
         <h1>New Product</h1>

         <h2 className="section-title">Add New Product</h2>
         <div className="admin-section newProduct-wrapper">
            <div>
               <label htmlFor="product-category">Select a category</label>
               <select
                  id="product-category"
                  value={selectedCategory}
                  onChange={onCategorySelect}
               >
                  <option value="">--select an option--</option>
                  {categories &&
                     categories.map((category) => {
                        return (
                           <option key={category.id} value={category.name}>
                              {category.name}
                           </option>
                        );
                     })}
               </select>
            </div>
            <div>
               <label htmlFor="product-id">ID</label>
               <input
                  type="text"
                  id="product-id"
                  value={productId}
                  onChange={onProductIdChange}
               />
            </div>
            <div>
               <label htmlFor="product-name">Name</label>
               <input
                  type="text"
                  id="product-name"
                  value={productName}
                  onChange={onProductNameChange}
               />
            </div>
            <div>
               <label htmlFor="product-info">Info</label>
               <textarea
                  id="product-info"
                  cols="30"
                  rows="10"
                  spellCheck="false"
                  value={productInfo}
                  onChange={onProductInfoChange}
               ></textarea>
            </div>
            <div>
               <label htmlFor="product-image">Image URL</label>
               <input
                  type="text"
                  id="product-image"
                  value={productImageUrl}
                  onChange={onProductImageUrlChange}
               />
            </div>
            <button onClick={onAddNewProductClick}>Add a new product</button>
         </div>
      </div>
   );
}
