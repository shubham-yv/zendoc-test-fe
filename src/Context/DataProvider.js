import React, { createContext, useState, useEffect } from "react";

export const Datacontext = createContext(null);

const DataProvider = ({ children }) => {

  const [completeProfilePercenrtage, setCompleteProfilePercenrtage] = useState('')

  return (
    <Datacontext.Provider
      value={{
        completeProfilePercenrtage,
        setCompleteProfilePercenrtage
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

export default DataProvider;
