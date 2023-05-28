import React from "react"
import ProductRow from "./ProductRow.js"

class NewProduct extends React.Component{
state={
    newProduct: {   
        id: "",
        productName:"",
        productSerial: "",
        productQuantity: "",
        productPrice:"",
    },
   productsOnInvoice: {storageDate:"",supInvoiceNum:"",supplier:[],products:[]},
   serial:"",
   status:undefined,
   realQuantState:"",
   click: false,
   resetState : {
    id: "",
    productName:"",
    productSerial: "",
    productQuantity: 0,
    productPrice:0
}
}
   /*Creates new product*/
setValues=(e)=>{
    let inputId = e.target.id
    let newProductClone = {...this.state.newProduct}
    newProductClone[inputId] = e.target.value
    this.setState({newProduct:newProductClone,serial:newProductClone.productSerial})
}
/*Finds existing product*/
takeProduct=()=>{
    let filteredStock = this.props.stockData.filter(products=> products.productSerial === this.state.serial )
    let notFound = "No matching serial number in stock"
     let product = filteredStock.length === 0? this.state.newProduct : filteredStock[0]
     this.setState({newProduct: product,status: this.state.newProduct.productName === ""? notFound: null,
     realQuantState: filteredStock.length > 0 ?this.props.stockData.filter(products=> products.productSerial === this.state.newProduct.productSerial):false})
 }

/*Add newProduct on invoice list/ invoice package */
 addProducttoInvoice=()=>{
    let productsOnInvoiceClone = this.state.productsOnInvoice
    let productsInv = productsOnInvoiceClone.products.concat(this.state.newProduct)
    productsOnInvoiceClone.products = productsInv
    this.setState({productsOnInvoice:productsOnInvoiceClone,click: true,
    newProduct: this.state.resetState})
    this.props.insertnewProduct(this.state.newProduct)

}

/*Add invoice details  on invoice package*/
resiveValues=(id,target)=>{
    const day = new Date().getDate() <= 9? "0" + new Date().getDate():  new Date().getDate()
    const month= (new Date().getMonth()+1) <= 9? "0" +(new Date().getMonth()+1): (new Date().getMonth()+1)
    const year = new Date().getFullYear()
    const date = day+"."+month+"."+year
    let productsOnInvoiceClone = this.state.productsOnInvoice
    productsOnInvoiceClone.supInvoiceNum=target
    productsOnInvoiceClone.storageDate=date
    this.setState({productsOnInvoice:productsOnInvoiceClone})
}
/* Finaly adding a supplier in invoice package*/
save=()=>{
    let productsOnInvoiceClone = this.state.productsOnInvoice
    productsOnInvoiceClone.supplier= this.props.supplier
    this.setState({productsOnInvoice:productsOnInvoiceClone})
    this.props.insertNewSupplier(this.state.productsOnInvoice)
    this.props.history.push("/stock")
}

/*
deleteNewPr=()=>{
    this.setState({rows:this.state.rows.splice(1,1) })
}*/
    render(){
   
        return(
            <>
            <div className="row">
            <div className="col-12">
            <h4 className="display-5 mb-4 mt-4">Product info</h4>
        </div>
        </div>
       
    <div className="row">
    <div className="col-12">
        <table className="table table-bordered">
            <thead className="thead-dark">
                <tr className="d-flex">
                    <th className="col ordinal"></th>
                    <th className="col-3 serial">Product serial</th>
                    <th className="col-3">Product name</th>
                    <th className="col-2">Quantity</th>
                    <th className="col-2">Unit price</th>
                    <th className="col-2">Add in stock</th>
                </tr>
            </thead>
           
            <ProductRow setValues={this.setValues} saveProduct={this.saveProduct} takeProduct={this.takeProduct}
            newProduct={this.state.newProduct} status={this.state.status} realQuantState={this.state.realQuantState} 
            productsOnInvoice={this.state.productsOnInvoice.products} addProducttoInvoice={this.addProducttoInvoice} resiveValues={this.resiveValues}/>
    
        </table>
    </div>
    </div>
    <div className="row">
        <div className="col-4 mt-4">
            <button className="btn btn-secondary form-control" onClick={this.save}>Save</button>
        </div>
    </div>
</>

        )
    }
}

export default NewProduct