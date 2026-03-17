import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  userName: string;
  setUserName: (name: string) => void;
  userAvatar: string;
  setUserAvatar: (avatar: string) => void;
  xp: number;
  level: number;
  addXp: (amount: number) => void;
  stars: number;
  addStars: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const XP_PER_LEVEL = 5000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("Piloto");
  const [userAvatar, setUserAvatar] = useState("account-outline");
  const [xp, setXp] = useState(2450); // Valor inicial para demonstração
  const [stars, setStars] = useState(125); // Valor inicial para demonstração

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const addStars = (amount: number) => {
    setStars(prev => prev + amount);
  };

  return (
    <AuthContext.Provider value={{ 
      userName, 
      setUserName, 
      userAvatar, 
      setUserAvatar, 
      xp, 
      level, 
      addXp,
      stars,
      addStars
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
