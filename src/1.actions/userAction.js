import axios from 'axios'
import Cookies from 'universal-cookie';

const objCookie = new Cookies()
export const onLogin = (paramsusername,paramspassword) => {
    //ini untuk membuat login menjadi true
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'

        })
        //get dari data fake API json server
    axios.get('http://localhost:2003/user',{params:{username : paramsusername, password :paramspassword}})
    
    //kalo berhasil nge get dia masuk then
        .then ((res) => {
            console.log(res)
    //if user dan password sesuai masuk res.data ada isinya
            if (res.data.length > 0){
                dispatch(
                    {
                    type : 'LOGIN_SUCCESS',
                    payload : 
                    {
                        username: res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                    }
                ) 
            }else {
                dispatch ({
                    type : 'USER_NOT_FOUND',

                })
            }
            
        })
        .catch ((err) => {
            console.log(err)
            dispatch ({
                type : 'JARINGAN_ERROR'
            })
        })
    }

}
export const keepLogin  = (username) => {
    return (dispatch)=>{
        axios.get('http://localhost:2003/user',{ params : {username : username }})
        .then((res) => {
            if (res.data.length > 0 ) {
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload :   
                    {
                        username: res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                })
            }
        })
        .catch((err) => console.log(err))
    }
    
}
export const resetUser = () => {
    return{
        type : 'RESET_USER'
    }
}

export const userRegister = (a,b,c,d) => {
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : a, password : b, email : c, phone : d}
        //mengecek username availablity
        axios.get('http://localhost:2003/user?username=' + newData.username)
        .then((res) => {
            if (res.data.length > 0){
                dispatch({
                    type : 'USERNAME_NOT_AVAILLABLE'
                })
            }else{
                axios.post('http://localhost:2003/user', newData)
                .then((res) =>  {
                    dispatch ({
                        type : 'LOGIN_SUCCESS',
                        payload : a
                    },
                    objCookie.set('userData',a,{path : '/'})
                    )
                    
                    
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type: 'JARINGAN_ERROR'
            })
        })
    }
}

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get('http://localhost:2003/user?username=' + email)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]

                },
                objCookie.set('userData',email,{path : '/'})
                )
            }else{
                axios.post('http://localhost:2003/user', {username : email, role : 'user'})
                .then((res) => {
                    dispatch ({
                        type :  'LOGIN_SUCCESS',
                        payload : res.data
                    },
                    objCookie.set('userData',email,{path : '/'})
                    
                    )
                })
                .catch((err)=> console.log(err))
            }
        })
        .catch((err) => console.log(err))
    }
}