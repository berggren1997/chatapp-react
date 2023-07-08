import { useEffect, useState } from "react";
import { meRequest } from "../api/auth/me";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticatedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const fetchUserInfo = async () => {
    await meRequest()
      .then(({ username }) => {
        setCurrentUser(username);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!currentUser)
    return <Navigate to="login" state={{ from: location }} replace />;

  return <>{children}</>;
};

export default AuthenticatedRoute;
