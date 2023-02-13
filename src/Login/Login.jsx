import { useContext } from "react";
import { AdminContext } from "../AppContext";
import "./Login.css";

export default function Login() {
   const { onEmailChange, onPasswordChange, onLoginClick } =
      useContext(AdminContext);

   return (
      <>
         <main id="login-main">
            <section>
               <div className="login-logo-wrapper">
                  <div className="navbar-logo">
                     <h1 className="nav-brand">
                        petsidestory<span className="nav-brand-dot">.</span>
                     </h1>
                  </div>
                  <div className="navbar-logo">
                     <h2>Admin Login</h2>
                  </div>
               </div>

               <div>
                  <form id="login-form">
                     <div className="login-input-wrapper">
                        <label htmlFor="email-address">Email address</label>
                        <input
                           id="email-address"
                           name="email"
                           type="email"
                           required
                           placeholder="example@example.com"
                           onChange={onEmailChange}
                        />
                     </div>

                     <div className="login-input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           required
                           placeholder="password"
                           onChange={onPasswordChange}
                        />
                     </div>

                     <div className="login-btn-wrapper">
                        <button className="login-btn" onClick={onLoginClick}>
                           Login
                        </button>
                     </div>
                  </form>
               </div>
            </section>
         </main>
      </>
   );
}
