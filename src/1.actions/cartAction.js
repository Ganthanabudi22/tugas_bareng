import axios from 'axios'
import cookie from 'universal-cookie'


var objCookie =new cookie()
export const addToCart = (newProduct) => {
    return (dispatch) => {
        axios.get('http://localhost:2003/cart?id_user=' +newProduct.id_user + '&id_products=' +newProduct.id_products)
        .then((res)=>{
            console.log(res)
        if(res.data.length > 0){

            var quantity = res.data[0].qty + newProduct.qty
            axios.put('http://localhost:2003/cart/' + res.data[0].id, {...newProduct,qty:quantity})
            .then((res)=>{
                axios.get('http://localhost:2003/cart?id_user=' +newProduct.id_user )
                .then ((res) => {
                    if(res.data.length > 0) {
                        dispatch ({
                            type : 'CART_SAVE',
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>{
                    console.log (err)
                })
                objCookie.set('userDataCart', newProduct.id_user, {path:'/'} )

                
            
            
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            alert('masuk 2')
            axios.post('http://localhost:2003/cart', newProduct)
            .then((res)=>{
                axios.get('http://localhost:2003/cart?id_user=' +newProduct.id_user )
                .then ((res) => {
                    if(res.data.length > 0) {
                        dispatch ({
                            type : 'CART_SAVE',
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>{
                    console.log (err)
                })
                objCookie.set('userDataCart', newProduct.id_user, {path:'/'} )


                
            
            
            })
            .catch((err)=> console.log(err))
        }
        
        })
        

    }
}

export const keepCart  = (id_user) => {
    return (dispatch)=>{
        axios.get('http://localhost:2003/cart?id_user=' +id_user)
        .then((res) => {
            if (res.data.length > 0 ) {
                dispatch({
                    type : 'CART_SAVE',
                    payload : res.data
                })
            }
        })
        .catch((err) => console.log(err))
    }
    
}
