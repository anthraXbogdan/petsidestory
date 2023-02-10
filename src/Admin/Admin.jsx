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
               <NavLink to="categories">
                  <li>Categories</li>
               </NavLink>
               <NavLink to="productsForExistingCateg">
                  <li>Products for existing category</li>
               </NavLink>
               <NavLink to="products">
                  <li>Products</li>
               </NavLink>
               <NavLink to="items">
                  <li>Items</li>
               </NavLink>
            </ul>
            <Outlet></Outlet>
         </div>
      </div>
   );
}
