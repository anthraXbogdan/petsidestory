import { useContext, useEffect } from "react";
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
   } = useContext(AdminContext);

   useEffect(() => {
      onGetProductList();
   }, []);

   return (
      <div className="newItem-layout">
         <h1>Items</h1>

         <div className="admin-section newItem-wrapper">
            <h2 className="section-title">Add Item to existing product</h2>
            <div>
               <label htmlFor="item-category">Select a product</label>
               <select
                  id="item-category"
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
      </div>
   );
}
