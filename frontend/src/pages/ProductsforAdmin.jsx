import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Td, Th, TableContainer, Button, Image, useToast, CircularProgress, useDisclosure } from '@chakra-ui/react';
import { Delete, Edit } from '@mui/icons-material';

import { deleteProduct, getAllProducts } from '../services/ProductServices';
import ProductEditModal from '../components/ProductEditModal';

const ProductsforAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.allProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [setProducts]);

  const onClickEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    onOpen(true);
  };

  const onClickDelete = (id) => {
    deleteProduct(id)
      .then((result) => {
        if (result.status) {
          toast({
            title: 'Error!',
            description: 'Somethings went wrong.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Deleted!',
            description: 'Product succesfully deleted.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
          window.location.reload();

        }
      })
  };

  const onClickAdd = () => {
    setIsEdit(false);
    onOpen(true);
  };

  if (loading) {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' width='100%' minHeight='40vh' >
        <CircularProgress isIndeterminate color='facebook.500' />
      </Box>
    );
  } else {
    return (
      <Box>
        <TableContainer p={3} >
          <Table variant='striped' >
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Color</Th>
                <Th>Gender</Th>
                <Th>Price</Th>
                <Th><Button colorScheme='facebook' onClick={onClickAdd} >Add New</Button></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                products.map((product) => {
                  return (
                    <Tr key={product._id}>
                      <Td><Image width={70} height={85} src={product.imageUrl} /></Td>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.color}</Td>
                      <Td>{product.gender}</Td>
                      <Td>${product.price}</Td>
                      <Td>
                        <Button onClick={() => onClickEdit(product._id)} colorScheme='facebook'><Edit /></Button>
                        <Button onClick={() => onClickDelete(product._id)} bg='whitesmoke' color='facebook.500'><Delete /></Button>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
        <ProductEditModal isOpen={isOpen} onClose={onClose} isEdit={isEdit} currentId={currentId} />
</Box>
)
}
}

export default ProductsforAdmin;
