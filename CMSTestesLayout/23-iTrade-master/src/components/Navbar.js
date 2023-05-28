import React from "react"
import {NavLink} from "react-router-dom"


const Navbar = () =>{
  
return(
  <div className="col-6 border-primary">
<div className="navBar">
  <div className="logo">
  <h1 className="logo">iTrade</h1>
  </div>
<ul className="navbar-nav mt-4">
  <li className="nav-item">
    <NavLink to="/" exact className="nav-link" ><p>Dashboard</p></NavLink>
    </li>
    <li className="nav-item">
    <NavLink to="/invoice" className="nav-link"><p>Invoice</p></NavLink>
    </li>
    <li className="nav-item">
    <NavLink to="/supplier-invoice" className="nav-link"><p>Supplier Invoice</p></NavLink>
    </li>
    <li className="nav-item">
    <NavLink to="/client-base" className="nav-link"><p>Client base</p></NavLink>
    </li>
    <li className="nav-item">
    <NavLink to="/stock" className="nav-link"><p>Stock</p></NavLink>
  </li>
</ul>
</div>
</div>
)
}


export default Navbar
