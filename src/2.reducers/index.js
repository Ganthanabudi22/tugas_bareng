import {combineReducers} from 'redux'
import User from './userGlobal'
import Cart from './cart'

export default combineReducers({
    user : User,
    cart :Cart
})