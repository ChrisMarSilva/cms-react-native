import React from "react"



const InvRow =({data,setModalIsOpen})=>{
  

    return(
       <tbody className="table table-borde">
           <tr className="d-flex" id={data.id}>
               <td className="col-2 ordinal-btn"><button className="btn btn-secondary" onClick={()=>setModalIsOpen(true)}>Show</button></td>
               <td className="col-5">{data.invoiceNum}</td>
               <td className="col-2">{data.invoiceDate}</td>
               <td className="col-2">{data.invoiceDue}</td>
               <td className="col-2">{Number(data.calculation.total).toFixed(2)}</td>
           </tr>
         
         
      
       </tbody>
    
    )
}

export default InvRow