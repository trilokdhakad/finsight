import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage
  from "./pages/LoginPage";

import RegisterPage
  from "./pages/RegisterPage";

import DashboardPage
  from "./pages/DashboardPage";

import TransactionsPage
  from "./pages/TransactionsPage";

import CategoriesPage
  from "./pages/CategoriesPage";

import AnalyticsPage
  from "./pages/AnalyticsPage";

import ProtectedRoute
  from "./routes/ProtectedRoute";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <DashboardPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>

              <TransactionsPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>

              <CategoriesPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>

              <AnalyticsPage />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}