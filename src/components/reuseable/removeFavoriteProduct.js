import store from "../../redux/store";
import axios from 'axios'

function removeFavoriteProduct(productID){
  const dataContainer = [productID]
  //  console.log("making delete request")
    axios.post('/auth/deleteFavoriteProduct', dataContainer)
    .then(res =>{
  //    console.log("updating redux state")
      const FavoriteProductList = res.data;
  //    console.log("FavoriteProductList", FavoriteProductList)
     store.dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: FavoriteProductList })
   })
   .catch(err => {
     console.log(err)
   })
  }
  
  export default removeFavoriteProduct;