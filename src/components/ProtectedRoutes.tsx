import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { EventInterface } from "@/types";

interface ProtectedRouteProps {
  loggedIn: boolean;
  handleSignOut: () => void;
  events: EventInterface[];
}

export const ProtectedRoutes = ({
  loggedIn,
  handleSignOut,
  events,
}: ProtectedRouteProps) => {
  return loggedIn ? (
    <>
      <Header handleSignOut={handleSignOut} events={events} /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
