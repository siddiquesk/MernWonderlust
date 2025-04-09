import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import IndexListing from "./pages/Listings/IndexListing";
import ShowListing from "./pages/Listings/ShowListing";
import ListingCreate from "./pages/Listings/ListingCreate";
import EditListing from "./pages/Listings/EditListing";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexListing />} />
        <Route path="/listings/:id" element={<ShowListing />} />
        <Route path="/listings/new" element={<ListingCreate />} />
        <Route path="/listings/:id/edit" element={<EditListing />} />
      </Routes>
      <Footer />
      <Toaster
        toastOptions={{
          style: {
            transition: "all 0.4s ease-in-out",
          },
        }}
      />
    </>
  );
}

export default App;
