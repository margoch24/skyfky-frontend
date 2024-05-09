import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "Router";
import { UserContextProvider } from "common/hooks/userContext";
import { queryClient as createQueryClient } from "common/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = createQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserContextProvider>
          <Router />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            theme="light"
          />
        </UserContextProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
