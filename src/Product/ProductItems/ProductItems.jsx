import { useOutletContext } from "react-router-dom";
import "./ProductItems.css";

export default function ProductItems() {
   const product = useOutletContext();

   return (
      <div className="productItems-layout">
         {product.items &&
            product.items.map((item) => {
               return (
                  <div className="saleItem-wrapper" key={item.id}>
                     <p className="saleItem-description">{item.description}</p>
                     <p className="saleItem-price">
                        Preț:{" "}
                        <span className="price-tag">{item.price} lei</span>
                     </p>
                     <div className="button-wrapper">
                        <button>Adaugă in coș</button>
                     </div>
                  </div>
               );
            })}
      </div>
   );
}
