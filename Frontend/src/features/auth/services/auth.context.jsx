import { createContext, useState} from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getAndSetUser = async () => {
  //       const data = await getUser()
  //       setUser(data.user)
  //       setLoading(false)
  //   }
  //   getAndSetUser()
  // }, [])

//   useEffect(() => {
//   const getAndSetUser = async () => {
//     try {
//       const data = await getUser();

//       if (data && data.user) {
//         setUser(data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       console.log(err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getAndSetUser();
// }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};