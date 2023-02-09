import { useState, useEffect, useContext } from "react";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import video from "../assets/video/luna-1-1080p.mp4";
import "./Home.css";
import { AdminContext } from "../AppContext";

export default function Home() {
   const [productListExpanded, setProductListExpanded] = useState(false);
   const [targetName, setTargetName] = useState("");
   const [categoryList, setCategoryList] = useState([]);
   const { ptsCategories } = useContext(AdminContext);

   const handleCategoryClick = (e) => {
      setTargetName(e.target.textContent);
      setProductListExpanded(!productListExpanded);
   };

   useEffect(() => {
      setProductListExpanded(true);
   }, [targetName]);

   const getCategoryList = async () => {
      const querySnapshot = await getDocs(ptsCategories);
      const list = [];
      querySnapshot.forEach((doc) => {
         list.push(doc.data());
      });
      setCategoryList(list);
   };

   useEffect(() => {
      getCategoryList();
   }, []);

   return (
      <>
         <div className="home-layout">
            <video id="background-video" autoPlay muted loop>
               <source src={video} type="video/mp4" />
            </video>

            <section className="hero-wrapper">
               <p>
                  Creștem Agame, Tarantule și Pradă vie pentru animalul tău de
                  companie.
               </p>
               <p>
                  Îți dorești să ai grijă de un animal de companie spectaculos,
                  ce necesită îngrijire minimă? Ia-ți o agamă cu barbă. Vrei ca
                  terariul să ocupe mai puțin spațiu, dar în interior să
                  locuiască ceva la fel de spectaculos? Ia-ți o tarantulă.
               </p>
            </section>

            <ul className="categories-menu">
               {categoryList &&
                  categoryList.map((category) => {
                     return (
                        <div key={category.id} className="category-wrapper">
                           <li
                              className={
                                 targetName === category.name &&
                                 productListExpanded
                                    ? "category-active"
                                    : ""
                              }
                              onClick={handleCategoryClick}
                           >
                              {category.name}
                           </li>
                           <ul
                              className={`category-list ${
                                 targetName === category.name &&
                                 productListExpanded
                                    ? "category-list-expand"
                                    : ""
                              }`}
                           >
                              {category.products.map((item) => {
                                 return (
                                    <Link
                                       to={`/products/${category.id}/${item.id}`}
                                       key={item.id}
                                    >
                                       <li>{item.name}</li>
                                    </Link>
                                 );
                              })}
                           </ul>
                        </div>
                     );
                  })}
            </ul>
         </div>
      </>
   );
}
