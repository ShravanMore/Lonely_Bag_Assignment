
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

// Mock users database
const USERS_KEY = "movie_explorer_users";
const TOKEN_KEY = "movie_explorer_token";
const USER_KEY = "movie_explorer_user";

// Helper to get users from localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (credentials: RegisterCredentials): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === credentials.email)) {
    throw new Error("User already exists");
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name: credentials.name,
    email: credentials.email,
  };
  
  // Save user
  users.push(newUser);
  saveUsers(users);
  
  // Generate token
  const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const login = (credentials: LoginCredentials): User => {
  const users = getUsers();
  
  // Find user
  const user = users.find(
    user => user.email === credentials.email
  );
  
  // Check if user exists and password matches (in a real app, you'd hash passwords)
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // Generate token
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return user;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};
