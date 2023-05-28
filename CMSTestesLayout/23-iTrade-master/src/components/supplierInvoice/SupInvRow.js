import React from "react"

const SupInvRow =({index,data,deletePrToInvoice})=>{
  
    return(
        <tr className="d-flex ">
        <td className="col ordinal">{index}.</td>
        <td className="col-3 serial">{data.productSerial}</td>
        <td className="col-3">{data.productName}</td>
        <td className="col-2">{data.productQuantity}</td>
        <td className="col-2">{data.productPrice}</td>
        <td className="col-2">
            <button className="btn btn-secondary ml-4" onClick={()=>{deletePrToInvoice(data.id)}} >Delete</button></td>
    </tr> 
    )
}

export default SupInvRow