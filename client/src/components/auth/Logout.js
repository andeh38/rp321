import React, { useContext } from 'react';
import { NavLink } from 'reactstrap';
import { AuthContext } from '../../context/AuthState';

export const Logout = () => {
  const { logout } = useContext(AuthContext);

  const onClick= ()=>{
    logout()
  }

  return (
    <NavLink onClick={onClick} href="#" style={{color:'white'}}>
      Log out
    </NavLink>
  );
};
