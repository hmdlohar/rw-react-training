import React, { useContext } from 'react';
import AppRoutes from './Main/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Main/theme';
import { store } from './redux/store';
import { Provider as ReduxProvider } from "react-redux";

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
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </ReduxProvider>
    </AppContext.Provider>
  );
}

export default App;
