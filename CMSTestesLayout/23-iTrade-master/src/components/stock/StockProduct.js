import React from "react"


const StockProduct = ({data,supplier}) =>{

    return(
     <tr className="d-flex">
               <td className="col-3">{data.productName}</td>
               <td className="col-2">{data.productSerial}</td>
               <td className="col-1">{data.productQuantity}</td>
               <td className="col-1">0</td>
               <td className="col-2">{data.productPrice}</td>
              <td className="col-3">{supplier[0].supplier.companyName}</td>
    </tr>
    )
}


export default StockProduct