import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
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

  const {
    data: policyCount,
    isLoading: isLoadingCount,
    error: errorCount,
  } = useGetPolicyCountQuery();

  const [deletePolicy, { isLoading: loadingDelete }] =
    useDeletePolicyMutation();

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

  const [createPolicy, { isLoading: loadingCreate }] =
    useCreatePolicyMutation();

  const createPolicyHandler = async () => {
    if (
      window.confirm('Are you sure you want to create a new Insurance Policy?')
    ) {
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
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <Link to='/PolicyListScreen'>
          <Button variant='primary' style={{ marginRight: '10px' }}>
            View Offers
          </Button>
        </Link>
        <Link to='/'>
          <Button variant='primary'>View Claims</Button>
        </Link>
      </div>

      <Row className='align-items-center'>
        <Col>
          <h1>Our Policies</h1>
          {isLoadingCount ? (
            <p>Loading policy count...</p>
          ) : errorCount ? (
            <Message variant='danger'>{errorCount.data.message}</Message>
          ) : (
            <p>Total Policies: {policyCount || 0}</p>
          )}
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
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Terms</th>
                <th>Management</th>
              </tr>
            </thead>
            <tbody>
              {data && data.policies.length > 0 ? (
                data.policies.map((policy) => (
                  <tr key={policy._id}>
                    <td>{policy._id}</td>
                    <td>{policy.name}</td>
                    <td>${policy.price}</td>
                    <td>{policy.type}</td>
                    <td>{policy.terms}</td>
                    <td>
                      <LinkContainer to={`/admin/Policy/${policy._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(policy._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6'>No insurance policies found</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isPolicy={true} />
        </>
      )}
    </div>
  );
};

export default InsuranceHome;