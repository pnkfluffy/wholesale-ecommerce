import store from "../../redux/store";
import axios from 'axios'

function removeFavoriteProduct(productID){
  const dataContainer = [productID]
    axios.post('/auth/deleteFavoriteProduct', dataContainer)
    .then(res =>{
      const FavoriteProductList = res.data;
     store.dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: FavoriteProductList })
   })
   .catch(err => {
     console.log(err)
   })
  }
  
  export default removeFavoriteProduct;