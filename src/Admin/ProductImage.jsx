import { useContext } from "react";
import { AdminContext } from "../AppContext";

export default function ProductImage() {
   const { onFileChange } = useContext(AdminContext);

   return (
      <div className="productImage-layout">
         <h1>Product Image</h1>

         <h2 className="section-title">Upload Product Image</h2>
         <div className=" admin-section uploadImage-wrapper">
            <input type="file" onChange={onFileChange} />
         </div>
      </div>
   );
}
