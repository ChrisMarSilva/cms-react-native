import React,{useState} from "react"
import InvRow from "./InvRow.js"
import ModalInvoice from "./ModalInvoice.js"

const CustomerDetails = ({details,invoiceData,companyData})=>{

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const customerInvoices = invoiceData.filter(item=> details[0].invoices?details[0].invoices.includes(item.invoiceNum):null)
    const invoiceList = customerInvoices.map(data=>{
        return(
           
            <InvRow data={data} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} key={data.id} />
        )
    })

    const InvoicePreview= customerInvoices.map(data=>{
        return(
            <ModalInvoice data={data} companyData={companyData} details={details[0]} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} key={data.id}/>
        )
    })
 
    return(
 <div>
     <div className="row">
         <div className="col-12 mt-4 border-bottom mb-4">
             <h3>{details[0].companyName}</h3>
         </div>
     </div>
     <div className="row mt-4 mb-4">
        <div className="col-6">
            <div className="card">
                <div className="card-header">
                    <h5>General Information</h5>
                </div>
                <div className="card-body">
                   <p className="cuctomerInfo">Company name: <b>{details[0].companyName}</b></p>
                   <p className="cuctomerInfo">Adress: <b>{details[0].companyAdress}, {details[0].companyCity}, {details[0].companyCountry}</b></p>
                   <p className="cuctomerInfo">Tax number: <b>{details[0].companyTaxNumber}</b></p>
                   <p className="cuctomerInfo">Registration number:<b> {details[0].companyRegNumber}</b></p>
                </div>
            </div>
           
        </div>
        <div className="col-6">
        <div className="card">
                <div className="card-header">
                    <h5>Contact</h5>
                </div>
                <div className="card-body">
                <p className="customerContact">Contact person: </p>
                <p className="customerContact">Email adress: <b>{details[0].companyEmail}</b></p>
                <p className="customerContact">Phone number:<b> {details[0].companyPhoneNumber}</b></p>
                </div>
            </div>
           
        </div>
     </div>
     <div className="row">
         <div className="col-12 mt-4">
             <table className="table table-bordered">
                 <thead className="thead-dark">
                     <tr className="d-flex">
                         <th className="col-2 ordinal-btn">#</th>
                         <th className="col-5">Invoice number</th>
                         <th className="col-2">Invoice date</th>
                         <th className="col-2">Due date</th>
                         <th className="col-2">In total</th>            
                     </tr>
                 </thead>
                 {invoiceList}
             </table>
             {InvoicePreview}
         </div>
     </div>
 </div>
    )
}


export default CustomerDetails