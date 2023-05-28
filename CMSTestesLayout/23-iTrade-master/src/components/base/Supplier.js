
import React from "react"

const Supplier=({data})=>{

        return(
            <div className="col-6">
    <div className="card">
                   <div className="card-header">
                       <h4>{data.companyName}</h4>
                   </div>
                   <div className="card-body">
                       <h6>Adress:</h6> {data.companyAdress}, {data.companyCity}, {data.companyCountry}
                       <h6>Contact:</h6> {data.companyPhoneNumber}, {data.companyEmail}
                       
                   </div>
                   <div className="card-footer">
                       <h4>Header</h4>
                   </div>
               </div>
               </div>
        )
    
}

export default Supplier