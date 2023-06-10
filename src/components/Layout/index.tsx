import { FC, useEffect, useState } from "react";
import { Header } from "../Header";
import { Sidenav } from "../Sidenav";
import session from "../../utility/session";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utility/constants";
import { Helmet } from "react-helmet";

export const Layout: FC<any> = ({ page, icon, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!session.getUser()) {
      session.logout();
      navigate(ROUTES.LOGIN);
    }
  }, []);

  if (!session.getUser()) {
    return <></>;
  }

  return (
    <div className={"app loggedIn"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{page}</title>
        <link rel="icon" type="image/ico" href="/favicon.png"/> 
        <link rel="shortcut icon" type="image/ico" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon.png" /> 
        <meta name="description" content={page} />
        <meta name="viewport" content="width=1024, initial-scale=1.0"></meta>
      </Helmet>
      <Sidenav page={page} />
      <Header icon={icon} page={page} />
      {children}
    </div>
  );
};
