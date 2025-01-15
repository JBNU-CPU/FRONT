import React from "react";
import AppRoutes from "./approutes/AppRoutes";
import {AuthProvider} from './AuthContext';

const App = () => {
  return(
    <>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider> 
    </>
  );
};

export default App;