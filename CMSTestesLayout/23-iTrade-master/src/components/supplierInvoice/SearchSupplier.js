
import React from "react"

const SearchSupplier=({tax,setClick,setValuesName,addSupplier})=>{
   
    return(


        <div>
            <div className="row">
        <div className="col-7">
                <p>Find supplier by name</p>
            </div>
            </div>
            <div className="row">
            <div className="col-6 input-group mb-3">
            <input type="text" className="form-control col-6" placeholder="Supplier name" onChange={setValuesName}></input>
            <div className="input-group-append">
            <button onClick={setClick}className="btn btn-secondary input-group-append" disabled={tax===""}>Find</button>
            <button onClick={addSupplier} className="btn btn-md btn-primary">Add new</button>
            </div>
            </div>
            </div>
            </div>
           
            
           
            
            
       
    )
}





export default SearchSupplier