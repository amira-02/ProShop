import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetInsuranceCompanyQuery,
  useDeleteInsuranceCompanyMutation,
  useCreateInsuranceCompanyMutation,
} from '../../slices/InsuranceCompanyApiSlice';
import { toast } from 'react-toastify';

const InsuranceCompanyListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetInsuranceCompanyQuery({
    pageNumber,
  });

  const [deleteInsuranceCompany, { isLoading: loadingDelete }] =
    useDeleteInsuranceCompanyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteInsuranceCompany(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createInsuranceCompany, { isLoading: loadingCreate }] =
    useCreateInsuranceCompanyMutation();

  const createInsuranceCompanyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Insurance Company?')) {
      try {
        await createInsuranceCompany()
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Insurance Company</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createInsuranceCompanyHandler}>
            <FaPlus /> Create Insurance Company
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
                <th>ADDRESS</th>
                <th>EMAIL</th>
                <th>CONTACT</th>
                <th>PASSWORD</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.InsuranceCompany.map((insuranceCompany) => (
                <tr key={insuranceCompany._id}>
                  <td>{insuranceCompany._id}</td>
                  <td>{insuranceCompany.name}</td>
                  <td>{insuranceCompany.address}</td>
                  <td>{insuranceCompany.email}</td>
                  <td>{insuranceCompany.password}</td>
                  <td>{insuranceCompany.contact}</td>
                  <td>
                    <LinkContainer to={`/admin/InsuranceCompany/${insuranceCompany._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(insuranceCompany._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default InsuranceCompanyListScreen;
