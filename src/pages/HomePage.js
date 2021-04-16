import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Login from "./Login/login"
import CreateUserPage from './User/createUser/createUserPage'
import DashboardOverview from "./dashboard/DashboardOverview";
import EditUser from './User/editUser'
import ReadUser from './User/leerUsuario'
import CreateSede from './Sede/createSede'
import SearchSede from './Sede/searchSede'
import ReadSede from './Sede/leerSede'
import EditSede from './Sede/editSede'
import CreateGroup from './Group/createGroup'
import SearchGroup from './Group/searchGroup'
import ReadGroup from './Group/readGroup'
import EditGroup from './Group/editGroup'
import CreateRol from './Rol/createRol'
import SearchRol from './Rol/searchRol'
import ReadRol from './Rol/readRol'
import EditRol from './Rol/editRol'

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";



const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  const navigate = useHistory();
  const variables = JSON.parse(sessionStorage.getItem('login'));
  let islogged = true;

  if(variables === null)
  {
      islogged = false
  }

  return (
    <div>
    {islogged ? 
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    /> : navigate.push('/')}
    </div>
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <RouteWithLoader exact path={Routes.Login.path} component={Login} />
    <RouteWithLoader exact path={Routes.CreateUser.path} component={CreateUserPage} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
    <RouteWithSidebar exact path={Routes.ReadUser.path} component={ReadUser} />
    <RouteWithSidebar exact path={Routes.CreateSede.path} component={CreateSede} />
    <RouteWithSidebar exact path={Routes.SearchSede.path} component={SearchSede} />
    <RouteWithSidebar exact path={Routes.ReadSede.path} component={ReadSede} />
    <RouteWithSidebar exact path={Routes.EditSede.path} component={EditSede} />    
    <RouteWithSidebar exact path={Routes.CreateGroup.path} component={CreateGroup} />
    <RouteWithSidebar exact path={Routes.SearchGroup.path} component={SearchGroup} />
    <RouteWithSidebar exact path={Routes.ReadGroup.path} component={ReadGroup} />
    <RouteWithSidebar exact path={Routes.EditGroup.path} component={EditGroup} />
    <RouteWithSidebar exact path={Routes.CreateRol.path} component={CreateRol} />
    <RouteWithSidebar exact path={Routes.SearchRol.path} component={SearchRol} />
    <RouteWithSidebar exact path={Routes.ReadRol.path} component={ReadRol} />
    <RouteWithSidebar exact path={Routes.EditRol.path} component={EditRol} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
