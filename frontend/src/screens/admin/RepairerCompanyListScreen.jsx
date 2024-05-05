import React from 'react';
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
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const RepairerCompanyListScreen = () => {
  const { pageNumber } = useParams();

  const { data: repairerCompaniesData, isLoading, error, refetch } = useGetRepairerCompanyQuery({
    pageNumber,
  });

  const { data: usersData } = useGetUsersQuery();

  const [deleteRepairerCompany, { isLoading: loadingDelete }] = useDeleteRepairerCompanyMutation();

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

  const [createRepairerCompany, { isLoading: loadingCreate }] = useCreateRepairerCompanyMutation();

  const createRepairerCompanyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Repairer Company?')) {
      try {
        await createRepairerCompany();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Filtrer les utilisateurs de type "Repairer"
  const repairers = usersData?.filter(user => user.type === 'repairer') || [];

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
              {repairers.map((repairer) => (
                <tr key={repairer._id}>
                  <td>{repairer._id}</td>
                  <td>{repairer.name}</td>
                  <td>{repairer.address}</td>
                  <td>{repairer.email}</td>
                  <td>{repairer.password}</td>
                  <td>{repairer.contact}</td>
                  <td>
                    <LinkContainer to={`/admin/RepairerCompany/${repairer._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(repairer._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={repairerCompaniesData.pages} page={repairerCompaniesData.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default RepairerCompanyListScreen;
