import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BuildContextProvider } from "./Context/BuildContext";
import { DesignContext, DesignContextProvider } from "./Context/DesignContext";
import { ReportContextProvider } from './Context/ReportContext';
import { ModalContextProvider } from "./Context/ModalContext";
const Build = lazy(() => import("./Build"));
const Design = lazy(() => import("./Design"));
const Reports = lazy(() => import('./Reports'));
const Share = lazy(() => import('./Share'));
const Configure = lazy(() => import('./Configure'));
const dashboardLink = document.getElementById('dashboardLink').value;
export default function Routes() {
    return (
        <Router>
            <div className="wpsf-cb-nav-container">
                <div className="wpsf-back">                    
                    <img src={require('./Build/BuildImages/arrow.png')}></img><a href={dashboardLink}>Back to dashboard</a>
                </div>
                <ul>
                    <li>
                        <Link to="/build">Build</Link>
                    </li>
                    <li>
                        <Link to="/design">Design</Link>
                    </li>
                    <li>
                        <Link to="/configure">Configure</Link>
                    </li>
                    <li>
                        <Link to="/share">Share</Link>
                    </li>
                    <li>
                        <Link to="/reports">Reports</Link>
                    </li>
                </ul>
                <div>
                    <button>Publish</button>
                </div>
            </div>
            <DesignContextProvider>
                <BuildContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/build">
                            <ModalContextProvider>
                            <Build></Build>
                            </ModalContextProvider>
                        </Route>
                        <Route path="/design">
                            <Design></Design>
                        </Route>
                        <Route path="/configure">
                            <Configure />
                        </Route>
                        <Route path="/share">
                            <Share />
                        </Route>
                        <Route path="/reports">
                            <ReportContextProvider>
                                <Reports></Reports>
                            </ReportContextProvider>
                        </Route>
                    </Switch>
                </Suspense>
                </BuildContextProvider>
            </DesignContextProvider>
        </Router>
    );
}
