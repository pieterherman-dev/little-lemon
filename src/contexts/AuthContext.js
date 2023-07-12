// Date: 12/07/23
// Path: contexts/AuthContext.js

// Desc: Context for authentication of users (login, logout, etc.) and onboarding of users (onboarding, updating profile, etc.)
import { createContext } from "react";

// Create a context object with default values for 'user' and 'setUser' keys in the object returned by createContext()
export const AuthContext = createContext();
