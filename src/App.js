import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBoxForm from "./components/AddBoxForm";
import BoxListTable from "./components/BoxListTable";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddBoxForm />} />
        <Route path="/list" element={<BoxListTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
