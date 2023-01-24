import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Ledgers from "./components/Ledgers"
import LedgerForm from './components/LedgerForm';
import EditLedgerForm from './components/EditLedgerForm';
import LedgerDetails from './components/LedgerDetails';
import AddTransactionForm from './components/AddTransactionForm';
import EditTransactionForm from './components/EditTransactionForm';
import Landing from './components/Landing'


function App() {

  const router = createBrowserRouter ([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/ledgers",
      element: <Ledgers />
    },
    {
      path: "/ledgers/add",
      element: <LedgerForm />
    },
    {
      path: "/ledgers/edit",
      element: <EditLedgerForm />
    },
    {
      path: "/ledgers/view/:id",
      element: <LedgerDetails />
    },
    {
      path: "/ledgers/transaction/add",
      element: <AddTransactionForm />
    },
    {
      path: "/ledgers/transaction/edit",
      element: <EditTransactionForm />
    }
  ])

    return (
      <>
      <RouterProvider router={router} />
      </>
    )
}

export default App;
