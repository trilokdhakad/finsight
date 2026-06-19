import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  email: string;
  firstName: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (
    token: string,
    user: User
  ) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (token) {
      setIsAuthenticated(true);
    }

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);

  }, []);

  const login = (
    token: string,
    user: User
  ) => {

    localStorage.setItem(
      "accessToken",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
    setIsAuthenticated(false);
  };

  return (

    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}