import { useOutletContext } from "react-router-dom";
import "./ProductInfo.css";

export default function ProductInfo() {
   const product = useOutletContext();

   return (
      <div className="productInfo-layout">
         <textarea spellCheck="false">{product.info}</textarea>
      </div>
   );
}
