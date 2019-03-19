    import React from 'react';
    import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import Table from '@material-ui/core/Table';
    import TableHead from '@material-ui/core/TableHead';
    import TableBody from '@material-ui/core/TableBody';
    import TableCell from '@material-ui/core/TableCell';
    import TableFooter from '@material-ui/core/TableFooter';
    import TablePagination from '@material-ui/core/TablePagination';
    import TableRow from '@material-ui/core/TableRow';
    import Paper from '@material-ui/core/Paper';
    import IconButton from '@material-ui/core/IconButton';
    import FirstPageIcon from '@material-ui/icons/FirstPage';
    import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
    import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
    import LastPageIcon from '@material-ui/icons/LastPage';
    import Axios from 'axios';
    import { Button,Icon, Input,Label } from 'semantic-ui-react';
    import { connect } from 'react-redux';
    import swal from 'sweetalert';
    import cookie from 'universal-cookie';

    const objCookie = new cookie()
    const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
    });

    class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
        <div className={classes.root}>
            <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
            >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
            >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
            >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
            >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
        );
    }
    }

    TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    };

    const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
    );

    const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    });

    class CustomPaginationActionsTable extends React.Component {

    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
        isEdit : false,
        editItem : {},
        box : {},
        detileObj : []
    };

    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = () => {
        var id = objCookie.get('userData')
        Axios.get('http://localhost:2003/history?username=' +id)
        .then((res) => this.setState({rows : res.data}))
        .catch((err) => console.log(err))
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    
    onBtnEditClick = (param) => {
        this.setState({isEdit : true, editItem : param})
    } 
    onBtnDetileClick = (param) => {
        this.setState({detileObj : param, isEdite:true})
        
            // this.renderJsxDetail()
    } 
    // onBtnDelete = (id) => {
    //     Axios.delete('http://localhost:2003/cart/' + id)
    //     .then(() => {
    //         this.getDataApi()
    //     })
    //     .catch((err) => console.log(err))
    // };


    renderJsx = () => {
        var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
            return (
                <TableRow key={val.id_user}>
                    <TableCell>{val.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {val.date}
                    </TableCell>
                    <TableCell>{val.listCart.length}</TableCell>
                    {/* <TableCell>Rp. <h4>{this.hitungTotalCaer()}</h4></TableCell> */}

                    
                    <TableCell> 
                    <Button animated color='blue' onClick={() => this.onBtnDetileClick(val.listCart)}>
                        <Button.Content visible>Detile</Button.Content>
                        <Button.Content hidden>
                        <Icon name='edit' />
                            </Button.Content>
                        </Button>
                        </TableCell>
                        
                </TableRow>
                
                
            )
        })
        return jsx
    }
    renderJsxDetail = () => {
        var jsx = this.state.detileObj.map((val) => {
            return (
                <TableRow key={val.id}>
                    <TableCell>{val.id}</TableCell>
                        <TableCell component="th" scope="row">
                            {val.nama}
                        </TableCell>
                        <TableCell>Rp. {val.harga}</TableCell>
                        <TableCell>{val.discount}%</TableCell>
                        <TableCell>"""""""""""{val.qty}</TableCell>
                        <TableCell>Rp. {val.harga*val.qty-(val.harga*(val.discount/100))}</TableCell>
                        {/* <TableCell> 
                        <Button animated color='blue' onClick={() => this.onBtnEditClick(val)}>
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>
                        <Icon name='edit' />
                            </Button.Content>
                        </Button>
                        <Button animated color='red' onClick={() => this.onBtnDelete(val.id)}>
                            <Button.Content visible>Del</Button.Content>
                            <Button.Content hidden>
                            <Icon name='delete' />
                            </Button.Content>
                        </Button>
                        </TableCell> */}
                        
                </TableRow>
                
                
            )
        })
        return jsx
    }

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };
    onBtnEditClick = (param) => {
        this.setState({isEdite : true, editeItem : param,box :param})
    } 
    // onBtnCencle = () => {
    //     this.setState({isEdite : false, editeItem : {}})
    // } 
    // onBtnSave = () => {
    //     var nama = this.state.box.nama
    //     var harga = this.state.box.harga
    //     var discount = this.state.box.discount
    //     var category =this.state.box.category
    //     var img = this.state.box.img
    //     var deskripsi = this.state.box.deskripsi
    //     var id_products = this.state.box.id_products
    //     var id_user = this.state.box.id_user
    //     var catatan = this.state.box.catatan


    //     var qty = this.qtyEdit.inputRef.value === "" ? this.state.editeItem.qty  : this.qtyEdit.inputRef.value

    //     var newData = {
    //     nama : nama,
    //     harga: harga,
    //     discount : discount,
    //     category : category,
    //     img : img,
    //     deskripsi : deskripsi,
    //     id_products :id_products,
    //     id_user : id_user,
    //     catatan : catatan,
    //     qty : qty
    //     }
    
    //     Axios.put('http://localhost:2003/cart/' + this.state.editeItem.id , newData)
    //     .then((res) => {
    //         this.getDataApi()
    //         swal('Edit Status', ' Edit Produk Sukses', 'success' )
    //         this.setState({isEdite : false, editeItem : {}}) 
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // } 
    onBtnCheckOut = () => {
    var getCookie = objCookie.get('userDataCart')
    Axios.get('http://localhost:2003/cart?id_user=' +getCookie)
        .then((res)=>{
        for (var i=0; i<this.state.rows.length ; i++){
            var date = new Date()

            var id_user = res.data[i].id_user
            var nama = res.data[i].nama
            var harga = res.data[i].harga
            var category = res.data[i].category
            var deskripsi = res.data[i].deskripsi
            var img = res.data[i].img
            var id_products = res.data[i].id_products
            var qty = res.data[i].qty
            var newpost = {date,id_user,nama,harga,category,deskripsi,img,id_products,qty}
            Axios.post('http://localhost:2003/history',newpost)
            .then ((res)=>{
                //swal
            })
            .catch((err)=>{
                console.log(err)
            })

            Axios.delete('http://localhost:2003/cart/'+this.state.rows[i].id)
                .then ((res)=>{
                    console.log(res)
                    this.getDataApi()
                })
                .catch((err)=>{
                    //swal
                })
        }
        })
        .catch((res)=>{
        
        })

    }

    hitungTotalCaer = () => {
        var item = this.state.detileObj.length
        var total = 0
        
            for(var i = 0 ; i<item ; i++){
            
            var totalHargaBelanja = this.state.detileObj[i].harga*this.state.detileObj[i].qty-(this.state.detileObj[i].harga*(this.state.detileObj[i].discount/100))
            total += totalHargaBelanja
            }
            return total
        }
    btnClose = () => {
        this.setState({isEdite : false, editeItem : {}})
    }
    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        // destructering untuk manggil di place holder dengan cukup nama,harga dll
        var {nama,harga,discount,category,deskripsi,img} = this.state.editItem;
        
        return (
            <div className='container'>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>No</TableCell>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>Tanggal</TableCell>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>Jlh Item</TableCell>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ACT</TableCell>




                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.renderJsx()}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </div>
            </Paper>
            {/* ====================================== Detile PRODUCTS ============================================================ */}
        {
            this.state.isEdite === true ?
            <Paper className =''>
                <Table>
                    <TableHead>
                    <TableCell style={{fontSize:'24px', fontWeight:'600'}}>Detile History</TableCell>
                        
                    <TableRow>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>No</TableCell>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>NAMA</TableCell>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>HARGA</TableCell>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>DISC</TableCell>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>QTY</TableCell>
                        <TableCell style={{fontSize:'20px',fontWeight:'500'}}>TOTAL</TableCell>


                    </TableRow>
                </TableHead>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableBody>

                        {this.renderJsxDetail()}
                        <Button animated color='red' onClick={this.btnClose}>
                            <Button.Content visible>Close</Button.Content>
                            <Button.Content hidden>
                            <Icon name='delete' />
                            </Button.Content>
                        </Button>
                        
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <h1>Total Rp. {this.hitungTotalCaer()}</h1>
                    
                    </TableBody>
                </Table>
            </Paper>
            : null
        }
    
            </div>
            );
        
    }
    }

    CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    };



    const mapStateToProps = (state) => {
    return{
        role : state.user.role,
        id : state.user.id
    }
    }

    export default connect (mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));


    // ////////////////////////////////////////////////////////////////MULAI//////////////////////////////////////////////////////////////////////////////////////////

    // import React from 'react';
    // import PropTypes from 'prop-types';
    // import { withStyles } from '@material-ui/core/styles';
    // import Table from '@material-ui/core/Table';
    // import TableHead from '@material-ui/core/TableHead';
    // import TableBody from '@material-ui/core/TableBody';
    // import TableCell from '@material-ui/core/TableCell';
    // import TableFooter from '@material-ui/core/TableFooter';
    // import TablePagination from '@material-ui/core/TablePagination';
    // import TableRow from '@material-ui/core/TableRow';
    // import Paper from '@material-ui/core/Paper';
    // import IconButton from '@material-ui/core/IconButton';
    // import FirstPageIcon from '@material-ui/icons/FirstPage';
    // import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
    // import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
    // import LastPageIcon from '@material-ui/icons/LastPage';
    // import Axios from 'axios';
    // import {Button, Icon, Input, Label} from 'semantic-ui-react'
    // import swal from 'sweetalert';
    // import {connect} from 'react-redux';
    // import PageNotFound from '../components/pageNotFound';


    // const actionsStyles = theme => ({
    // root: {
    //     flexShrink: 0,
    //     color: theme.palette.text.secondary,
    //     marginLeft: theme.spacing.unit * 2.5,
    // },
    // });

    // class TablePaginationActions extends React.Component {
    // handleFirstPageButtonClick = event => {
    //     this.props.onChangePage(event, 0);
    // };

    // handleBackButtonClick = event => {
    //     this.props.onChangePage(event, this.props.page - 1);
    // };

    // handleNextButtonClick = event => {
    //     this.props.onChangePage(event, this.props.page + 1);
    // };

    // handleLastPageButtonClick = event => {
    //     this.props.onChangePage(
    //     event,
    //     Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    //     );
    // };

    // render() {
    //     const { classes, count, page, rowsPerPage, theme } = this.props;

    //     return (
    //     <div className={classes.root}>
    //         <IconButton
    //         onClick={this.handleFirstPageButtonClick}
    //         disabled={page === 0}
    //         aria-label="First Page"
    //         >
    //         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    //         </IconButton>
    //         <IconButton
    //         onClick={this.handleBackButtonClick}
    //         disabled={page === 0}
    //         aria-label="Previous Page"
    //         >
    //         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    //         </IconButton>
    //         <IconButton
    //         onClick={this.handleNextButtonClick}
    //         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    //         aria-label="Next Page"
    //         >
    //         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    //         </IconButton>
    //         <IconButton
    //         onClick={this.handleLastPageButtonClick}
    //         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    //         aria-label="Last Page"
    //         >
    //         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    //         </IconButton>
    //     </div>
    //     );
    // }
    // }

    // TablePaginationActions.propTypes = {
    // classes: PropTypes.object.isRequired,
    // count: PropTypes.number.isRequired,
    // onChangePage: PropTypes.func.isRequired,
    // page: PropTypes.number.isRequired,
    // rowsPerPage: PropTypes.number.isRequired,
    // theme: PropTypes.object.isRequired,
    // };

    // const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    // TablePaginationActions,
    // );

    // const styles = theme => ({
    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing.unit * 3,
    // },
    // table: {
    //     minWidth: 500,
    // },
    // tableWrapper: {
    //     overflowX: 'auto',
    // },
    // });

    // class CustomPaginationActionsTable extends React.Component {
    // state = {
    //     rows: [],
    //     page: 0,
    //     rowsPerPage: 5,
    //     isEdit: false,
    //     editItem : {},
    //     openModal : false,
    //     indexItem: 0
    // };

    // componentDidMount(){
    //     this.getDataApi()
    //     // this.getCartValue()
    // }

    // getDataApi = () => {
    //     Axios.get( 'http://localhost:2003/history')
    //     .then((res) => 
    //     this.setState({rows : res.data}))
    //     .catch((err) => console.log(err))
    // }

    // handleChangePage = (event, page) => {
    //     this.setState({ page });
    // };

    // totalHistory = (arrCart) => {
    //     var harga=0
    //     for (var i=0;i< arrCart.length;i++){
    //         harga += parseInt((arrCart[i].harga - (arrCart[i].harga *  arrCart[i].discount/100))* arrCart[i].quantity)
    //     }
    //     return harga
    // }
    // // getCartValue = () => {
    // //     Axios.get('http://localhost:2003/cart')
    // //     .then(res => console.log(res))
    // //     .catch((err) => console.log(err))
    // // }

    // renderJsx = () => {
    //     var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    //     .map((val, index) => {
    //         return(
    //             <TableRow key={val.id}>
    //                     <TableCell>{val.userId}</TableCell>
    //                     <TableCell>{val.date}</TableCell>
    //                     <TableCell>{val.listCart.length}</TableCell>
    //                     <TableCell>Rp. {this.totalHistory(val.listCart)}</TableCell>
    //                     <TableCell>
    //                         <Button animated color='blue' onClick={() => this.setState({openModal: !this.state.openModal, indexItem: index})}>
    //                         <Button.Content visible>Detail</Button.Content>
    //                         <Button.Content hidden>
    //                             <Icon name='search plus' />
    //                         </Button.Content>
    //                         </Button>
    //                     </TableCell>
    //                     </TableRow>
    //         )
    //     })
    //     return jsx
    // }

    // handleChangeRowsPerPage = event => {
    //     this.setState({ page: 0, rowsPerPage: event.target.value });
    // };

    // onBtnAdd = () => {
    //     var namaproduk = this.nama.inputRef.value
    //     var harga = parseInt(this.harga.inputRef.value)
    //     var discount = parseInt(this.discount.inputRef.value)
    //     var category = this.category.inputRef.value
    //     var img = this.img.inputRef.value
    //     var deskripsi = this.deskripsi.inputRef.value

    //     Axios.post ( 'http://localhost:2003/product', {nama : namaproduk, harga, discount, category, img, deskripsi})
    //     .then((res) => {
    //     swal('Add Product', 'Add Product Success', 'success',)
    //     this.getDataApi()
    //     })
    //     .catch((err) => {
    //     console.log(err)})
        
    //     this.nama.inputRef.value = ''
    //     this.harga.inputRef.value =''
    //     this.discount.inputRef.value = ''
    //     this.category.inputRef.value = ''
    //     this.img.inputRef.value = ''
    //     this.deskripsi.inputRef.value = ''
    // }

    // onBtnEditClick = (param) => {
    //     this.setState({isEdit: true, editItem: param})
    // }

    // render() {
    //     const { classes } = this.props;
    //     const { rows, rowsPerPage, page } = this.state;
    //     const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    //     var {nama, harga, discount, deskripsi, img, category} = this.state.editItem
    //     if (this.props.role === 'user')
    //     {
        
    //     return (
    //         <div className="container">
    //             <Paper className={classes.root}>
    //             <div className={classes.tableWrapper}>
    //             <Table className={classes.table}>
    //                 <TableHead>
    //                 <TableRow>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>#ID</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>TANGGAL</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>JUMLAH ITEM</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>TOTAL</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}></TableCell>
    //                 </TableRow> 
    //                 </TableHead>
    //                 <TableBody>
    //                 {this.renderJsx()}
    //                 {emptyRows > 0 && (
    //                     <TableRow style={{ height: 48 * emptyRows }}>
    //                     <TableCell colSpan={6} />
    //                     </TableRow>
    //                 )}
    //                 </TableBody>
    //                 <TableFooter>
    //                 <TableRow>
    //                     <TablePagination
    //                     rowsPerPageOptions={[5, 10, 25]}
    //                     colSpan={3}
    //                     count={rows.length}
    //                     rowsPerPage={rowsPerPage}
    //                     page={page}
    //                     SelectProps={{
    //                         native: true,
    //                     }}
    //                     onChangePage={this.handleChangePage}
    //                     onChangeRowsPerPage={this.handleChangeRowsPerPage}
    //                     ActionsComponent={TablePaginationActionsWrapped}
    //                     />
    //                 </TableRow>
    //                 </TableFooter>
    //             </Table>
    //             </div>
    //         </Paper> 
    //         {
    //         this.state.openModal === true ? (
    //             <Paper className={classes.root}>
    //             <div className={classes.tableWrapper}>
    //             <Table className={classes.table}>
    //                 <TableHead>
    //                 <TableRow>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>Nama Produk</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>Jumlah Qty</TableCell>
    //                     <TableCell style={{fontSize:'15px', fontWeight:'600'}}>Harga</TableCell>
    //                 </TableRow> 
    //                 </TableHead>
    //                 <TableBody>
    //                 {this.state.rows[this.state.indexItem].listCart.map((val, index) => (
    //                 <TableRow key={index}>
    //                     <TableCell>{val.namaProduk}</TableCell>
    //                     <TableCell>{val.quantity}</TableCell>
    //                     <TableCell>Rp. {val.harga}</TableCell>
    //                     </TableRow>
    //                 ))}
    //                 </TableBody>
    //             </Table>
    //             </div>
    //         </Paper>
    //         ) : (false)
    //         }                       
    //         </div>      
    //     );
    //     } 
    //     return <PageNotFound/>
    // }
    // }

    // CustomPaginationActionsTable.propTypes = {
    // classes: PropTypes.object.isRequired,
    // };

    // const mapStateToProps = (state) => {
    // return {
    //     role : state.user.role
    // }  
    // }

    // export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));