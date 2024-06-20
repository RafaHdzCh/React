import Users from "./pages/Users";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export default function App() 
{
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="users" element={<Users />}/>
          <Route path="login" element={<Login />}/>
          <Route path="cabins" element={<Cabins />}/>
          <Route path="account" element={<Account />}/>
          <Route path="settings" element={<Settings />}/>
          <Route path="dashboard" element={<Dashboard />}/>

          <Route path="*" element={<PageNotFound />}/>
          <Route index element={<Navigate replace to="dashboard" />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}