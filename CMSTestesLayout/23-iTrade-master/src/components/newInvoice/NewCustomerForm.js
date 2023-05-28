import React from "react"

const NewCustomerForm=({setValue,saveCustomer})=>{
    return(
        <div>
        <input id="companyName" type="text" className="form-control" placeholder="Company name" onChange={setValue}/><br/>
                          <div className="form-row">
                          <div className="form-group col-6">
                          <input id="companyCountry" type="text" className="form-control" placeholder="Country"onChange={setValue}/>
                          </div>
                          <div className="form-group col-6">
                          <input id="companyCity" type="text" className="form-control" placeholder="City"onChange={setValue}/>
                          </div>
                          </div>
                          <input id="companyAdress" type="text" className="form-control" placeholder="Adress"onChange={setValue}/><br/>
                          <div className="form-row">
                          <div className="form-group col-6">
                          <input id="companyTaxNumber" type="text" className="form-control" placeholder="Tax number"onChange={setValue}/>
                          </div>
                          <div className="form-group col-6">
                          <input id="companyRegNumber" type="text" className="form-control" placeholder="Registration number"onChange={setValue}/>
                          </div>
                          </div>
                          <div className="form-row">
                          <div className="form-group col-6">
                          <input id="companyPhoneNumber" type="text" className="form-control" placeholder="Phone number"onChange={setValue}/>
                          </div>
                          <div className="form-group col-6">
                          <input id="companyEmail" type="text" className="form-control" placeholder="Email adress"onChange={setValue}/>
                          </div>
                          </div>
                          <button onClick={saveCustomer}className="btn btn-secondary form-control">Save</button>
   </div>
    )
}


export default NewCustomerForm