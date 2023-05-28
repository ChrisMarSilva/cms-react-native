import React from "react"
import SearchCustomer from "./SearchCustomer.js"
import NewCustomerForm from "./NewCustomerForm.js"
import FindedCustomer from "./FindedCustomer.js"



class CustomerInfo extends React.Component{
    state={
        newCustomer:{
            id:"",
            companyName: "",
            companyCountry: "",
            companyCity: "",
            companyAdress: "",
            companyTaxNumber: "",
            companyRegNumber: "",
            companyPhoneNumber: "",
            companyEmail: "",
            invoices:[]
           
        
        },
        click: false,
        product: false,
        status: true,
        customerName:"",
        productSerial:"",
      

    }
    
    setValues=(e)=>{
        this.setState({customerName: e.target.value, productSerial: e.target.value})
    }
     
findCustomer=()=>{
    let filteredCustomer = this.props.customerData.filter(customer=> customer.companyName.toLowerCase() === this.state.customerName.toLowerCase())
    let customer = filteredCustomer.length === 0? this.state.newCustomer : filteredCustomer[0]
    this.setState({newCustomer: customer, status: filteredCustomer.length === 0 ?false: true, product: filteredCustomer.length === 0 ?false: true})
    this.props.insertNewInvoiceNum(customer,this.props.invoiceNum)
    
        
}
addCustomer=()=>{
    this.setState({click: !this.state.click})
}

setValue=(e)=>{
    let inputId = e.target.id
    let newCustomerClone = {...this.state.newCustomer}
    newCustomerClone[inputId] = e.target.value
    newCustomerClone.invoices =[ this.props.invoiceNum]
    this.setState({newCustomer: newCustomerClone})
}

saveCustomer=()=>{
  this.props.insertNewCustomer(this.state.newCustomer)
  this.setState({click: false, status: 0, product: true})

}


    render(){

        return(
            
            <div className="row">
            <div className="col-7 offset-0">
            <h4 className="display-5 mb-4">Customer info</h4>   
            <SearchCustomer setValuesName={this.setValues} findCustomer={this.findCustomer} addCustomer={this.addCustomer}/>  
            {this.state.status === false ? <div className="row">
            <div className="col-6 offset-0">
            <p style={{color:"red"}}>No results were found. Please try again with different search phrases.</p>
            </div>

            </div> : null }   
            { this.state.click === true? <NewCustomerForm setValue={this.setValue} saveCustomer={this.saveCustomer} />: null}  
                                  
            </div>
            {this.state.newCustomer.companyName !== "" && this.state.click === false? <FindedCustomer data={this.state.newCustomer} />: null}
            </div>
            

        )
    }
}

export default CustomerInfo