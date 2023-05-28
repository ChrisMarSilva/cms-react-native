import React from "react"
import CProductRow from "./CProductRow.js"
import FinalCalculation from"./FinalCalculation.js"

class CProductInfo extends React.Component{
    state={
        product: 
            {   
                id: "",
                productName:"",
                productSerial: "",
                productQuantity: 0,
                productPrice:0
            },
        productsOnInvoice: [],
        realQuantState:[],
        status :"",
        invoiceInfo: { discount:0,taxes:0,dueDate:""},
        resetState : {
            id: "",
            productName:"",
            productSerial: "",
            productQuantity: 0,
            productPrice:0
        }
       
    }

    setValues=(e)=>{
        let inputID = e.target.id
        let cloneState = {...this.state.product}
        cloneState[inputID] =  e.target.value
     this.setState({product: cloneState})
     
    }

    setValuesInfo=(e)=>{
        let inputID = e.target.id
        let cloneState = {...this.state.invoiceInfo}
        cloneState[inputID] = e.target.value
        this.setState({invoiceInfo:cloneState })
    }

    takeProduct=()=>{
       let filteredStock = this.props.stockData.filter(products=> products.productSerial === this.state.product.productSerial )
        let product = filteredStock.length === 0? this.state.product : filteredStock[0]
        let notFound = "No matching serial number in stock"
        this.setState({product: product, status: product.productName === ""? notFound: null,
        realQuantState:this.props.stockData.filter(products=> products.productSerial === this.state.product.productSerial )  })
       
    }

    addPrToInvoice=()=>{
        let stockQuantity = this.props.stockData.filter(d=> d.productSerial === this.state.product.productSerial)[0].productQuantity
        this.setState({productsOnInvoice: stockQuantity <this.state.product.productQuantity?[]:
             this.state.productsOnInvoice.concat(this.state.product),click: true , 
            product: this.state.resetState
        })

    }
    
    deletePrToInvoice=(id)=>{
       let cloneState = [...this.state.productsOnInvoice]
       let newState = cloneState.filter(item=> item.id !== id)
       this.setState({productsOnInvoice: newState})
    }



    render(){ 
        const subtotal = this.state.productsOnInvoice.length !== 0? 
        this.state.productsOnInvoice.map((sub)=>sub.productPrice*sub.productQuantity).reduce((a,b)=>a+b): null;
        const curMonth = (new Date().getMonth()+1) <= 9? "0" +(new Date().getMonth()+1): (new Date().getMonth()+1)
    const currYear  = new Date().getFullYear()
    const day = new Date().getDate() <= 9? "0" + new Date().getDate():  new Date().getDate()
    const curDate = day +"."+ curMonth+"."+ currYear

return( 

    <div>
<div className="row">
<div className="col-12 offset-0 mt-3">
<h4 className="display-5 mb-4">Product info</h4>  
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
                    <th className="col-2">Add to invoice</th>
                </tr>
            </thead>
            
            <CProductRow takeProduct={this.takeProduct} setValues={this.setValues}  data={this.state.product} invoiceData={this.state.productsOnInvoice} 
            addPrToInvoice={this.addPrToInvoice} status={this.state.status} stockData={this.props.stockData} realQuantState={this.state.realQuantState}
            deletePrToInvoice={this.deletePrToInvoice} setValuesInfo={this.setValuesInfo}/>
            
        </table>

        </div>
        </div>
    </div>
   
    <FinalCalculation  data={this.state.productsOnInvoice} newInvoiceInfo={this.props.newInvoiceInfo}
     subtotal={subtotal} discount={this.state.discount} invoiceInfo={this.state.invoiceInfo} invoiceNum={this.props.invoiceNum} 
     curDate={curDate} history={this.props.history}/>
</div>



)
}
}
export default CProductInfo


