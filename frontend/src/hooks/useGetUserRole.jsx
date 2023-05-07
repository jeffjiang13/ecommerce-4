import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

import { getUserById } from '../services/UserServices';

const useGetUserRole = (userId) => {
  const [admin, setAdmin] = useLocalStorage('admin', false);

  useEffect(() => {
    getUserById(userId).then((result) => {
      setAdmin(result.user.admin);
    });
  }, [userId, setAdmin]);

  return [admin];
};

export default useGetUserRole;
