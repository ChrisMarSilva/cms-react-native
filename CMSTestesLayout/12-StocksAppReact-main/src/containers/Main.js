import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import MyPortfolios from './MyPortfolios'
import MyWatchlist from './MyWatchlist'
import Login from './Login'
import News from './News'
import Footer from './Footer'
import '../css/Homepage.css'
import {connect} from 'react-redux'


const Main = props => {
    console.log(props.view)
    return(
        <div id='mainContainer'>
            <Navbar/>
            <div id='centralComponent'>
            {props.view === 'home' ? <Home/> : props.view === 'myPortfolios' ? <MyPortfolios/> : props.view === 'myWatchlist' ? <MyWatchlist/> : props.view === 'login' ? <Login/> : <News/>}
            </div>
            <Footer/>
        </div>
    )
}



const mapStateToProps = state => {
    return {view: state.viewReducer.view}

}

const mapDispatchToProps = dispatch => {
    return{
        changeView: ((view) => dispatch({type: 'view', payload: view}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)