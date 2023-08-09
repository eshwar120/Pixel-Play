import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    return (
        <>
            {
                (location === "/signin" || location === '/signup') ?
                    <></> :
                    <footer className='p-5 text-center bg-dark bg-gradient align-self-end just'>
                        <blockquote className="blockquote mb-0">
                            <p className='text-light'>Life is the ultimate game, and video games are just the best cheat codes we've found</p>
                        </blockquote>
                    </footer>
            }
        </>
    )
}
