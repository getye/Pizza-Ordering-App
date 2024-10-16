import React, { createContext, useEffect, useState } from 'react';
import { defineAbilitiesFor } from './permissions';

export const AbilityContext = createContext(null);

export const AbilityProvider = ({ children }) => {
  const [ability, setAbility] = useState(defineAbilitiesFor(null)); // Initialize ability

  useEffect(() => {
    const role = localStorage.getItem('userRole'); // Fetch role from localStorage
    if (role) {
      const userAbility = defineAbilitiesFor(role); // Define abilities based on the role
      setAbility(userAbility); // Update ability state
    }
  }, []); // Runs only once after the component mounts

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
