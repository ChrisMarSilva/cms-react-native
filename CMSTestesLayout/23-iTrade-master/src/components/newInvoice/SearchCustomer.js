import React from "react"

const SearchCustomer=({setValuesName,findCustomer,addCustomer})=>{

    return(
        <div>
        <div className="row">
    <div className="col-6 offset-0 ">
            <p>Find customer by name</p>
        </div>
        </div>
        <div className="row">
        <div className="col-6 offset-0 input-group mb-3">
        <input type="text" className="form-control " placeholder="Customer name" onChange={setValuesName}></input>
        <div className="input-group-append">
        <button onClick={findCustomer} onKeyDown={findCustomer} className="btn btn-secondary input-group-append" >Find</button>
        <button onClick={addCustomer} className="btn btn-md btn-primary">Add new</button>
        </div>
        </div>
        </div>
        </div>
    )
}



export default SearchCustomer