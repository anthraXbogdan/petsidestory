import { useContext, useEffect } from "react";
import { AdminContext } from "../AppContext";

export default function NewCategory() {
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
   } = useContext(AdminContext);

   useEffect(() => {
      onGetCategoryList();
   }, []);

   return (
      <div className="newCategory-layout">
         <h1>New Category</h1>

         <h2 className="section-title">Add New Category of Products</h2>
         <div className="admin-section newCategory-wrapper">
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

         <h2 className="section-title">Remove a category</h2>
         <div className="admin-section">
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
      </div>
   );
}
