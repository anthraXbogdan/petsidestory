import "./Footer.css";

export default function Footer() {
   return (
      <footer>
         <div className="footer-container">
            <ul>
               <li>
                  <a href="#">Politica cookies</a>
               </li>
               <li>
                  <a href="#">Politică de confidențialitate</a>
               </li>
               <li>
                  <a href="#">Politica de retur</a>
               </li>
               <li>
                  <a href="#">Livrarea produselor</a>
               </li>
               <li>
                  <a href="#">Termeni și condiții</a>
               </li>
            </ul>

            <p className="footer-copyright">&#169; petsidestory 2023</p>
         </div>
      </footer>
   );
}
