import React from 'react'
import githubIcon from './githubLogo.png'
import './Footer.styles.css'

function Footer() {
    return (
    <container classame='border-top'>
        <footer className='footer'>
            <span>
                <a href='https://github.com/CarlosMaciasCusiter'>
                    <img src={githubIcon} alt="GitHub Logo"/>
                </a>
            </span>
        </footer>
    </container>
    )
}

export default Footer;