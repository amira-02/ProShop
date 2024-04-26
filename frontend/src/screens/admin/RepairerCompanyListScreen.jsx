import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetRepairerCompanyQuery,
  useDeleteRepairerCompanyMutation,
  useCreateRepairerCompanyMutation,
} from '../../slices/RepairerCompanyApiSlice';
import { toast } from 'react-toastify';

const RepairerCompanyListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetRepairerCompanyQuery({
    pageNumber,
  });

  const [deleteRepairerCompany, { isLoading: loadingDelete }] =
    useDeleteRepairerCompanyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteRepairerCompany(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createRepairerCompany, { isLoading: loadingCreate }] =
    useCreateRepairerCompanyMutation();

  const createRepairerCompanyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Repairer Company?')) {
      try {
        await createRepairerCompany()
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
          <h1>Repairer Company</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createRepairerCompanyHandler}>
            <FaPlus /> Create Repairer Company
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
              {data.RepairerCompany.map((RepairerCompany) => (
                <tr key={RepairerCompany._id}>
                  <td>{RepairerCompany._id}</td>
                  <td>{RepairerCompany.name}</td>
                  <td>{RepairerCompany.address}</td>
                  <td>{RepairerCompany.email}</td>
                  <td>{RepairerCompany.password}</td>
                  <td>{RepairerCompany.contact}</td>
                  <td>
                    <LinkContainer to={`/admin/RepairerCompany/${RepairerCompany._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(RepairerCompany._id)}
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

export default RepairerCompanyListScreen;
