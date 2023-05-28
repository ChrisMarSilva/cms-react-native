import React from "react"
import CustomerInfo from "./CustomerInfo.js"
import CProductInfo from "./CProductInfo.js"
import { useHistory } from "react-router-dom";



const NewInvoice=({customerData,insertNewCustomer,stockData,deleteProduct,newInvoiceInfo,insertNewInvoiceNum})=>{
   const invoiceNum = "i-"+new Date().getFullYear()+(new Date().getMonth()+1)+0+Math.floor(Math.random() * 100);
   let history = useHistory();
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 border-bottom mb-4">
                <h2 className="display-4 float-right mb-2 mt-2">New invoice</h2>
                </div>
            </div>
           
                <CustomerInfo customerData={customerData} insertNewCustomer={insertNewCustomer} invoiceNum={invoiceNum} insertNewInvoiceNum={insertNewInvoiceNum}/>
                <CProductInfo stockData={stockData} deleteProduct={deleteProduct} newInvoiceInfo={newInvoiceInfo} invoiceNum={invoiceNum} history={history}/> 
                
        </div>
    )
}


export default NewInvoice