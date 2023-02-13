import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
   getFirestore,
   setDoc,
   doc,
   updateDoc,
   arrayUnion,
   getDocs,
   getDoc,
   deleteDoc,
   collection,
   query,
   where,
   arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyA9nnfW1NYfeSnGWBEwZTTqTTu_hZsjNtg",
   authDomain: "petsidestory.firebaseapp.com",
   projectId: "petsidestory",
   storageBucket: "petsidestory.appspot.com",
   messagingSenderId: "321758811947",
   appId: "1:321758811947:web:ca81b88a4d047e0816176e",
   measurementId: "G-DLWX4BL6EY",
};

// Initialize Firebase
const petsidestory = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(petsidestory);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

const AdminContext = createContext();

function AdminProvider(props) {
   const navigate = useNavigate();
   // State for Admin authentication
   const [username, setUsername] = useState(null);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [file, setFile] = useState(null);
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState("");
   const [productImageUrl, setProductImageUrl] = useState("");
   // State for Categories
   const [categoryId, setCategoryId] = useState("");
   const [categoryName, setCategoryName] = useState("");
   const [categoryProducts, setCategoryProducts] = useState([]);
   // State for Products in Existing Category
   const [productCategId, setProductCategId] = useState("");
   const [productCategName, setProductCategName] = useState("");
   // State for Products
   const [productId, setProductId] = useState("");
   const [productName, setProductName] = useState("");
   const [productInfo, setProductInfo] = useState("");
   const [productItems, setProductItems] = useState([]);
   // State for Items
   const [itemId, setItemId] = useState(0);
   const [itemDescription, setItemDescription] = useState("");
   const [itemPrice, setItemPrice] = useState("");
   const [items, setItems] = useState([]);

   const ptsCategories = collection(db, "categories");
   const ptsProducts = collection(db, "products");

   // Admin authentication
   const handleLoginClick = (e) => {
      e.preventDefault();

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUsername(user.email);
            navigate("/admin");
            console.log(`User email: ${user.email}`);
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Please try again");
            console.log(errorCode, errorMessage);
         });
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   };

   // Upload product image file to Firebase Storage
   const handleFileChange = (e) => {
      if (e.target.files) {
         setFile(e.target.files[0]);
      }
   };

   const uploadToStorage = async () => {
      const imageRef = ref(storage, file.name);

      try {
         await uploadBytes(imageRef, file);
      } catch (error) {
         console.error("Error uploading file to Firebase Storage: ", error);
      } finally {
         console.log("File uploaded successfully!");
      }
   };

   useEffect(() => {
      if (file) {
         console.log(file.name);
         uploadToStorage();
      }
   }, [file]);

   // Get the initial list of product categories
   const getCategoryList = async () => {
      const querySnapshot = await getDocs(ptsCategories);
      const categoriesList = [];
      querySnapshot.forEach((doc) => {
         categoriesList.push({ id: doc.data().id, name: doc.data().name });
      });
      setCategories(categoriesList);
   };

   // Get the initial list of products
   const getProductList = async () => {
      const querySnapshot = await getDocs(ptsProducts);
      const productList = [];
      querySnapshot.forEach((doc) => {
         productList.push({ id: doc.data().id, name: doc.data().name });
      });
      setProducts(productList);
   };

   // Categories Actions
   // Add Category
   const handleCategoryIdChange = (e) => {
      setCategoryId(e.target.value);
   };

   const handleCategoryNameChange = (e) => {
      setCategoryName(e.target.value);
   };

   const handleAddNewCategoryClick = async () => {
      const newCategory = {
         id: categoryId,
         name: categoryName,
         products: categoryProducts,
      };

      try {
         await setDoc(doc(db, "categories", categoryId), newCategory);
      } catch (error) {
         console.error("Error adding a new category: ", error);
      } finally {
         console.log(
            `Category "${categoryName}" successfully added to database.`
         );
         getCategoryList(); // Keep the list of product categories updated
         setCategoryId("");
         setCategoryName("");
      }
   };

   const deleteTargetProduct = async (productId) => {
      await deleteDoc(doc(ptsProducts, productId));
   };

   // Delete Category
   const handleDeleteCategoryClick = async () => {
      try {
         const categoryRef = doc(ptsCategories, selectedCategory);
         const categorySnap = await getDoc(categoryRef);
         let targetCategName = "";

         if (categorySnap.exists()) {
            targetCategName = categorySnap.data().name;
         }

         const productsQuery = query(
            ptsProducts,
            where("category", "==", targetCategName)
         );
         const querySnapshot = await getDocs(productsQuery);

         querySnapshot.forEach((doc) => {
            deleteTargetProduct(doc.id);
         });

         await deleteDoc(doc(ptsCategories, selectedCategory));
      } catch (error) {
         console.error("Error deleting selected category: ", error);
      } finally {
         console.log(
            `Category "${selectedCategory}" along with it's corresponding products was successfully removed from the database.`
         );
         setSelectedCategory("--select an option--");
         getCategoryList(); // keep the list of categories updated
      }
   };

   // Add New Product to Existing Category
   const handleCategorySelect = (e) => {
      setSelectedCategory(e.target.value);
   };

   const handleProductCategIdChange = (e) => {
      setProductCategId(e.target.value);
   };

   const handleProductCategNameChange = (e) => {
      setProductCategName(e.target.value);
   };

   const handleProductImageUrlChange = (e) => {
      setProductImageUrl(e.target.value);
   };

   const handleAddNewProductToExistingCategClick = async () => {
      const categoryRef = doc(db, "categories", selectedCategory);
      const categoryNewProduct = {
         id: productCategId,
         name: productCategName,
         image: productImageUrl,
      };

      try {
         await updateDoc(categoryRef, {
            products: arrayUnion(categoryNewProduct),
         });
      } catch (error) {
         console.error(
            "Error adding a New Product to selected category: ",
            error
         );
      } finally {
         console.log(
            `Product "${productCategName}" successfully added to "${selectedCategory}" category.`
         );
         setSelectedCategory("--select an option--");
         setProductCategId("");
         setProductCategName("");
         setProductImageUrl("");
      }
   };

   // Products Actions
   // Add Product
   const handleProductIdChange = (e) => {
      setProductId(e.target.value);
   };

   const handleProductNameChange = (e) => {
      setProductName(e.target.value);
   };

   const handleProductInfoChange = (e) => {
      setProductInfo(`${e.target.value}`);
   };

   const handleAddNewProductClick = async () => {
      const newProduct = {
         id: productId,
         name: productName,
         category: selectedCategory,
         info: productInfo,
         image: productImageUrl,
         items: productItems,
      };

      try {
         await setDoc(doc(db, "products", productId), newProduct);
      } catch (error) {
         console.error("Error adding new product: ", error);
      } finally {
         console.log(
            `The product "${productName}" was successfully added to database.`
         );
         getProductList(); // Keep the list of products updated
         setSelectedCategory("--select an option--");
         setProductId("");
         setProductName("");
         setProductInfo("");
         setProductImageUrl("");
      }
   };

   // Delete Product
   const handleRemoveProductClick = async () => {
      let targetCategory = "";

      try {
         // extract target category from selected product
         if (selectedProduct) {
            const productRef = doc(ptsProducts, selectedProduct);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
               targetCategory = productSnap.data().category;
            }
         }

         // use target category to remove selected product(targetObj) from the array of products of that category
         let targetObj = {};
         let categId = "";

         const categQuery = query(
            ptsCategories,
            where("name", "==", targetCategory)
         );
         const querySnapshot = await getDocs(categQuery);

         querySnapshot.forEach((doc) => {
            categId = doc.data().id;
            targetObj = doc.data().products.filter((product) => {
               return product.id === selectedProduct;
            })[0];
         });

         if (categId) {
            const categRef = doc(ptsCategories, categId);
            await updateDoc(categRef, {
               products: arrayRemove(targetObj),
            });
         }

         // delete selected product
         await deleteDoc(doc(ptsProducts, selectedProduct));
      } catch (error) {
         console.error("Error removing the product: ", error);
      } finally {
         console.log(
            `The product "${selectedProduct}"  was successfully removed from the database.`
         );
         getProductList(); // Keep the list of products updated
         setSelectedProduct("--select an option--");
      }
   };

   // Items Actions
   // Add Item
   const handleProductSelect = (e) => {
      setSelectedProduct(e.target.value);
   };

   const handleItemDescriptionChange = (e) => {
      setItemDescription(`${e.target.value}`);
   };

   const handleItemPriceChange = (e) => {
      setItemPrice(Number.parseInt(e.target.value));
   };

   const setNewItemId = async () => {
      const productRef = doc(ptsProducts, selectedProduct);
      const docSnap = await getDoc(productRef);

      if (docSnap.exists()) {
         setItemId(docSnap.data().items.length + 1);
      }
   };

   useEffect(() => {
      if (selectedProduct) {
         setNewItemId();
      }
   }, [selectedProduct]);

   const handleAddNewItemClick = async () => {
      const productRef = doc(db, "products", selectedProduct);
      const newItem = {
         id: itemId,
         description: itemDescription,
         price: itemPrice,
      };

      try {
         await updateDoc(productRef, {
            items: arrayUnion(newItem),
         });
      } catch (error) {
         console.error("Error adding new item to document: ", error);
      } finally {
         console.log("New item added successfully!");
         setSelectedProduct("--select an option--");
         setItemDescription("");
         setItemPrice(0);
      }
   };

   // Delete Item
   const showItems = async () => {
      if (selectedProduct) {
         const productRef = doc(ptsProducts, selectedProduct);
         const docSnap = await getDoc(productRef);

         if (docSnap.exists()) {
            setItems(docSnap.data().items);
            console.log(docSnap.data().items);
         }
      }
   };

   const handleRemoveItemClick = async () => {
      console.log("Item removed");
   };

   const value = {
      // Admin authentication
      onEmailChange: handleEmailChange,
      onPasswordChange: handlePasswordChange,
      onLoginClick: handleLoginClick,
      username: username,

      ptsCategories: ptsCategories,
      ptsProducts: ptsProducts,
      onFileChange: handleFileChange,
      categoryId: categoryId,
      onCategoryIdChange: handleCategoryIdChange,
      categoryName: categoryName,
      onCategoryNameChange: handleCategoryNameChange,
      onAddNewCategoryClick: handleAddNewCategoryClick,
      onDeleteCategoryClick: handleDeleteCategoryClick,
      onGetCategoryList: getCategoryList,
      onGetProductList: getProductList,
      categories: categories,
      products: products,
      selectedCategory: selectedCategory,
      onCategorySelect: handleCategorySelect,
      productCategId: productCategId,
      onProductCategIdChange: handleProductCategIdChange,
      productCategName: productCategName,
      onProductCategNameChange: handleProductCategNameChange,
      productImageUrl: productImageUrl,
      onProductImageUrlChange: handleProductImageUrlChange,
      onAddNewProductToExistingCategClick:
         handleAddNewProductToExistingCategClick,
      productId: productId,
      onProductIdChange: handleProductIdChange,
      productName: productName,
      onProductNameChange: handleProductNameChange,
      productInfo: productInfo,
      onProductInfoChange: handleProductInfoChange,
      onAddNewProductClick: handleAddNewProductClick,
      onRemoveProductClick: handleRemoveProductClick,
      selectedProduct: selectedProduct,
      onProductSelect: handleProductSelect,
      itemDescription: itemDescription,
      onItemDescriptionChange: handleItemDescriptionChange,
      itemPrice: itemPrice,
      onItemPriceChange: handleItemPriceChange,
      onAddNewItemClick: handleAddNewItemClick,
      onShowItems: showItems,
      onRemoveItemClick: handleRemoveItemClick,
      items: items,
   };

   return (
      <AdminContext.Provider value={value}>
         {props.children}
      </AdminContext.Provider>
   );
}

export { AdminContext, AdminProvider };
