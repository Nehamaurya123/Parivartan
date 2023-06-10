import { useState, useEffect, createContext, useContext } from "react";
import { APIS, ROUTES } from "./constants";
import API from "./api";
import session from "./session";
import ScriptsComponent from "../components/Scripts";
import { Navigate, useNavigate } from "react-router-dom";

export type AuthType = {
  isAuthenticated: any;
  user: any;
  login: Function;
  logout: Function;
  onActionPrimary: Function;
  primaryOpen: boolean;
  onActionSecondary: Function;
  secondaryOpen: boolean;
  onActionTertiary: Function;
  tertiaryOpen: boolean;
  title: string;
  setTitle: Function;
};

const AuthContext = createContext<AuthType>({
  isAuthenticated: null,
  user: null,
  login: () => {},
  logout: () => {},
  onActionPrimary: () => {},
  primaryOpen: false,
  onActionSecondary: () => {},
  secondaryOpen: false,
  onActionTertiary: () => {},
  tertiaryOpen: false,
  setTitle: () => {},
  title: '',
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(session.getUser());
  const [primaryOpen, setPrimaryOpen] = useState<boolean>(false);
  const [secondaryOpen, setSecondaryOpen] = useState<boolean>(false);
  const [tertiaryOpen, setTertiaryOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("session.getUser", session.getUser());
  }, []);

  const login = async (email: string, password: string) => {
    const res: any = await API.post(
      APIS.AUTH.LOGIN,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    if (res.type === "success") {
      session.setUser(res.data);
      setUser(res.data);
      session.setToken(res.token);
      console.log("Redirecting to dashboard");
      navigate(ROUTES.DASHBOARD);
    }
    return res;
  };

  const logout = () => {
    session.logout();
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  const onActionPrimary = (status: boolean) => {
    setPrimaryOpen(status);
  };

  const onActionSecondary = (status: boolean) => {
    setSecondaryOpen(status);
  };

  const onActionTertiary = (status: boolean) => {
    setTertiaryOpen(status);
  };

  const onSetTitle = (t: string) => {
    setTitle(t);
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!session.getToken(),
          user,
          primaryOpen,
          onActionPrimary,
          secondaryOpen,
          onActionSecondary,
          tertiaryOpen,
          onActionTertiary,
          login,
          logout,
          title,
          setTitle: onSetTitle
        }}
      >
        {children}
      </AuthContext.Provider>
      <ScriptsComponent />
    </div>
  );
};

export default AuthProvider;
