import React from "react"


const FindedCustomer = ({data}) =>{

    return(
      
        <div className="col-5 offset-0 ">
        <div className="card">
                       <div className="card-header">
                           <h4>{data.companyName}</h4>
                        
                       </div>
                       <div className="card-body">
                           <h6>Adress:</h6> {data.companyAdress}, {data.companyCity}, {data.companyCountry}
                           <h6>Contact:</h6> {data.companyPhoneNumber}, {data.companyEmail}
                           
                       </div>
                     
                   </div>
                   </div>
     
    )
}


export default FindedCustomer