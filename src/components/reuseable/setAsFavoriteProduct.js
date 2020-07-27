import store from "../../redux/store";
import axios from 'axios'


function setAsFavoriteProduct(productID) {
    const dataContainer = [productID];
    axios.post('/auth/addFavoriteProduct', dataContainer)
    .then(res =>{
      const FavoriteProductList = res.data;
     store.dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: FavoriteProductList })
   })
   .catch(err => {
     console.log(err)
   })
  }

  export default setAsFavoriteProduct;