import React from 'react'

function Button(props) {
    console.log(props)
    return (
        <button className='button' onClick={props.onClick}>
            {props.title || props.label}
        </button>
    )
}

export default Button