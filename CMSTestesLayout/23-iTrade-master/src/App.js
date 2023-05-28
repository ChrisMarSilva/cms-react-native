import React from "react"
import Navbar from "./components/Navbar.js"
import {BrowserRouter, Route} from "react-router-dom"
import NewInvoice from "./components/newInvoice/NewInvoice.js"
import Dashboard from "./components/Dashboard.js"
import StockTable from "./components/stock/StockTable.js"
import SuplierInvoice from "./components/supplierInvoice/SuplierInvoice.js"
import SupplierBase from "./components/base/SupplierBase.js"
import CustomerBase from "./components/base/CustomerBase.js"


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
          };
        }


        componentDidMount() {
            fetch("https://gist.githubusercontent.com/darmar0/d42992a1e2f93aee1adbf656126c3a1f/raw/5baa9fc0df407fb221a57c41dc7a8ad0e441efe1/db.json")
              .then(res => res.json())
              .then(
                (data) => {
                 this.setState({
                   isLoaded: true,
                   data
                 })
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
          }

          insertnewProduct=(newProduct)=>{
       
            let stockClone = [...this.state.data.stockData]
            let filterStock = stockClone.filter(product=> product.productSerial === newProduct.productSerial)
            let index = stockClone.indexOf(filterStock[0])
            if(filterStock.length >0){
                let quantity =   parseInt(filterStock[0].productQuantity) + parseInt(newProduct.productQuantity)
                filterStock[0].productQuantity = quantity  }
            this.setState({
                data: filterStock.length >0? { 
                    ...this.state.data, 
                    stockData: this.state.data.stockData.slice(index,0).concat(stockClone) 
                  }  :{ 
                  ...this.state.data, 
                  stockData: this.state.data.stockData.concat(newProduct) 
                } 
              })}
        
        insertNewSupplier=(newSupplier)=>{
            newSupplier.id = Math.floor(Math.random() * 100);
            this.setState({
                data:{ 
                  ...this.state.data,
                  supplierData: this.state.data.supplierData.concat(newSupplier) 
                } 
              })}
    
        insertNewCustomer=(newCustomer)=>{
            let id = newCustomer.id === ""?Math.floor(Math.random() * 100): newCustomer.id
            newCustomer.id = id
            this.setState({  
              data: { 
              ...this.state.data,
              customerData: this.state.data.customerData.concat(newCustomer)
            }})
        }
        insertNewInvoiceNum=(customer,invNum)=>{
          console.log(customer)
          let clone =  [...this.state.data.customerData]
          let cust = customer.companyTaxNumber === ""? null : 
          this.state.data.customerData.filter(i=>i.companyTaxNumber === customer.companyTaxNumber)[0]
          let newInvoices = customer.companyTaxNumber === ""? null : cust.invoices.concat(invNum)
          if(customer.companyTaxNumber !== ""){cust.invoices = newInvoices
          let index = clone.indexOf(this.state.data.customerData.filter(i=>i.companyTaxNumber === customer.companyTaxNumber)[0])
          clone.splice(index,1)}
          this.setState({  
            data: { 
            ...this.state.data,
            customerData: clone.concat(customer.companyTaxNumber !== ""?cust: null)
          }})
        }
    
   newInvoiceInfo=(newData)=>{
    newData.id = Math.floor(Math.random() * 100);
    let stockClone = [...this.state.data.stockData]
    let filterStock = stockClone.filter(product=> newData.products.map(p=>p.productSerial).includes(product.productSerial))
    let index = stockClone.filter(product=> newData.products.map(p=>p.productSerial).includes(product.productSerial)).map(d=>stockClone.indexOf(d))
    let quantity = filterStock.map(p=>
    ({id: p.id, productName:p.productName,productPrice: p.productPrice,productSerial: p.productSerial, productQuantity: 
   newData.products.filter(x=>x.productSerial.includes(p.productSerial)).map(x=>p.productQuantity - x.productQuantity)[0]}))
   let finalStock = stockClone.filter((v,i)=>index.indexOf(i) === -1).concat(quantity.map(d=>d))
  
            this.setState({  
              data: { 
              ...this.state.data,
              invoiceData: this.state.data.invoiceData.concat(newData) ,
              stockData: finalStock 
            }})
          }

        render(){
         const { error, isLoaded, data } = this.state;
         if (error) {
           return <div>Error: {error.message}</div>;
         } else if (!isLoaded) {
           return <div>Loading...</div>;
         } else {
            return(
                <div className="container-fluid">
                    <div className="row">
                    <BrowserRouter>
               <Navbar />
               <Route path="/" exact >
                   <Dashboard invoiceData={data.invoiceData} supplierData={data.supplierData}/>
               </Route>
                 <Route path="/invoice" >
                   <NewInvoice customerData={data.customerData} insertNewCustomer={this.insertNewCustomer} insertNewInvoiceNum={this.insertNewInvoiceNum}
                 stockData={data.stockData} deleteProduct={this.deleteProduct} newInvoiceInfo={this.newInvoiceInfo} temp={data.temp}/>
                 </Route>
                 <Route path="/stock" >
                     <StockTable stockData={data.stockData} supplierData={data.supplierData} />
                 </Route>
                 <Route path="/supplier-invoice" >
                   <SuplierInvoice insertnewProduct={this.insertnewProduct} insertNewSupplier={this.insertNewSupplier} 
                   supplierData={data.supplierData} stockData={data.stockData}/>
                 </Route>
                 <Route path="/supplier-base" >
                     <SupplierBase supplierData={data.supplierData}/>
                 </Route>
                 <Route path="/client-base" >
                     <CustomerBase invoiceData={data.invoiceData} companyData={data.companyData[0]}
                     customerData={data.customerData} filterCustomerBase={this.filterCustomerBase} insertNewCustomer={this.insertNewCustomer}/>
                 </Route>
                 
               </BrowserRouter>
               </div>
               </div>
            )}
        }
    }
    
    
    export default App;