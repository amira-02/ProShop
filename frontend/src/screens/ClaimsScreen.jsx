import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useGetClaimsByUserIdQuery } from '../slices/ClaimApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ClaimsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const { data: Aclaims, isLoading, isError, error } = useGetClaimsByUserIdQuery({ userId });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Message variant="danger">{error.message}</Message>;
  }

  return (
    <>
      <h1>Claims</h1>
      <p>user: {userId} / {userInfo.name}</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Order</th>
            <th>Index Product</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {Aclaims.claims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim._id}</td>
              <td>{claim.Order}</td>
              <td>{claim.indexProduct}</td>
              <td>{claim.description}</td>
              <td>{claim.status}</td>
              <td>{claim.createdAt}</td>
              <td>{claim.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ClaimsScreen;