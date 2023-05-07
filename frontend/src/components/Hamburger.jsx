import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { Edit, ExitToApp, Favorite, Inventory, MapsHomeWork, Menu as MenuIcon, Person, Report, ShoppingBag, ShoppingCart } from '@mui/icons-material';

import { getAllGenres } from '../services/GenreServices';
import useGetUserRole from '../hooks/useGetUserRole';
import { useUserContext } from '../contexts/UserContext';
import CategoryMenuItems from './CategoryMenuItems';
import { useBreakpointValue } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

const Hamburger = ({ base, sm, md }) => {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();
    const [admin] = useGetUserRole(currentUser);
    const [genres, setGenres] = useState([]);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

    useEffect(() => {
        getAllGenres()
            .then((result) => {
                setGenres(result.allGenres);
            });
    }, []);

    const onClickLogout = () => {
        removeCookie('currentUser', { path: '/' });
        setCurrentUser('');
        navigate('/login');
    };

    return (
        <Box display={{ base: base, sm: sm, md: md }} p={1} alignItems='center' >
            <Menu >
                <MenuButton
                    as={IconButton}
                    color='facebook.500'
                    fontSize={40}
                    icon={<MenuIcon fontSize='40px' />}
                    variant='ghost'
                    maxWidth='50px'
                />
                <MenuList
                    width={isMobile ? '100vw' : 'auto'}
                    zIndex={200}
                    maxHeight={isMobile ? '80vh' : 'auto'}
                    overflowY={isMobile ? 'scroll' : 'visible'}
                >
                    {
                        admin && currentUser &&
                        <MenuGroup color='facebook.500' fontWeight='bold' title='Admin'>
                            <MenuItem color='facebook.500' onClick={() => navigate('/admin/products')} ><Inventory sx={{ marginRight: 2 }} />Products</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/admin/categories')} ><Edit sx={{ marginRight: 2 }} />Genres and Categories</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/admin/images')} ><MapsHomeWork sx={{ marginRight: 2 }} />Home Page Images</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/admin/reports')} ><Report sx={{ marginRight: 2 }} />Reports</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/admin/orders')} ><ShoppingBag sx={{ marginRight: 2 }} />Orders</MenuItem>
                            <MenuItem color='facebook.500' onClick={onClickLogout} ><ExitToApp sx={{ marginRight: 2 }} />Log out</MenuItem>
                        </MenuGroup>
                    }{
                        !admin && currentUser &&
                        <MenuGroup color='facebook.500' fontWeight='bold' title='Account'>
                            <MenuItem color='facebook.500' onClick={() => navigate('/infos')} ><Person sx={{ marginRight: 2 }} /> My Informations</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/orders')} ><ShoppingBag sx={{ marginRight: 2 }} /> Orders</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/cart')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                            <MenuItem color='facebook.500' onClick={onClickLogout} ><ExitToApp sx={{ marginRight: 2 }} />Log out</MenuItem>
                        </MenuGroup>
                    }{
                        !currentUser &&
                        <MenuGroup>
                            <MenuItem color='facebook.500' onClick={() => navigate('/login')} ><Person sx={{ marginRight: 2 }} />Login</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem>
                            <MenuItem color='facebook.500' onClick={() => navigate('/cart')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                        </MenuGroup>
                    }
                    <MenuDivider />
                    {
                        genres.length > 0 && genres.map((genre) => {
                            return (
                                <MenuGroup fontWeight='bold' color='facebook.500' textDecoration='underline' key={genre._id} title={genre.name}>
                                    <CategoryMenuItems color='black' genreId={genre._id} />
                                </MenuGroup>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Hamburger;
