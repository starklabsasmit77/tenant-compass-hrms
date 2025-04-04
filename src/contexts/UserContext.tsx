
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles
export type UserRole = 'employee' | 'hr' | 'accounts' | 'org-admin' | 'super-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  organizationId?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
}

const initialContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true,
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(initialContext);

export const useUser = () => useContext(UserContext);

// Mock users for demo purposes
const mockUsers: Record<string, User> = {
  'employee': {
    id: '1',
    name: 'John Employee',
    email: 'john@techcorp.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Developer',
    organizationId: '1'
  },
  'hr': {
    id: '2',
    name: 'Sarah HR',
    email: 'sarah@techcorp.com',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    organizationId: '1'
  },
  'accounts': {
    id: '3',
    name: 'Mike Finance',
    email: 'mike@techcorp.com',
    role: 'accounts',
    department: 'Finance',
    position: 'Accounts Manager',
    organizationId: '1'
  },
  'org-admin': {
    id: '4',
    name: 'Jessica Admin',
    email: 'jessica@techcorp.com',
    role: 'org-admin',
    position: 'Organization Admin',
    organizationId: '1'
  },
  'super-admin': {
    id: '5',
    name: 'Robert Super',
    email: 'robert@tenanthr.com',
    role: 'super-admin',
    position: 'System Administrator'
  }
};

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the user from localStorage or a session
    const storedRole = localStorage.getItem('userRole') || 'employee';
    
    // Set the current user based on the role
    setCurrentUser(mockUsers[storedRole]);
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('userRole');
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
