import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Products from "./Products/Products";
import Home from "./Home/Home";
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import MyAccount from "./MyAccount/MyAccount";
import ProductItems from "./Product/ProductItems/ProductItems";
import ProductInfo from "./Product/ProductInfo/ProductInfo";
import Admin from "./Admin/Admin";
import { AdminProvider } from "./AppContext";
import ProductImage from "./Admin/ProductImage";
import NewCategory from "./Admin/NewCategory";
import NewProductForExistingCateg from "./Admin/NewProductForExistingCateg";
import NewProduct from "./Admin/NewProduct";
import NewItem from "./Admin/NewItem";

function App() {
   return (
      <BrowserRouter>
         <AdminProvider>
            <Navbar />
            <div className="container">
               <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/products" element={<Products />}></Route>
                  <Route
                     path="/products/:category/:product"
                     element={<Product />}
                  >
                     <Route path="" element={<ProductItems />}></Route>
                     <Route path="info" element={<ProductInfo />}></Route>
                  </Route>
                  <Route path="/account" element={<MyAccount />}></Route>
                  <Route path="/cart" element={<Cart />}></Route>
                  <Route path="/admin" element={<Admin />}>
                     <Route path="" element={<ProductImage />}></Route>
                     <Route
                        path="newCategory"
                        element={<NewCategory />}
                     ></Route>
                     <Route
                        path="newProductForExistingCateg"
                        element={<NewProductForExistingCateg />}
                     ></Route>
                     <Route path="newProduct" element={<NewProduct />}></Route>
                     <Route path="newItem" element={<NewItem />}></Route>
                  </Route>
               </Routes>
            </div>
            <Footer />
         </AdminProvider>
      </BrowserRouter>
   );
}

export default App;
