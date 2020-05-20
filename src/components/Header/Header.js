import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/Use-auth';

const Header = () => {
    const auth = useAuth();
    console.log(auth.user);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <a href="/shop">shop</a>
                <a href="/review">order review</a>
                <a href="/inventory">manage inventory</a>
                {
                    auth.user && <span style={{ color: 'yellow' }}>{auth.user.name}</span>

                }
                {
                    auth.user ? <a href="/login">sign </a> :
                        <a href="/login">sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;