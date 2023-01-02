import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { setAuthHeader, TOKEN_KEY } from "../apis/auth";
import userApi from "../apis/user";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  const getCurrentUser = async () => {
    const data = await userApi.getCurrentUser();
    setUser(data);
    setLoadingInitial(false);
  };

  const signIn = async (username, password) => {
    try {
      setLoading(true);
      const data = await userApi.signIn(username, password);
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      setSignInSuccess(true);
      setLoading(false);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid username or password!',
      })
      await setError(error);
      await setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  };

  useEffect(() => {
    setAuthHeader();
    getCurrentUser();
  }, [signInSuccess]);

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      loadingInitial,
      error,
      signIn,
      // signUp,
      logout,
    }),
    [user, loading, loadingInitial, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
