import { createTheme, ThemeProvider } from "@mui/material/styles"
import AppRouter from "./router/AppRouter"
import { grey, blueGrey } from "@mui/material/colors"
import { Provider } from "react-redux"
import store, { persistor } from "./app/store"
import { ToastContainer } from "react-toastify"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#E3D026',
      },
      secondary: {
        main: '#A29415',
      },
    },
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}

export default App
