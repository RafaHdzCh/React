import Users from "./pages/Users";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient(
{
  defaultOptions: 
  {
    queries: 
    {
      staleTime: 60*1000,
    }
  }
})

export default function App() 
{
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />}/>
            <Route path="users" element={<Users />}/>
            <Route path="cabins" element={<Cabins />}/>
            <Route path="account" element={<Account />}/>
            <Route path="bookings" element={<Bookings />}/>
            <Route path="settings" element={<Settings />}/>
            <Route path="dashboard" element={<Dashboard />}/>
          </Route>

          <Route path="login" element={<Login />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}