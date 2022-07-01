import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  Route,
  Routes,
  Outlet,
  Navigate,
  useLocation,
  useNavigationType,
  useNavigate,
} from "react-router-dom";
import useFetch from "use-http";
import Login from "./features/auth/login";
import Todo from "./features/todo/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LoginReroute />}>
          <Route index element={<Login />} />
          <Route path="app" element={<Todo />} />
        </Route>
      </Routes>
    </div>
  );
}

interface User {
  name: string;
  email: string;
  img: string;
}

export const UserContext = createContext<any>(null);

const LoginReroute: React.FC = () => {
  const userState = useState<any>();
  const location = useLocation();

  const [user, setUser] = userState;

  const { get, loading, response } = useFetch("/users/me", {});

  const fetchUser = useCallback(async () => {
    const resp = await get();
    if (response.status === 200) {
      setUser(resp);
    } else {
      setUser(null);
    }
  }, [get, response.status, setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(user);

  if (loading) return <div> loading... </div>;
  if (!user && location.pathname !== "/") return <Navigate to="/" />;
  if (user && location.pathname === "/") return <Navigate to="/app" />;

  return (
    <UserContext.Provider value={userState}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default App;
