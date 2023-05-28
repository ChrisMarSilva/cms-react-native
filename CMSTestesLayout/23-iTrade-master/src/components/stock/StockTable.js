import React from "react"
import StockProduct from "./StockProduct.js"

class  StockTable extends React.Component{
    state={stock:this.props.stockData}


    filterProductBase=(e)=>{
      const stockDataClone = [...this.state.stock]
      let final = stockDataClone.filter(item=> item.productName.toLowerCase().includes(e.target.value.toLowerCase()))
      this.setState({stock: e.target.value.length === 0?this.props.stockData:final})
  
    }
    
render(){ 
   const allproducts = this.state.stock.map(data=>{
       const supplier = this.props.supplierData.filter(x=>x.products.some(i=>i.productSerial === data.productSerial))

       return(
       data.productQuantity !== 0 ?
       <StockProduct data={data} key={data.id} supplier={supplier}/> : null

          )
   })

    return(
        <div className="container">
            <div className="row">
                <div className="col-12  border-bottom mb-4">
    <h2 className="display-4 float-right mb-2 mt-2">Stock</h2>
    </div></div>
                    <div className="row">
                        <div className="col-12">
                        <table className="table table-bordered">
            <thead className="thead-dark">
                <tr className="d-flex">
                <th className="col-3"> 
                    <div className="input-group">
                    <input  type="text" className="form-control " 
                    onChange={this.filterProductBase} placeholder="Product name"  ></input>
                     <span className="input-group-append">
        <button className="btn btn-secondary input-group-append" >Find</button></span></div>
                   </th>
                    <th className="col-2">Product serial</th>
                    <th className="col-1">Avalible</th>
                    <th className="col-1">Reserved</th>
                    <th className="col-2">Unit price</th>
                    <th className="col-3">Supplier info</th>
                </tr>
            </thead>
                            <tbody>
                            {allproducts}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
           
      
    )
}}



export default StockTable 