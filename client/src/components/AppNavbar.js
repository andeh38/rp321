import React, { useState, useContext, useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import classnames from 'classnames';
import { AuthContext } from '../context/AuthState';
import { LoginModal } from './auth/LoginModal';
import { Logout } from './auth/Logout';
import { RegistrationModal } from './auth/RegistrationModal';

const Link = function () {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="d-inline-flex ml-auto">
      {isAuthenticated ? (
        <>
          <NavItem style={{ listStyleType: 'none' }}>
            <NavLink
              style={{ color: 'white' }}>{`welcome ${user.user.name}`}</NavLink>
          </NavItem>
          <Logout></Logout>
        </>
      ) : (
        <>
          <RegistrationModal></RegistrationModal> <LoginModal></LoginModal>
        </>
      )}
    </div>
  );
};

export const AppNavbar = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('currentTab'))
      setActiveTab(Number(sessionStorage.getItem('currentTab')));
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    sessionStorage.setItem('currentTab', tab);
  };

  const tabs = props.children.map((child) => {
    const id = props.children.indexOf(child);
    const tabname = child.props.id;
    return (
      <NavItem key={id} className="d-flex flex-nowrap">
        <NavLink
          style={activeTab === id ? style1 : style2}
          className={classnames({ active: activeTab === id })}
          onClick={() => {
            toggle(id);
          }}>
          {`${tabname}`}
        </NavLink>
      </NavItem>
    );
  });

  const content = props.children.map((child) => {
    const id = props.children.indexOf(child);
    return (
      <TabContent activeTab={activeTab} key={id}>
        <TabPane tabId={id}>{child}</TabPane>
      </TabContent>
    );
  });

  return (
    <>
      <Navbar
        tabs='true'
        nav-pills="true"
        style={style3}
        expand="sm"
        className="d-flex bd-highlight mb-5">
        <Container>
          <div className="d-inline-flex">{tabs}</div>
          <Link></Link>
        </Container>
      </Navbar>
      {content}
    </>
  );
};

const style3 = {
  backgroundColor: '#292b2c',
};

const style1 = {
  borderRadius: '20px',
  backgroundColor: '#5A5A5A',
  color: 'white',
  cursor: 'pointer',
};
const style2 = {
  borderRadius: '20px',
  backgroundColor: '#292b2c',
  color: 'white',
  cursor: 'pointer',
};
