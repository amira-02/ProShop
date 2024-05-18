import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductByuserIdQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetProductCountQuery,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber = 1, user } = useParams();  // Utilisation de valeurs par défaut
  console.log("Page Number:", pageNumber);
  console.log("User ID:", user);

  const { data, isLoading, error, refetch } = useGetProductByuserIdQuery({
    user: user || '',  // Utilisation de valeurs par défaut pour éviter undefined
    pageNumber,
  });

  const {
    data: productCount,
    isLoading: isLoadingCount,
    error: errorCount,
  } = useGetProductCountQuery();

  console.log("Data:", data);

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading || loadingCreate || loadingDelete) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error.data?.message || error.message}</Message>;
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
          {isLoadingCount ? (
            <p>Loading product count...</p>
          ) : errorCount ? (
            <Message variant='danger'>{errorCount.data.message}</Message>
          ) : (
            <p>Total Products: {productCount || 0}</p>
          )}
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.length > 0 ? (
            data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/ShopOwners/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate pages={data?.pages || 1} page={data?.page || 1} isAdmin={true} />
    </>
  );
};

export default ProductListScreen;
