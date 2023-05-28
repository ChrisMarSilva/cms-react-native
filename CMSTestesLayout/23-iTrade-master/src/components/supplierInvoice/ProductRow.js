import React,{useState} from "react"
import SupInvoicePreview from "./SupInvoicePreview.js"

const ProductRow =({setValues,addProducttoInvoice,takeProduct,newProduct,status,realQuantState,productsOnInvoice,resiveValues})=>{
    const onStock = status === undefined? 0 : realQuantState.length > 0? realQuantState[0].productQuantity: null;
    const [id, setValueIId] = useState()
    const [val, setValueVal] = useState()

     const setValue=(e)=>{
        setValueVal(e.target.value)
        setValueIId(e.target.id)
        resiveValues(id,val)
    }

    return(
        <tbody>
        <tr className="d-flex">
         <td className="col ordinal">#</td>
         <td className="col-3 serial">
         <span className="input-group">
            <input id="productSerial" type="text" className="form-control " placeholder="serial num" onChange={setValues} 
            value={newProduct.productSerial}></input>
         <span className="input-group-append"> 
            <button onClick={takeProduct} className="btn btn-secondary input-group-append" >Check stock</button></span></span></td>
        <td className="col-3"><input id="productName" type="text" className="form-control" 
        placeholder={newProduct.productName===""? status: newProduct.productName} 
        onChange={setValues}/></td>
        <td className="col-2">
        <span className="input-group">
        <input id="productQuantity" type="text" className="form-control" placeholder="0.0" onChange={setValues} 
        value={newProduct.productQuantity}></input>
         <span className="input-group-append"> 
    <span onClick={takeProduct} className="input-group-text" >On stock : {onStock}</span></span></span></td>
        <td className="col-2"><input id="productPrice" type="text" className="form-control" placeholder={newProduct.productName===""? null: newProduct.productPrice}
        onChange={setValues}/></td>
        <td className="col-2"><button className="btn btn-secondary ml-4" onClick={addProducttoInvoice}>Add</button></td>
    </tr>
    <SupInvoicePreview newProduct={newProduct} productsOnInvoice={productsOnInvoice} setValue={setValue}/>
    </tbody>
    )
}

export default ProductRow

