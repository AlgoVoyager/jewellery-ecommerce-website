import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [WishlistItems, setWishlistItems] = useState([]);
  const [user, setuser] = useState( localStorage.getItem("token")?JSON.parse(atob(localStorage.getItem("token").split(".")[1])).email:null)

  // Load Wishlist items from local storage on component mount
  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('WishlistItems'));
    if (storedWishlistItems) {
      setWishlistItems(storedWishlistItems);
    }
    localStorage.getItem("token")&&setuser(JSON.parse(atob(localStorage.getItem("token").split(".")[1])).email)
    // console.log("length of local wishlist ",WishlistItems)
    axios.post("http://localhost:3000/api/wishlist/get",{
      user:user
    }).then(res=>{setWishlistItems(res.data.info[0]?res.data.info[0].products:[]);}).catch(err=>console.log(err))//setWishlistItems(res.data.info)
  }, []);

  // Save Wishlist items to local storage whenever WishlistItems state changes
  useEffect(() => {
   WishlistItems.length!==0&&localStorage.setItem('WishlistItems', JSON.stringify(WishlistItems));
  //  axios.post("http://localhost:3000/api/wishlist/set",{
  //     user:user,
  //     products:WishlistItems==================
  //   }).then(res=>console.log("wishlist changes ",res)).catch(err=>console.log(err))
  }, [WishlistItems]);

  const addToWishlist = async (item) => {
    setWishlistItems([...WishlistItems, item]);
    axios.post("http://localhost:3000/api/wishlist/add",{
      user:user,
      product:item
    }).then(res=>console.log(res.data.infoMsg)).catch(err=>console.log(err))
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(WishlistItems.filter(item => item.id !== id));
    axios.post("http://localhost:3000/api/wishlist/delete",{
      data:{
        user:user,
        productId:id
      }
    }).then(res=>console.log(res.data.infoMsg)).catch(err=>console.log(err))
  };
  const clearWishlist = () => {
    setWishlistItems([]);
  }
  
  return (
    <WishlistContext.Provider value={{ WishlistItems, addToWishlist, removeFromWishlist,clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
