import React from "react"


class FinalCalculation extends React.Component{
    
    state={
        invoiceNum:this.props.invoiceNum,
        invoiceDate: this.props.curDate,
        invoiceDue:this.props.curDate,
        calculation:{ subtotal:0,discount:0,taxes:0,total:0},
        products:{},
        customerTax:""
    }

    componentWillReceiveProps(nextProps) {
        const tax = (nextProps.subtotal*nextProps.invoiceInfo.taxes)/100
        const disc = (nextProps.subtotal/100) * nextProps.invoiceInfo.discount
        const tl = nextProps.subtotal +tax - disc
        this.setState({ calculation: {subtotal:nextProps.subtotal,discount:disc,taxes:tax,total:tl},
        products: nextProps.data,customerTax: nextProps.temp });
      }

    saveInvoice=()=>{
        this.props.newInvoiceInfo(this.state.subtotal !== 0? this.state: null)
        this.props.history.push("/client-base")
        
    }

render(){ 

        return(
            <>
            <div className="row border mt-2">
            <div className="col-4">
            <div className="row">
                   <div className="col">
                   <ul className="list-group list-group-flush">
  <li className="list-group-item"><span className="row"><span className="col-6">Invoice number: </span> 
  <span className="col-6">{this.state.invoiceNum}</span></span></li>
  <li className="list-group-item"><span className="row"><span className="col-6">Invoice date: </span> 
  <span className="col-6">{this.state.invoiceDate}</span></span></li>
  <li className="list-group-item"><span className="row"><span className="col-6">Due date: </span> 
  <span className="col-6">{this.state.invoiceDue}</span></span></li>
</ul>
 
                   </div>
               
            
               </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
            <ul className="list-group list-group-flush">
  <li className="list-group-item"><span className="row"><span className="col-4 text-right">Subtotal </span> 
  <span className="col-4  text-center">EUR</span> <span className="col-4 text-left">{Number(this.props.subtotal).toFixed(2)}</span> </span></li>
  <li className="list-group-item"><span className="row"><span className="col-4  text-right">Discoount </span> 
  <span className="col-4  text-center">EUR</span> <span className="col-4 text-left"> {Number((this.props.subtotal/100) * this.props.invoiceInfo.discount).toFixed(2)}</span> </span></li>
  <li className="list-group-item"><span className="row"><span className="col-4  text-right">Taxes </span> 
  <span className="col-4  text-center">EUR</span> <span className="col-4 text-left">{Number((this.props.subtotal*this.props.invoiceInfo.taxes)/100).toFixed(2)}</span> </span></li>
  <li className="list-group-item"><span className="row"><span className="col-4  text-right font-weight-bold">Total </span> 
  <span className="col-4  text-center font-weight-bold">EUR</span> <span className="col-4 text-left font-weight-bold">{Number(this.props.subtotal+(this.props.subtotal*this.props.invoiceInfo.taxes)/100-(this.props.subtotal/100) * this.props.invoiceInfo.discount).toFixed(2)}</span> </span></li>
</ul> 

              
            </div>
        </div>
        <div className="row">
            <div className="col-6 float-left">
            {this.props.subtotal !== 0 && this.props.subtotal !== null?
        <button onClick={this.saveInvoice}className="btn btn-secondary mt-4 mb-4 form-control">Save</button>: null}
            </div>
        </div>
    
        </>

    
        )
    }}


export default FinalCalculation



