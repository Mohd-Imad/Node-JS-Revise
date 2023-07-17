import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return <>
        <Link to='/register'
            style={{ border: '2px solid black',margin:'1rem', padding: '1rem', backgroundColor: '#253d4e', color: '#fff', textDecoration: 'none', marginTop: '2rem' }}>Open Popup</Link>
    </>
}

export default Home
