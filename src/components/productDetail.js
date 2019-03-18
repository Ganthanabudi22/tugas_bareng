import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {addToCart} from './../1.actions'

class ProductDetail extends React.Component{
    state = {products : {},cart:[]}
    componentDidMount(){
        this.getDataApi()
    }

    componentWillReceiveProps(newProps){
        this.setState({cart:newProps.cart})
    }
    getDataApi = () => {
        var idUrl = this.props.match.params.id
        Axios.get('http://localhost:2003/products/'+ idUrl)
        .then((res)=>{
            this.setState({products : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    inpJlh = () => {
        if (this.refs.jumlah.value <= 0) {
            this.refs.jumlah.value = 1
        }
    }
    masukKeranjang = () => {
        var qty = parseInt(this.refs.jumlah.value)
        var catatan = this.refs.catatan.value
        var newObj = {...this.state.products,id_products:this.state.products.id,id_user:this.props.id,qty:qty,catatan:catatan}
        delete newObj.id
        this.props.addToCart(newObj)
        
    }
    render (){
        var {nama,img,discount,category,deskripsi,harga,id} = this.state.products
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className="card" style={{width: '18rem'}}>
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4c4c4c'}}>{this.state.products.nama}</h1>
                        <div style={{backgroundColor:'#D50000', width:'50px', height:'22px', color:'white', textAlignLast:'center', display:'inline-block'}}>
                            {discount} %
                        </div>
                        <span style={{fontSize:'12px',fontWeight:'600', color:'#606060', marginLeft:'10px', textDecoration:'line-through'}}>
                            Rp. {harga}
                        </span>
                        <div style={{fontSize:'24px',fontWeight:'700', color:'#FF5722',marginTop:'20px'}}>
                            Rp. {harga - (harga*(discount/100))}
                        </div>
                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px', color:'#606060', fontWeight:'700', fontSize:'14px'}}>
                                    Jumlah
                                </div>
                                <input type='number' min={1} className='form-control' style={{width:'60px', marginTop:'10px'}} onChange={this.inpJlh} ref='jumlah'/>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px', color:'#606060', fontWeight:'700', fontSize:'14px'}}>
                                    Catatan Untuk Penjual
                                </div>
                                <input type='text' style={{marginTop:'13px'}} className='form-control'placeholder='Contoh warna putih ukuran Xl' ref = 'catatan'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <p style={{color:'#606060', fontSize:'italic'}}>
                                    {deskripsi}
                                </p>
                            </div>
                        </div>
                        {this.props.username === "" 
                        ?
                        <div className='row mt-4'>
                            <input type='button' disabled className='btn border-secondary col-md-2' value='Add to-Wishlist'/>
                            <input type='button' disabled className='btn btn-primary col-md-3' value='Beli Sekarang'/>
                            <input type='button' disabled className='btn btn-success col-md-3' value='Masukkan ke keranjang'/>
                        </div>
                        :
                        <div className='row mt-4'>
                            <input type='button' className='btn border-secondary col-md-2' value='Add to-Wishlist'/>
                            <input type='button' className='btn btn-primary col-md-3' value='Beli Sekarang'/>
                            <input type='button' className='btn btn-success col-md-3' value='Masukkan ke keranjang'onClick = {this.masukKeranjang}/>
                        </div>
                        }
                    </div>
                    {this.state.cart.length}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return{
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.cart
    }
}

export default connect (mapStateToProps,{addToCart})(ProductDetail);


