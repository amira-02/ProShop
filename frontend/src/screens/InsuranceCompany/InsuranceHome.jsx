import { Link } from 'react-router-dom';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

import {
  useGetPolicyByCompanyIdQuery,
  useCreatePolicyMutation,
  useDeletePolicyMutation,
} from '../../slices/PolicyApiSlice';

const InsuranceHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pageNumber } = useParams();
  const companyId = userInfo._id;

  const { data, isLoading, error, refetch } = useGetPolicyByCompanyIdQuery({
    companyId,
    pageNumber,
  });

  const [deletePolicy, { isLoading: loadingDelete }] =
    useDeletePolicyMutation();
  const [createPolicy, { isLoading: loadingCreate }] =
    useCreatePolicyMutation();

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
                <th>End Date</th>
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
                    <td>{new Date(policy.EndDate).toLocaleDateString()}</td>
                    <td>{policy.type}</td>
                    <td>{policy.terms}</td>
                    <td>
                      <LinkContainer
                        to={`/InsuranceCompany/Policy/${policy._id}/edit`}
                      >
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
                  <td colSpan='7'>No insurance policies found</td>
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