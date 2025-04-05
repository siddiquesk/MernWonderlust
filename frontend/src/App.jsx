import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexListing from "./pages/Listings/IndexListing";
import ShowListing from "./pages/Listings/ShowListing";
import ListingCreate from "./pages/Listings/ListingCreate";
import EditListing from "./pages/Listings/EditListing";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexListing />} />
        <Route path="/listings/:id" element={<ShowListing />} />
        <Route path="/listings/new" element={<ListingCreate />} />
        <Route path="/listings/:id/edit" element={<EditListing />} />
      </Routes>
    </>
  );
}

export default App;
