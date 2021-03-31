import { useCallback, useState } from "react";
import { useFetch } from "./useFetch";

export const useShifts = () => {
  const [users, setUsers] = useState([]);
  const [shifts, setShifts] = useState([]);

  const { fetchHandler } = useFetch();

  const getUsers = useCallback(() => {
    fetchHandler("/users/allUsers")
      .then((res) => {
        setShifts(null);
        setUsers(res.users);
      })
      .catch((err) => console.log(err));
  }, [fetchHandler]);

  const getUserShifts = useCallback(
    (userId) => {
      fetchHandler("/users/user/" + userId)
        .then((res) => {
          setUsers(null);
          setShifts(res.shifts);
        })
        .catch((err) => console.log(err));
    },
    [fetchHandler]
  );

  return { getUserShifts, getUsers, shifts, users };
};
