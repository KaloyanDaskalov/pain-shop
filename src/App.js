import "./App.css";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./state/user";
import ProtectedRoute from "./hoc/protected-route";
import ErrorBoundary from "./hoc/error-boundary";

import Footer from "./components/footer";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import Spinner from "./components/ui/spinner";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
// import Contact from "./pages/contact";
// import Create from "./pages/create";
// import Edit from "./pages/edit";
// import NotFound from "./pages/404";

const Contact = lazy(() => import("./pages/contact"));
const Create = lazy(() => import("./pages/create"));
const Edit = lazy(() => import("./pages/edit"));
const NotFound = lazy(() => import("./pages/404"));
// const Auth = lazy(() => import("./pages/auth"));
// const Profile = lazy(() => import("./pages/profile"));
// const Cart = lazy(() => import("./pages/cart"));

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
          <Route
            path="create"
            element={
              <Suspense fallback={<Spinner />}>
                <Create />
              </Suspense>
            }
          />
          <Route
            path="edit/:itemID"
            element={
              <Suspense fallback={<Spinner />}>
                <Edit />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="contact"
          element={
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
