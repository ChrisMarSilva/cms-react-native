import React from "react"
import SupInvRow from "./SupInvRow.js"

const SupInvoicePreview=({productsOnInvoice,setValue})=>{
  
    const invRow = productsOnInvoice.map((data,index)=>{
        return(
            <SupInvRow data={data} index={index+1} key={data.id}/>
        )
    })
   

    const day = new Date().getDate() <= 9? "0" + new Date().getDate():  new Date().getDate()
    const month= (new Date().getMonth()+1) <= 9? "0" +(new Date().getMonth()+1): (new Date().getMonth()+1)
    const year = new Date().getFullYear()
    const date = day+"."+month+"."+year
   
    return(
        <>
        <>{invRow}</>
        {productsOnInvoice.length !== 0 ?
        <tr className="d-flex table-secondary">
        <td className="col-4">
        <span className="input-group">
   <span  className="input-group-text" >Invoice number :</span>
   <input id="supInvoiceNum" type="text" className="form-control" onChange={setValue}></input>
<span className="input-group-prepend"> 
</span></span>
        </td>
        <td className="col-4">
        <span className="input-group">
   <span  className="input-group-text" >Due date:</span>
   <input id="dueDate" type="text" className="form-control" placeholder={date}></input>
<span className="input-group-prepend"> 
</span></span>
        </td>
        <td className="col-4">
        <span className="input-group">
   <span  className="input-group-text" >Date:</span>
   <input id="date" type="text" className="form-control" placeholder={date} disabled value={date}></input>
<span className="input-group-prepend"> 
</span></span>
        </td>
       
        </tr> : null }
    </>
    )
}



export default SupInvoicePreview