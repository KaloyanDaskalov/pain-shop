import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useAuth } from "./state/user";
import ProtectedRoute from "./hoc/protected-route";
import ErrorBoundary from "./hoc/error-boundary";

import Footer from "./components/footer";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Contact from "./pages/contact";
import Create from "./pages/create";
import Cart from "./pages/cart";
import Edit from "./pages/edit";
import NotFound from "./pages/404";

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="auth"
          element={
            <ProtectedRoute isAllowed={!Boolean(user)} redirectPath="/profile">
              <Auth />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/auth" />}>
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAllowed={user?.email === "kala_ds@yahoo.com"} redirectPath="/" />
          }>
          <Route path="create" element={<Create />} />
          <Route path="edit/:itemID" element={<Edit />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
