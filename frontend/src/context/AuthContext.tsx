import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: number | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  console.log("AuthProvider - Token:", token); // Debugging line
  console.log("AuthProvider - User ID:", userId); // Debugging line

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
