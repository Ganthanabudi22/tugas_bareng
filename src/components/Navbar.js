import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import cookie from 'universal-cookie'
import {resetUser} from './../1.actions'
import { stat } from 'fs';
import PageNotFound from './pageNotFound'

const objCookie = new cookie
class HeaderKu extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
    };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onBtnLogOut=()=>{
        objCookie.remove('userData')
        this.props.resetUser()
    }

    render(){ 
        if (this.props.bebas === ""){
            return(
                <div style={{marginBottom:"75px"}}>
                    <Navbar color="primary" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                
                                <NavItem>
                                    <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Masuk</NavLink></Link>
                                </NavItem>
                                
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        }else {
            return(
                <div style={{marginBottom:"75px"}}>
                    <Navbar color="primary" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                
                                {/* <NavItem>
                                    <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                                </NavItem> */}
                                <NavItem>
                                    <NavLink > Hi , {this.props.bebas}  ({this.props.role}) </NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <Link to="/cart"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i class="fas fa-cart-plus"/> Cart <span class="baget baget-light">{this.props.cart}</span></NavLink></Link>
                                </NavItem>
                                
                                

                                <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                Menu
                                </DropdownToggle>
                                <DropdownMenu right>
                                { this.props.role === 'admin' ?
                                <Link to="/manageProduct" >
                                <DropdownItem>
                                    Manage Product
                                </DropdownItem>
                                </Link>
                                :null
                                }
                                <DropdownItem divider />
                                <Link to = '/histori'>
                                    <DropdownItem>
                                        Histori Transaksi
                                    </DropdownItem>
                                </Link>
                                
                                <DropdownItem divider />
                                <DropdownItem>
                                    Edite Profile
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onBtnLogOut}>
                                    LogOut
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );

        }
            
        }
}
const matStateToProms = (state) => {
    return {
        bebas : state.user.username,
        role : state.user.role,
        cart : state.cart.iconcart
    }    
}


export default connect (matStateToProms, {resetUser}) (HeaderKu)