import React from 'react'
import './Popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Popup = (Component) => {


    let newPopup = () => {
        return <>
            <div className="modal-wrapper">
            <div className="modal-container">
                <Link to='/' className='close-icon'><FontAwesomeIcon icon={faClose} /></Link>
                <Component />
            </div>
            </div>
        </>
    }
    return newPopup
}


export default Popup