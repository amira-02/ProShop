import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useGetClaimsByUserIdQuery } from '../slices/ClaimApiSlice';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';

const ClaimsScreen = () => {
  const { pageNumber } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const { data: claims, isLoading, isError } = useGetClaimsByUserIdQuery({ userId, pageNumber });

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <h1>My Claims</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>Failed to fetch claims. Please try again later.</Message>
      ) : (
        <>
          {claims && Array.isArray(claims) && claims.length === 0 ? (
            <Message>No claims found.</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order</th>
                  <th>Index Product</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims && Array.isArray(claims) ? (
                  claims.map((claim) => (
                    <tr key={claim._id}>
                      <td>{claim._id}</td>
                      <td>{claim.Order}</td>
                      <td>{claim.indexProduct}</td>
                      <td>{claim.description}</td>
                      <td>{claim.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No claims found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default ClaimsScreen;
