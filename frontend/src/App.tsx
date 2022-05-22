import { GeneralProvider } from "./context/General";
import AppRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "./theme";
import "./Button.css";

const App = () => {
  return (
    <ChakraProvider resetCSS theme={chakraTheme}>
      <GeneralProvider>
        <AppRoutes />
      </GeneralProvider>
    </ChakraProvider>
  );
};

export default App;
