import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
   return (
      <nav className="navbar">
         <Link to="" className="nav-brand">
            petsidestory<span className="nav-brand-dot">.</span>
         </Link>
         <ul>
            <li className="nav-item">
               <NavLink to="/">
                  <span className="material-symbols-outlined">
                     home_app_logo
                  </span>
                  <span className="link">Acasă</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink to="/products">
                  <span className="material-symbols-outlined">storefront</span>
                  <span className="link">Produse</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="" to="/account">
                  <span className="material-symbols-outlined">
                     account_circle
                  </span>
                  <span className="link">Intră in cont</span>
               </NavLink>
            </li>

            <li className="nav-item">
               <NavLink className="" to="/cart">
                  <span className="material-symbols-outlined">
                     shopping_cart
                  </span>
                  <span className="link">Coșul meu</span>
                  <span className="cart-count">0</span>
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
