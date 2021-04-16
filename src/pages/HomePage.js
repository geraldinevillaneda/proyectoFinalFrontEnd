import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Login from "./Login/login"
import CreateUserPage from './User/createUser/createUserPage'
import Upgrade from "./Upgrade";
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
import SearchMemUsr from './membresias/searchMemUsr'
import ReadMemxUsr from './membresias/readMemxUsr'
import SearchMembresia from './membresias/searchMembresia'
import CreateMembresia from './membresias/createMembresia'
import ReadMembresia from './membresias/readMembresia'
import EditMembresia from './membresias/editMembresia'
import AsignarMembresia from './membresias/AsignarMembresias'

import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import Header from '../components/Header/index'

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


    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

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
    <RouteWithSidebar exact path={Routes.SearchMemUsr.path} component={SearchMemUsr} />
    <RouteWithSidebar exact path={Routes.ReadMemxUsr.path} component={ReadMemxUsr} />
    <RouteWithSidebar exact path={Routes.SearchMembresia.path} component={SearchMembresia} />
    <RouteWithSidebar exact path={Routes.CreateMembresia.path} component={CreateMembresia} />
    <RouteWithSidebar exact path={Routes.ReadMembresia.path} component={ReadMembresia} />
    <RouteWithSidebar exact path={Routes.EditMembresia.path} component={EditMembresia} />
    <RouteWithSidebar exact path={Routes.AsignarMembresia.path} component={AsignarMembresia} />

    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
