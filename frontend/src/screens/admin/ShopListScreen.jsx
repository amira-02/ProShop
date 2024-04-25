import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate'; // Ajout de l'importation du composant Paginate
import {
  useGetShopQuery,
  useDeleteShopMutation,
  useCreateShopMutation,
} from '../../slices/ShopApiSlice';
import { toast } from 'react-toastify';

const ShopListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetShopQuery({
    pageNumber,
  });

  const [deleteShop, { isLoading: loadingDelete }] =
    useDeleteShopMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteShop(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createShop, { isLoading: loadingCreate }] =
    useCreateShopMutation();

    const createShopHandler = async () => {
      console.log('createShopHandler triggered'); // Vérifier si la fonction est déclenchée
      if (window.confirm('Are you sure you want to create a new Shop?')) {
        try {
          // Ajoutez ici les données nécessaires pour créer un nouveau shop
          // console.log('Creating a new shop...'); // Vérifier si la création est déclenchée
          await createShop();
          // console.log(data);
          // console.log('Shop created successfully'); // Vérifier si la création est réussie
          refetch();
        } catch (err) {
          console.error('Error creating shop:', err);
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Shop</h1>
        </Col>
        <Col className='text-end'>
        <Button className='my-3' onClick={createShopHandler}>
  <FaPlus /> Create Shop
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
            {data && data.shops && data.shops.map((shop) => (
    <tr key={shop._id}>
      <td>{shop._id}</td>
      <td>{shop.name}</td>
      <td>{shop.address}</td>
      <td>{shop.email}</td>
      <td>{shop.password}</td>
      <td>{shop.contact}</td>
      <td>
        <LinkContainer to={`/admin/Shop/${shop._id}/edit`}>
          <Button variant='light' className='btn-sm mx-2'>
            <FaEdit />
          </Button>
        </LinkContainer>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(shop._id)}
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

export default ShopListScreen;
