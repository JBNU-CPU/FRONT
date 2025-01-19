import React from "react";
import AppRoutes from "./approutes/AppRoutes";
import {AuthProvider} from './AuthContext';
import {AdminProvider} from './AdminContext';

const App = () => {
  return(
    <>
      <AuthProvider>
        <AdminProvider>
          <AppRoutes/>
        </AdminProvider>
      </AuthProvider> 
    </>
  );
};

export default App;