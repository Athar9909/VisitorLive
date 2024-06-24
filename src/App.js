import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisitorLogin from "./DeskApp/LoginComp/VisitorLogin";
import VisitorDash from "./DeskApp/VisitorMain/Dashboard/VisitorDash";
import VisitorManage from "./DeskApp/VisitorMain/Dashboard/VisitorManage";
import VisitorLogs from "./DeskApp/VisitorMain/Dashboard/VisitorsLogs ";
import CreateVisitor from "./DeskApp/VisitorMain/CreateVisitor";
import GeneratedQr from "./DeskApp/VisitorMain/GeneratedQr";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<VisitorLogin />} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route path="/visitor/dashboard" element={<VisitorDash />} />
        <Route path="/visitor/management" element={<VisitorManage />} />
        <Route path="/visitor/CheckedInOut" element={<VisitorLogs />} />
        <Route path="/visitor/create-visitor" element={<CreateVisitor />} />
        <Route path="/visitor/viewQr/:id" element={<GeneratedQr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

