import React from "react"
import BarChart  from "./d3/BarChart.js"
import BarChart2  from "./d3/BarChart2.js"



const Dashboard=({invoiceData,supplierData})=>{
     
    const curMonth = (new Date().getMonth()+1) <= 9? "0" +(new Date().getMonth()+1): (new Date().getMonth()+1)
    const month = new Date().toLocaleString('default', { month: 'long' })
    const currYear  = new Date().getFullYear()
    const day = new Date().getDate() <= 9? "0" + new Date().getDate():  new Date().getDate()
    const curDate = day +"."+ curMonth+"."+ currYear
    
    /*SALES*/
    const salesCalc = invoiceData.filter(data => data.invoiceDate === curDate)
    const todaySales = Number(salesCalc.map(tr=> tr.calculation.total).reduce((a, b) => a + b, 0)).toFixed(2)
    const saleCalcM = invoiceData.filter(data=> data.invoiceDate.split("")[3] + data.invoiceDate.split("")[4] === curMonth)
    const monthSale = saleCalcM.length !==0? Number(saleCalcM.map(tr=> tr.calculation.total).reduce((a, b) => a + b, 0)).toFixed(2): 0.00
    const saleCalcY = invoiceData.filter(data=> parseInt(data.invoiceDate.split("").slice(6).join("")) === currYear)
    const yearSale = saleCalcY !== 0? Number(saleCalcY.map(tr=> tr.calculation.total).reduce((a, b) => a + b, 0)).toFixed(2): 0.00

    /*BAY*/
    /*const bayCalc = supplierData.filter(data => data.storageDate == curDate)
    const bayCalc2 = bayCalc.length !== 0? bayCalc.map(tr=> tr.products.map(pr=> parseInt(pr.productPrice*pr.productQuantity)).reduce((a, b) => a + b, 0)): 0.00
    const todayBay = bayCalc2.length !== 0? Number(bayCalc2.reduce((a, b) => a + b, 0)).toFixed(2):0
    const bayCalcM = supplierData.filter(data => data.storageDate.split("")[3]+data.storageDate.split("")[4] == curMonth)
    const bayCalcM1 = bayCalcM.length !== 0? bayCalc.map(tr=> tr.products.map(pr=> parseInt(pr.productPrice*pr.productQuantity)).reduce((a, b) => a + b, 0)): 0.00
    const monthBay =  bayCalcM1 !==0?Number(bayCalcM1.reduce((a, b) => a + b, 0)).toFixed(2):0.00
    const bayCalcY = supplierData.filter(data => parseInt(data.storageDate.split("").slice(6).join("")) === currYear)
    const bayCalcY1 = bayCalcY.length !== 0? bayCalcY.map(tr=> tr.products.map(pr=> parseInt(pr.productPrice*pr.productQuantity)).reduce((a, b) => a + b, 0)): 0.00
    const yearBay =  bayCalcY1!==0?Number(bayCalcY1.reduce((a, b) => a + b, 0)).toFixed(2):0.00*/
   

  /*MONTH SALES*/
    const dataSales = invoiceData.map(data => [data.invoiceDate].concat(data.calculation.total))
    const dataObjMonth = dataSales.map(d=>({
      date: d[0].split("")[3] + d[0].split("")[4] === String(curMonth)? d[0].split("")[0] + d[0].split("")[1] +"/"+ curMonth:null, sales: d[0].split("")[3] + d[0].split("")[4] === String(curMonth)? d[1]: 0}))
    const dataObjY = dataSales.map(d=>({
      date: parseInt(d[0].split("").slice(6).join("")) === currYear? d[0].split("")[0] + d[0].split("")[1] +"/"+ curMonth:null, sales:parseInt(d[0].split("").slice(6).join("")) === currYear? d[1]: 0}))
  /*YEAR SUPPLAY*/
  const dataSupplyDate = supplierData.map(d=>[d.storageDate].concat(d.products.map(p=>parseInt(p.productPrice*p.productQuantity)).reduce((a, b) => a + b, 0)))
  const dataObjYearSup = dataSupplyDate.map(d=>({
    date:parseInt(d[0].split("").slice(6).join("")) === currYear? d[0] : null, sales:parseInt(d[0].split("").slice(6).join("")) === currYear? d[1]: null
  }))


   const outputMsales = [];

   dataObjMonth.forEach(function(item) {
  var existing = outputMsales.filter(function(v, i) {
 
    return v.date === item.date;
  });
  if (existing.length) {
    var existingIndex = outputMsales.indexOf(existing[0]);
    outputMsales[existingIndex].sales = outputMsales[existingIndex].sales+item.sales;
    
  } else {
    if (typeof item.sales == 'string')
      item.sales = [item.sales];
      outputMsales.push(item);
  }
});



const outputTrade = dataObjY.map(x=>({date: x.date,sales: x.sales,cost: 0}))
.concat(dataObjYearSup.map(x=>({date: x.date.split("")[0] + x.date.split("")[1] +"/"+ curMonth, sales:0,cost: x.sales})))

const outputTradeFinal = [];

outputTrade.forEach(function(item) {
  var existing = outputTradeFinal.filter(function(v, i) {
 
    return v.date === item.date;
  });
  if (existing.length) {
    var existingIndex = outputTradeFinal.indexOf(existing[0]);
    outputTradeFinal[existingIndex].sales = outputTradeFinal[existingIndex].sales+item.sales;
    outputTradeFinal[existingIndex].cost = outputTradeFinal[existingIndex].cost+item.cost;
    
  } else {
    if (typeof item.sales == 'string')
      item.sales = [item.sales];
   
      outputTradeFinal.push(item);
  }
});


outputTradeFinal.sort(function(a, b) {
  var dateA = a.date.split("")[0]+a.date.split("")[1], dateB = b.date.split("")[0] + b.date.split("")[1];
  return dateA - dateB;
});

outputMsales.sort(function(a, b) {
  var dateA = a.date.split("")[0]+a.date.split("")[1], dateB = b.date.split("")[0] + b.date.split("")[1];
  return dateA - dateB;
});

/*output.length > 1? output.splice(0,1):output*/
return(
 
    <div className="container">
         <div className="row mt-5 mb-5">
            <div className="col-4">
              <div className="card text-white bg-primary">
                  <div className="card-header text-center">
                        <h5>TODAY'S SALES</h5>
                  </div>
                  <div className="card-body text-center">
                         <h2>€ {todaySales}</h2>
                  </div>
              </div>
            </div>
            <div className="col-4">
            <div className="card text-white bg-primary">
                  <div className="card-header text-center">
                  <h5>{month.toUpperCase()} SALES</h5>
                  </div>
                  <div className="card-body text-center">
                      <h2>€ {monthSale}</h2>
                  </div>
              </div>
            </div>
            <div className="col-4">
            <div className="card text-white bg-primary">
                  <div className="card-header text-center">
                  <h5>THIS YEAR SALES</h5>
                  </div>
                  <div className="card-body text-center">
                      <h2>€ {yearSale}</h2>
                  </div>
              </div>
            </div>
        </div>
        <hr></hr>
        <div className="row mt-5 mb-5" >
            <div className="col-12" >
                <BarChart outputMsales={outputMsales} month={month}/>
            </div>
        </div>
        <hr></hr>
        <div className="row mt-5 mb-5" >
            <div className="col-12" >
                <BarChart2 outputTradeFinal={outputTradeFinal} month={month}/>
            </div>
        </div>
        <div className="row mt-5 mb-5">
            <div className="col-12 mt-5 mb-5">
            <hr></hr>
            </div>
        </div>
        
    </div>
)
      }



export default Dashboard