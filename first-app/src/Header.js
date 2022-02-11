import React from 'react'
import Logo from './Header/Logo'

function Header(props) {
    return (
        <div style={{ background: 'grey', display: 'flex', height: 50, justifyContent: 'space-between' }}>
            <Logo onLoaded={props.onLoaded} logoSrc={props.logoSrc} ></Logo>
            <div className='menu'> Menu will be here</div>
        </div>
    )
}

export default Header