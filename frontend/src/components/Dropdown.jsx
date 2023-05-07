import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDisclosure, MenuItem, Menu, MenuButton, MenuList, Box } from '@chakra-ui/react';

import { getCategoryByGenre } from '../services/CategoryServices';

const Dropdown = ({ title, genreId }) => {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoryByGenre(genreId)
            .then(result => {
                setCategories(result.category);
            });
    }, [genreId]);

    const handleClick = (categoryId) => {
        navigate('/search', { state: { categoryId: categoryId } });
    };

    return categories.length !== 0 && (
        <Box pe={{ base: 2, md: 10 }}>
            <Menu isOpen={isOpen} >
                <MenuButton
                    color='white'
                    fontSize={20}
                    fontWeight={500}
                    variant='outline'
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    borderBottom='3px solid white'
                    transition={.5}
                    _hover={{ color: 'black', borderBottom: '3px solid #385898' }}
                >{title}<ChevronDownIcon /></MenuButton>
                <MenuList
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    maxHeight="450px" // Set the maxHeight for the MenuList
                    overflowY="scroll" // Enable scrolling when the content overflows maxHeight
                >
                    {
                        categories && categories.map((category) => {
                            return category.status && <MenuItem key={category._id} onClick={() => handleClick(category._id)}>{category.name}</MenuItem>
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Dropdown;
