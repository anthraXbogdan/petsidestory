import { useContext, useEffect } from "react";
import { AdminContext } from "../AppContext";

export default function Categories() {
   const {
      categoryId,
      onCategoryIdChange,
      categoryName,
      onCategoryNameChange,
      onAddNewCategoryClick,
      selectedCategory,
      onCategorySelect,
      categories,
      onGetCategoryList,
      onDeleteCategoryClick,
   } = useContext(AdminContext);

   useEffect(() => {
      onGetCategoryList();
   }, []);

   return (
      <div className="categories-layout">
         <h1>Categories</h1>

         <div className="admin-section newCategory-wrapper">
            <h2 className="section-title">Add Category</h2>
            <div>
               <label htmlFor="category-id">ID</label>
               <input
                  type="text"
                  id="category-id"
                  value={categoryId}
                  onChange={onCategoryIdChange}
               />
            </div>
            <div>
               <label htmlFor="category-name">Name</label>
               <input
                  type="text"
                  id="category-name"
                  value={categoryName}
                  onChange={onCategoryNameChange}
               />
            </div>
            <button onClick={onAddNewCategoryClick}>Add a new category</button>
         </div>

         <div className="admin-section">
            <h2 className="section-title">Delete Category</h2>
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
                           <option key={category.id} value={category.id}>
                              {category.name}
                           </option>
                        );
                     })}
               </select>
            </div>
            <button onClick={onDeleteCategoryClick}>
               Delete selected category
            </button>
         </div>
      </div>
   );
}
