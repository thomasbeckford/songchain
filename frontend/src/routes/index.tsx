import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages";
import Layout from "../templates";

export default function AppRoutes() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
