import React from "react"
import Customer from "./Customer.js"
import NewCustomerForm from "../newInvoice/NewCustomerForm.js"
import CustomerDetails from "../base/CustomerDetails.js"

class CustomerBase extends React.Component{
  state={customerData:this.props.customerData,click:false,details:{},newCustomer:{
    id:"",
    companyName: "",
    companyCountry: "",
    companyCity: "",
    companyAdress: "",
    companyTaxNumber: "",
    companyRegNumber: "",
    companyPhoneNumber: "",
    companyEmail: "",
}}

  
  filterCustomerBase=(e)=>{
    const customerDataClone = [...this.state.customerData]
    let final = customerDataClone.filter(item=> item.companyName.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({customerData: e.target.value.length === 0?this.props.customerData:final})

}
click=()=>{
    this.setState({click:true})
}

clickForDetails=(e)=>{
    let btnId = e.target.id
    let customer = this.state.customerData.filter(item=> item.id === parseInt(btnId))
    this.setState({details: customer,clickDetails: true})
}

setValue=(e)=>{
    let inputId = e.target.id
    let newCustomerClone = {...this.state.newCustomer}
    newCustomerClone[inputId] = e.target.value
    this.setState({newCustomer: newCustomerClone})
}

saveCustomer=(e)=>{
  this.props.insertNewCustomer(this.state.newCustomer)
  let inputId = e.target.id
  let newCustomerClone = {...this.state.newCustomer}
  newCustomerClone[inputId] = e.target.value
  this.setState({click: false, customerData: this.state.customerData.concat(newCustomerClone)})

}

    render(){
    const CustomerList = this.state.customerData.map(data=>{
        return( 
        <Customer data={data} clickForDetails={this.clickForDetails} key={data.id}/>
        )
    })
    return(
          
         
        <div className="container">
             <div className="row">
    <div className="col-12  border-bottom mb-4">
    <h2 className="display-4 float-right mb-2 mt-2">Client base</h2>
            
        </div>
        </div>
        {this.state.clickDetails === true? <CustomerDetails companyData={this.props.companyData}
        details={this.state.details} invoiceData={this.props.invoiceData}/> :
        <div className="row">
        <div className="col-12 offset-0 mt-4">
        <table className="table table-bordered">
            <thead className="thead-dark">
                <tr className="d-flex">
                    <th className="col-5"> 
                    <div className="input-group">
                    <input  type="text" className="form-control " 
                    onChange={this.filterCustomerBase} placeholder="Company name"  ></input>
                     <span className="input-group-append">
        <button className="btn btn-secondary input-group-append" >Find</button></span></div>
                   </th>
                    <th className="col-3">Adress</th>
                    <th className="col-2">Tax number</th>
                    <th className="col-2">Action</th>
                </tr>
            </thead>
            <tbody>
            {CustomerList}
            <tr className="d-flex table-secondary">
                <td className="col-10"></td>
                <td className="col-2">
                    <button className="btn btn-secondary text-align-center" onClick={this.click}>Add customer</button>
                </td>
            </tr>
            
            </tbody>
        </table>
        {this.state.click === true ? <NewCustomerForm setValue={this.setValue} saveCustomer={this.saveCustomer}/> : null}
        </div>
        </div>}
        </div>
        
    
    
    )
}
}

export default CustomerBase