import { useContext } from "react";
import { AdminContext } from "../AppContext";

export default function NewCategory() {
   const {
      categoryId,
      onCategoryIdChange,
      categoryName,
      onCategoryNameChange,
      onAddNewCategoryClick,
   } = useContext(AdminContext);

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
      </div>
   );
}
