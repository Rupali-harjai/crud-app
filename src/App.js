import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Componets/Login";
import Register from "./Componets/Register";
import EventPage from "./Componets/EventPage";
import EventForm from "./Componets/EventForm";
import { getUser } from "./user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventPage />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/events/new"
          element={
            <PrivateRoute>
              <EventForm />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventForm />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const user = getUser;
  return user ? children : <Navigate to="/" />;
}

export default App;
