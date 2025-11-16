import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            
                <Navbar></Navbar>
           
            
                <div className='flex-1 bg-black/5'>
                    <Outlet></Outlet>
                </div>
            
           
                <Footer></Footer>
            
        </div>
    );
};

export default Root;