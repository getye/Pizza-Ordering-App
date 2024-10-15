import React, { createContext } from 'react';
import { defineAbilitiesFor } from './permissions'; 

export const AbilityContext = createContext(null);

export const AbilityProvider = ({ children }) => {
  const userRole = localStorage.getItem('userRole'); 
  const ability = defineAbilitiesFor(userRole); 
  console.log("Role: ", userRole)
  console.log("Ability: ", ability)

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};