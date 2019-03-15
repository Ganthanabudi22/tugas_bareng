import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './../support/css/product.css'

class ProductList extends React.Component {
    state = {listProduct : []}

    componentDidMount(){
        this.getDataProduct()
    }
    getDataProduct = () => {
        axios.get('http://localhost:2003/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) =>{
            // if (val.discount > 0){
                return (
                    <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                        <Link to={'/product-detail/' + val.id}><img src={val.img} className="card-img-top img" alt="..." width='200px' height='200px'/></Link>
                        {/* //pake if ternary (karena melakukan pengkondisian di dalam return) */}
                        {val.discount > 0 ?
                            <div className='discount'> {val.discount}% </div>
                        :null
                        }
                        <div className='category'> {val.category}</div>
                        <div className="card-body">
                        <h2 className="card-text">{val.nama}</h2>
                        {
                            val.discount > 0?
                            <p className="card-text" style={{textDecoration:'line-through', color : 'red',display:'inline'}}>Rp. {val.harga}</p>
                            :null
                        }
                        <p style={{display:'inline', marginLeft:'30px', fontWeight:'500'}}>Rp . {val.harga-(val.harga*(val.discount/100))}</p>
                        <input type='button' className='d-block btn btn-primary' value='Add to Cart'/>
                    </div>
                </div>
                )
            // }else {
            //     return (
            //         <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
            //             <img src={val.img} className="card-img-top img" alt="..." width='200px' height='200px'/>
            //             <div className='category'> {val.category}</div>
            //             <div className="card-body">
            //             <h2 className="card-text">{val.nama}</h2>
            //             <p className="card-text" style={{marginRight:'20px'}}>Rp. {val.harga}</p>
            //             <input type='button' className='btn btn-primary' value='Add to Cart'/>
            //         </div>
            //     </div>
            //     )
            // }
        
                
            
        })
        return jsx
    }
    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}
export default ProductList