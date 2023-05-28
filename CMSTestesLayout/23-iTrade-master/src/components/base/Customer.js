
import React from "react"


const Customer=({data,clickForDetails})=>{

        return(
            
               
                <tr className="d-flex">
                 <td className="col-5">{data.companyName}</td>
                 <td className="col-3">{data.companyAdress}</td>
                 <td className="col-2">{data.companyTaxNumber}</td>
                 <td className="col-2"><button id={data.id} onClick={clickForDetails}className="btn btn-secondary">Show details</button></td>
                </tr>
                
               
        )
    
}

export default Customer