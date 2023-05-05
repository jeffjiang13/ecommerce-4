import { useState, useEffect } from 'react'; // Add missing imports

import { getUserById } from '../services/UserServices';

const useGetUserRole = (userId) => {

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isAdmin') === 'true') {
            setAdmin(true);
        } else if (localStorage.getItem('isAdmin') === 'false') {
            setAdmin(false);
        } else {
            getUserById(userId)
                .then((result) => {
                    setAdmin(result.user.admin);
                });
        }
    }, [userId]);

    return [admin];
}

export default useGetUserRole;
