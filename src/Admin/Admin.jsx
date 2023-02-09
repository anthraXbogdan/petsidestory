import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
   return (
      <div className="context">
         <h1>Admin Panel</h1>

         <div className="adminSections-wrapper">
            <ul>
               <NavLink to="" end>
                  <li>Product Image</li>
               </NavLink>
               <NavLink to="newCategory">
                  <li>New Category</li>
               </NavLink>
               <NavLink to="newProductForExistingCateg">
                  <li>New Product for existing category</li>
               </NavLink>
               <NavLink to="newProduct">
                  <li>New Product</li>
               </NavLink>
               <NavLink to="newItem">
                  <li>New Item</li>
               </NavLink>
            </ul>
            <Outlet></Outlet>
         </div>
      </div>
   );
}
