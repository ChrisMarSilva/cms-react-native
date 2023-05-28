import React from "react"
import Modal from "react-modal"
Modal.setAppElement("#App")


const ModalInvoice =({data,companyData,details,modalIsOpen,setModalIsOpen})=>{
    const invProducts = data.products.map(item=>{
        return(
            <tr className="d-flex" key={item.id}>
                <td className="col-6">{item.productName}</td>
                <td className="col-2">{item.productQuantity}</td>
                <td className="col-2">{item.productPrice}</td>
                <td className="col-2">{item.productPrice*item.productQuantity}</td>
                
                </tr>
        )
    })
    return(

<Modal className="modalInv" isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)}>
  <div className="container-fluid border">
    <div className="row mt-4 mb-3">
        <div className="col-4">
            <h4>{companyData.companyName}</h4>
            <p>
                   {companyData.companyAdress}<br/>
                   {companyData.companyCountry}, {companyData.companyCity}<br/>
                   Tax number:  {details.companyTaxNumber}<br/>
                   </p>
        </div>
        <div className="col-4">
       
        </div>
        <div className="col-4">
        <h1>INVOICE</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-4">
            <h6>BILL TO</h6>
            <p>
                   {details.companyName}<br/>
                   {details.companyAdress}, {details.companyCity}, {companyData.companyCountry}<br/>
                  Tax number:  {details.companyTaxNumber}<br/>
                   </p>
        </div>
        <div className="col-4">
            <h6>SHIP TO</h6>
            <p>
                   {details.companyName}<br/>
                   {details.companyAdress}, {details.companyCity}, {companyData.companyCountry}<br/>
                  Tax number:  {details.companyTaxNumber}<br/>
                   </p>
        </div>
        <div className="col-4">
        <h6>INFO</h6>
            <p> Invoice number:{data.invoiceNum}<br/>
                   Invoice date:{data.invoiceDate}<br/>
                   Due date: {data.invoiceDue}<br/>
                   </p>       
            </div>
    </div>
    <div className="row">
        <div className="col-12">
            <table className="table">
                <thead className="thead">
                    <tr className="d-flex">
                        <th className="col-6">Description</th>
                        <th className="col-2">Qty</th>
                        <th className="col-2">Unit price</th>
                        <th className="col-2">Amount</th>
                    </tr>
                    </thead>
                    <tbody className="table">
                    {invProducts}
                       </tbody>
                      
            </table>
        </div>
    </div>
    <div className="row mb-4 ">
        <div className="col-12">
    <div className="col-6 float-right">
               <div className="row ml-3">
                   <div className="col-3">
                   </div>
                   <div className="col-3 text-right">
                       
                   <p >
                  Subtotal <br/>
                  Discoount<br/>
                  Taxes  <br/>
                  </p>
                   </div>
                   <div className="col-3 text-right calInv">
                   <p>
                   EUR<br/>
                   EUR<br/>
                   EUR<br/>
                   </p>
                   </div>
                   <div className="col-3 text-left calInv">
                   <p >
                   {Number(data.calculation.subtotal).toFixed(2)}<br/>
                   {Number((data.calculation.subtotal/100) * data.calculation.discount).toFixed(2)}<br/>
                   {data.calculation.taxes}<br/>
                   </p>
                   </div>
               </div>
              
               <div className="row ml-2">
               <div className="col-3 ">
                    </div>
               <div className="col-3 text-right">
                   <h5> Total </h5> </div>
               <div className="col-3 text-right calInv">
                   <h5> EUR </h5> </div>
               <div className="col-3 text-right calInv">
                   <h5> 
        {Number(data.calculation.subtotal+data.calculation.taxes-(data.calculation.subtotal/100) * data.calculation.discount).toFixed(2)} </h5> </div>
               </div>
            </div>
        </div>
        </div>
        <div className="modal-footer">
    <div className="row">
            <div className="col-4">
            <button type="button"className="btn btn-secondary" onClick={()=>setModalIsOpen(false)}>Close</button>
            </div>
    </div>
    </div>
        </div>
    </Modal>
   
    )
}



export default ModalInvoice

