import React from 'react'
import Navbar from '../navbar/Navbar'
const Dashboard = (props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}

export default Dashboard;