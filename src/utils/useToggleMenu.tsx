import { ReactNode, createContext, useContext, useState } from 'react';

type ToggleMenuProviderProps = {
    children: ReactNode
  };
  
const ToggleMenuContext = createContext({
  toggleMenu: true,
  handleMenuToggle: () => {},
});


export const useToggleMenu = () => useContext(ToggleMenuContext);

export const ToggleMenuProvider = ({children}: ToggleMenuProviderProps) => {
  const [toggleMenu, setToggleMenu] = useState(true);

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <ToggleMenuContext.Provider value={{ toggleMenu, handleMenuToggle }}>
      {children}
    </ToggleMenuContext.Provider>
  );
};
