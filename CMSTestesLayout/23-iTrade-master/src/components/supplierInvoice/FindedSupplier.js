import React from "react"


const FindedSupplier = ({data}) =>{
    const info = data.companyName === undefined? data.supplier: data
    return(
      
        <div className="col-5 offset-1">
        <div className="card">
                       <div className="card-header">
                           <h4>{info.companyName}</h4>
                        
                       </div>
                       <div className="card-body">
                           <h6>Adress:</h6> {info.companyAdress}, {info.companyCity}, {info.companyCountry}
                           <h6>Contact:</h6> {info.companyPhoneNumber}, {info.companyEmail}
                           
                       </div>
                   </div>
                   </div>
     
    )
}


export default FindedSupplier