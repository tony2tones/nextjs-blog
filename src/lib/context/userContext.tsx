'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";

type UserContextType = { 
  user: User | undefined,
  setUser: (user: User | undefined) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  }

  export const UserProvider = ({children} : ({children:React.ReactNode})) => {
    const [user, setUser] = useState<User | undefined>(undefined);
  console.log('UserProvider initialized with user:', user);
  
    useEffect(() => {
      async function fetchUser() {
        try {
          const res = await fetch('/api/user');
          if (!res.ok) return;
          const data = await res.json();
          setUser(data);
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
        console.log('UserProvider initialized with user:', user);
    }
    fetchUser();
  }, []);
    
  console.log('UserProvider user:', user);
    return (
      
      <UserContext.Provider value={{ user, setUser}}>
        {children}
      </UserContext.Provider>
    );
  }
