// src/hooks/useAuth.js
import { useUser } from "@clerk/clerk-react";

const useAuth = () => {
  const { isSignedIn, user, isLoading } = useUser();

  // Return all three states: loading, signed-in status, and user
  return { isSignedIn, user, isLoading };
};

export default useAuth;
