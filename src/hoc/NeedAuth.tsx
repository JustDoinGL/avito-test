// import { FC, ReactElement } from "react";
// import { useLocation, Navigate } from "react-router-dom";
// import { useAppSelector } from "../hooks/redux";
// import { getRegistrationSelector } from "../redux/registration/selector";

// interface NeedAuthProps {
//   children: ReactElement;
// }

// const NeedAuth: FC<NeedAuthProps> = ({ children }) => {
//   const location = useLocation();
//   const { token } = useAppSelector(getRegistrationSelector);

//   if (token) {
//     return <Navigate to="/catalog" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export { NeedAuth };

export {};
