// import { getUsers } from "@/app/async-thunk";
// import { useAppDispatch, useAppSelector } from "@/app/store";
// import { useEffect } from "react";

// export const useLoadingDataUsers = () => {
//   const dispatch = useAppDispatch();
//   const data = useAppSelector((state) => state.users.data);
//   const status = useAppSelector((state) => state.users.status);
//   const error = useAppSelector((state) => state.users.error);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(getUsers());
//     }
//   }, [status, dispatch]);

//   return {
//     data,
//     status,
//     error,
//   };
// };
