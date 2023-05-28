import React from 'react'
import '../css/Homepage.css'
import {connect} from 'react-redux'


const Navbar = props => {
    console.log(props)
    const handleMenu = value => {
        props.changeView(value)
    }


    return(
        <div id='navbarContainerDiv'>
            <div class='menuNav' onClick= {() => handleMenu('home')}>Home</div>
            <div class='menuNav' onClick= {() => handleMenu('myPortfolios')}>My Portfolios</div>
            <div class='menuNav' onClick= {() => handleMenu('myWatchlist')}>My Watchlist</div>
            <div class='menuNav' onClick= {() => handleMenu('news')}>News</div>
            {true ? <div class='menuNav' onClick = {() => handleMenu('login')}>Signup / Login</div> : <div class='menuNav' >Logout</div>} 
        </div>
    )
}

const mapStateToProps = state => {
    return {view: state.viewReducer.view}

}

const mapDispatchToProps = dispatch => {
    return{
        changeView: ((value) => dispatch({type: 'changeView', payload: value}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)