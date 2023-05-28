import React from "react"
import NewSupplierForm from "./NewSupplierForm.js"
import SearchSupplier from "./SearchSupplier.js"
import FindedSupplier from "./FindedSupplier.js"


class SupplierInfo extends React.Component{
    constructor(props){
        super(props);
    
this.state={
    newSupplier:{
        id:"",
        companyName: "",
        companyCountry: "",
        companyCity: "",
        companyAdress: "",
        companyTaxNumber: "",
        companyRegNumber: "",
        companyPhoneNumber: "",
        companyEmail: "",
    },
    click: false,
    supplierName: "",
    status: true
}}

setValue=(e)=>{
    let inputId = e.target.id
    let newSupplierClone = {...this.state.newSupplier}
    newSupplierClone[inputId] = e.target.value
    this.setState({newSupplier: newSupplierClone})
}
setValuesName=(e)=>{
    this.setState({supplierName:e.target.value})
}
saveSupplier=()=>{
    this.setState({click: false})
    this.props.reciveSupplier(this.state.newSupplier)
}
addSupplier=()=>{
    this.setState({click: !this.state.click})
}
setClick=()=>{
    const filteredSupplier = this.props.supplierData.filter(sup=>sup.supplier.companyName.toLowerCase() === this.state.supplierName.toLowerCase())
    const supplier = filteredSupplier.length === 0 ? this.state.newSupplier :filteredSupplier[0]
      this.setState({ newSupplier: supplier, status: filteredSupplier.length === 0 ?false: true })

      
   }
    render(){
        this.props.acceptSupplier(this.state.newSupplier)
        return(
<div className="row">
                           <div className="col-6">
                           <h4 className="display-5 mb-4">Supplier info</h4>   
                              <SearchSupplier setValuesName={this.setValuesName} setClick={this.setClick} tax={this.state.tax} addSupplier={this.addSupplier}/>
                              { this.state.status === false ? <div className="row">
            <div className="col-6">
            <p style={{color:"red"}}>No results were found. Please try again with different search phrases.</p>
            </div>
            <div className="col-6">
            </div>
            </div> : null }                   
                             { this.state.click === true? <NewSupplierForm setValue={this.setValue} saveSupplier={this.saveSupplier} />: null}
                           </div>
                           {this.state.newSupplier.companyName !== "" && this.state.click === false? <FindedSupplier data={this.state.newSupplier} />: null}
                  
             </div>
                      
        )
    }
}

export default SupplierInfo

