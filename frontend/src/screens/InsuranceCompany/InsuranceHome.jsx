import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using toast notifications

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

import {
  useGetPolicyQuery,
  useCreatePolicyMutation,
  useDeletePolicyMutation,
  useGetPolicyCountQuery,
} from '../../slices/PolicyApiSlice';

const InsuranceHome = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetPolicyQuery({
    pageNumber,
  });

  const [deletePolicy, { isLoading: loadingDelete }] = useDeletePolicyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePolicy(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createPolicy, { isLoading: loadingCreate }] = useCreatePolicyMutation();

  const createPolicyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Insurance Company?')) {
      try {
        await createPolicy();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <h1>Welcome to Insurance Company Screen</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link to="/PolicyListScreen">
          <Button variant="primary" style={{ marginRight: '10px' }}>
            View Offers
          </Button>
        </Link>
        <Link to="/">
          <Button variant="success">View Claims</Button>
        </Link>
      </div>

      <Row className='align-items-center'>
        <Col>
          <h1>Our Policies</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createPolicyHandler}>
            <FaPlus /> Create Policies
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Price</th>
                <th>Date Start </th>
                <th>Type</th>
                <th>Terms</th>
                <th>Managment</th>
              </tr>
            </thead>
            <tbody>
              {data && data.Policy ? (
                data.Policy.map((Policy) => (
                  <tr key={Policy._id}>
                    <td>{Policy._id}</td>
                    <td>{Policy.name}</td>
                    <td>{Policy.price}</td>
                   
                    <td>{Policy.Type}</td>
                    <td>{Policy.terms}</td>
                   
                    <td>
                      <LinkContainer to={`/admin/Policy/${Policy._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(Policy._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No insurance companies found</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Paginate pages={data?.pages} page={data?.page} isPolicy={true} />
        </>
      )}
    </div>
  );
};

export default InsuranceHome;
