import Sheet from "./page/Sheet.jsx";
import Header from "./components/header.jsx";
import { InputContextProvider } from "./context/sheetContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// export default App;
function App() {
  return (
    <InputContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Sheet />} />
        </Routes>
      </BrowserRouter>
    </InputContextProvider>
  );
}

export default App;
