import React from "react"
import Supplier from "./Supplier.js"

const SupplierBase=({supplierData})=>{
    const SupplierList = supplierData.map(data=>{
        return( 
        <Supplier data={data}/>
        )
    })
    return(
        <div className="container">
            <div className="row">
                <div className="col-10 offset-0">
                <h2 className="display-4 m-4">Supplier base</h2>
                </div>
                </div>
                <div className="row">
                
                {SupplierList}
                </div>
           
        </div>
        
            
    )
}


export default SupplierBase