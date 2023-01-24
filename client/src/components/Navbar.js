import React from 'react';
import { Navbar, NavbarBrand, Button } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import "./Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header(props){
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    return(
      <Navbar
        color="light"
        light
      >
        <NavbarBrand href="/">
          <FontAwesomeIcon icon={faWallet} />
             Financent
        </NavbarBrand>
        {isAuthenticated
          ? <LogoutButton />
          : <LoginButton />
        }
      </Navbar>
    )
}
export default Header;