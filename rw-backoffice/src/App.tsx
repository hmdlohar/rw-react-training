import React, { useContext } from 'react';
import AppRoutes from './Main/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Main/theme';

const values = {
  isMenuOpen: false,
  setMenuOpen: console.log
}

interface IAppContext {
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
}
const AppContext = React.createContext<IAppContext>(values)

export const useAppContext = () =>
  useContext(AppContext);


function App() {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false)
  return (
    <AppContext.Provider value={{
      isMenuOpen,
      setMenuOpen
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
