import { useContext, useEffect } from "react";
import { AdminContext } from "../AppContext";

export default function NewProductForExistingCateg() {
   const {
      categories,
      onGetCategoryList,
      selectedCategory,
      onCategorySelect,
      productCategId,
      onProductCategIdChange,
      productCategName,
      onProductCategNameChange,
      productImageUrl,
      onProductImageUrlChange,
      onAddNewProductToExistingCategClick,
   } = useContext(AdminContext);

   useEffect(() => {
      onGetCategoryList();
   }, []);

   return (
      <div className="newProductForExistingCateg-layout">
         <h1>New Product for Existing Category</h1>

         <h2 className="section-title">Add New Product to Existing Category</h2>
         <div className="admin-section newCategoryProduct-wrapper">
            <div>
               <label htmlFor="productCat-category">Select a category</label>
               <select
                  id="productCat-category"
                  value={selectedCategory}
                  onChange={onCategorySelect}
               >
                  <option value="">--select an option--</option>
                  {categories &&
                     categories.map((category) => {
                        return (
                           <option key={category.id} value={category.id}>
                              {category.name}
                           </option>
                        );
                     })}
               </select>
            </div>
            <div>
               <label htmlFor="productCateg-id">ID</label>
               <input
                  type="text"
                  id="productCateg-id"
                  value={productCategId}
                  onChange={onProductCategIdChange}
               />
            </div>
            <div>
               <label htmlFor="productCat-name">Name</label>
               <input
                  type="text"
                  id="productCat-name"
                  value={productCategName}
                  onChange={onProductCategNameChange}
               />
            </div>
            <div>
               <label htmlFor="productCat-imageUrl">Image URL</label>
               <input
                  type="text"
                  id="productCat-image"
                  value={productImageUrl}
                  onChange={onProductImageUrlChange}
               />
            </div>
            <button onClick={onAddNewProductToExistingCategClick}>
               Add a new category product
            </button>
         </div>
      </div>
   );
}
