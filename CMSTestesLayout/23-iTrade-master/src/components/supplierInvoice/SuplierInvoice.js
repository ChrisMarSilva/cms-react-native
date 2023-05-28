import React,{useState} from "react"
import SupplierInfo from "./SupplierInfo.js"
import NewProduct from "./NewProduct.js"
import { useHistory } from "react-router-dom";

const SuplierInvoice =({insertnewProduct,insertNewSupplier,supplierData,stockData,reciveSupplier,acceptSupplier})=>{

    const [supplier, setSupplier] = useState()

    reciveSupplier=(supp)=>{
        setSupplier(supp)
    }
    acceptSupplier=(supp)=>{
        setSupplier(supp)
    }

    let history = useHistory();


        return(
           <div className="container">
               <div className="row">
               <div className="col-12 border-bottom mb-4">
                <h2 className="display-4 float-right mb-2 mt-2">Supplier invoice</h2>
                
                       </div>
                    </div>
                      <SupplierInfo insertNewSupplier={insertNewSupplier} supplierData={supplierData}  
                      reciveSupplier={reciveSupplier} acceptSupplier={acceptSupplier}/>
                      <NewProduct insertnewProduct={insertnewProduct} stockData={stockData} supplier={supplier}
                      history={history} insertNewSupplier={insertNewSupplier}/>
                   </div>
                   
                 
        )
    
}

export default SuplierInvoice

