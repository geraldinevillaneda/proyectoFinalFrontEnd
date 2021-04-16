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
import CreateCourse from './Curso/createCourse'
import SearchCourse from './Curso/searchCourse'
import ReadCourse from './Curso/readCourse'
import EditCourse from './Curso/editCourse'
import CreateGroup from './Group/createGroup'
import SearchGroup from './Group/searchGroup'
import ReadGroup from './Group/readGroup'
import EditGroup from './Group/editGroup'
import CreateRol from './Rol/createRol'
import SearchRol from './Rol/searchRol'
import ReadRol from './Rol/readRol'
import EditRol from './Rol/editRol'
import SearchMemUsr from './membresias/searchMemUsr'
import ReadMemxUsr from './membresias/readMemxUsr'
import SearchMembresia from './membresias/searchMembresia'
import CreateMembresia from './membresias/createMembresia'
import ReadMembresia from './membresias/readMembresia'
import EditMembresia from './membresias/editMembresia'
import AsignarMembresia from './membresias/AsignarMembresias'

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
    <RouteWithSidebar exact path={Routes.CreateCourse.path} component={CreateCourse} />
    <RouteWithSidebar exact path={Routes.SearchCourse.path} component={SearchCourse} />
    <RouteWithSidebar exact path={Routes.ReadCourse.path} component={ReadCourse} />
    <RouteWithSidebar exact path={Routes.EditCourse.path} component={EditCourse} />  
    <RouteWithSidebar exact path={Routes.CreateGroup.path} component={CreateGroup} />
    <RouteWithSidebar exact path={Routes.SearchGroup.path} component={SearchGroup} />
    <RouteWithSidebar exact path={Routes.ReadGroup.path} component={ReadGroup} />
    <RouteWithSidebar exact path={Routes.EditGroup.path} component={EditGroup} />
    <RouteWithSidebar exact path={Routes.CreateRol.path} component={CreateRol} />
    <RouteWithSidebar exact path={Routes.SearchRol.path} component={SearchRol} />
    <RouteWithSidebar exact path={Routes.ReadRol.path} component={ReadRol} />
    <RouteWithSidebar exact path={Routes.EditRol.path} component={EditRol} />
    <RouteWithSidebar exact path={Routes.SearchMemUsr.path} component={SearchMemUsr} />
    <RouteWithSidebar exact path={Routes.ReadMemxUsr.path} component={ReadMemxUsr} />
    <RouteWithSidebar exact path={Routes.SearchMembresia.path} component={SearchMembresia} />
    <RouteWithSidebar exact path={Routes.CreateMembresia.path} component={CreateMembresia} />
    <RouteWithSidebar exact path={Routes.ReadMembresia.path} component={ReadMembresia} />
    <RouteWithSidebar exact path={Routes.EditMembresia.path} component={EditMembresia} />
    <RouteWithSidebar exact path={Routes.AsignarMembresia.path} component={AsignarMembresia} />


    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
