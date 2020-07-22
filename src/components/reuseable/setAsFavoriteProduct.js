import store from "../../redux/store";
import axios from 'axios'


function setAsFavoriteProduct(productId) {
    const dataContainer = [productId]
    console.log("making post request")
    axios.post('/auth/addFavoriteProduct', dataContainer)
    .then(res =>{
      console.log("updating redux state")
      const FavoriteProductList = res.data;
      console.log("FavoriteProductList", FavoriteProductList)
     store.dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: FavoriteProductList })
   })
   .catch(err => {
     console.log(err)
   })
  }
  export default setAsFavoriteProduct;