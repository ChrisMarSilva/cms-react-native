import React from "react"

const InvoiceRow =({invoiceData,index,deletePrToInvoice})=>{


    return(
        
    <tr className="d-flex ">
        <td className="col ordinal">{index}.</td>
        <td className="col-3 serial">{invoiceData.productSerial}</td>
        <td className="col-3">{invoiceData.productName}</td>
        <td className="col-2">{invoiceData.productQuantity}</td>
        <td className="col-2">{invoiceData.productPrice}</td>
        <td className="col-2">
            <button className="btn btn-secondary ml-4" onClick={()=>{deletePrToInvoice(invoiceData.id)}} >Delete</button></td>
    </tr> 
   
    )
}

export default InvoiceRow
