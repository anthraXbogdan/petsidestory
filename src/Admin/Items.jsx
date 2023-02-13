import { isEmpty } from "@firebase/util";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AppContext";

export default function Items() {
   const {
      selectedProduct,
      onProductSelect,
      products,
      onGetProductList,
      itemDescription,
      onItemDescriptionChange,
      itemPrice,
      onItemPriceChange,
      onAddNewItemClick,
      onShowItems,
      onRemoveItemClick,
      items,
   } = useContext(AdminContext);

   useEffect(() => {
      onGetProductList();
   }, []);

   useEffect(() => {
      console.log(selectedProduct);
      onShowItems();
   }, [selectedProduct]);

   return (
      <div className="newItem-layout">
         <h1>Items</h1>

         <div className="admin-section">
            <h2 className="section-title">Add Item to product</h2>
            <div>
               <label htmlFor="category-for-add">Select a product</label>
               <select
                  id="category-for-add"
                  value={selectedProduct}
                  onChange={onProductSelect}
               >
                  <option value="">--select an option--</option>
                  {products &&
                     products.map((product) => {
                        return (
                           <option key={product.id} value={product.id}>
                              {product.name}
                           </option>
                        );
                     })}
               </select>
            </div>
            {/* New item ID will be generated automatically (ex: 0, 1, 2 etc) based on the ID of the previous item (previous id + 1) */}
            <div>
               <label htmlFor="item-description">Item description</label>
               <textarea
                  id="item-description"
                  cols="30"
                  rows="10"
                  spellCheck="false"
                  value={itemDescription}
                  onChange={onItemDescriptionChange}
               ></textarea>
            </div>
            <div>
               <label htmlFor="item-price">Item price</label>
               <input
                  type="number"
                  value={itemPrice}
                  onChange={onItemPriceChange}
               />
            </div>
            <button onClick={onAddNewItemClick}>Add a new Item</button>
         </div>
         <div className="admin-section remove-item-section">
            <h2 className="section-title">Remove Item from product</h2>
            <div>
               <label htmlFor="category-for-remove">Select a product</label>
               <select
                  id="category-for-remove"
                  value={selectedProduct}
                  onChange={onProductSelect}
               >
                  <option value="">--select an option--</option>
                  {products &&
                     products.map((product) => {
                        return (
                           <option key={product.id} value={product.id}>
                              {product.name}
                           </option>
                        );
                     })}
               </select>
            </div>

            <ul>
               {items &&
                  selectedProduct !== "" &&
                  items.map((item) => {
                     return (
                        <li key={item.id}>
                           <p>{item.description}</p>
                           <p>{item.price} lei</p>
                           <button onClick={onRemoveItemClick}>
                              Remove item
                           </button>
                        </li>
                     );
                  })}
            </ul>
         </div>
      </div>
   );
}
