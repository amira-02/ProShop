import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import refrigatorImg  from '../assets/picthree.png';
import earphone from '../assets/earphone.png';
import phone from '../assets/phone.png'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
// import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import InsuranceHome from '../screens/InsuranceCompany/InsuranceHome';
import ProductListScreen from '../screens/ShopOwners/ProductListScreen.jsx';
// import ProductEditScreen from '../screens/ShopOwners/ProductEditScreen.jsx';
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  switch (userInfo?.Type) {
    case 'admin':
    case 'repairer':  
    case 'insurance':
      return <InsuranceHome />;
    case 'shop':
      return <ProductListScreen/>  
      // return <ProductEditScreen/>
    default:
      return (
        <>
          {/* {!keyword ? (
            <ProductCarousel />
          ) : ( */}
            <Link to='/' className='btn btn-light mb-4'>
              Go Back
            </Link>
          {/* )} */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <Meta />
               <p className='jura-text' style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}>Shop Collection</p>
               <Row style={{  padding: '60px',   }}>
                  <Col md={6} className="d-flex flex-column align-items-center justify-content-end" style={{ padding: '70px', backgroundColor: '#F3F5F7'}}>
                     <img src={refrigatorImg}alt='YourImage'style={{maxWidth: '100%', height: 'auto',maxHeight: '400px',padding: '10px',}}/>
                      <p className='jura-text' style={{ fontSize: '20px', fontWeight: '599', color: 'black', textAlign: 'right' }}>Home Appliance</p>
                      <p className='jura-text' style={{ fontSize: '15px', fontWeight: '599', textDecoration: 'underline' ,color: 'black' }}>Collection<span>&rarr;</span></p>
                  </Col>
                  <Col md={6} style={{  padding: '30px' }}>
                      {/* smart phone */}
                      <Row style={{ padding: '30px', backgroundColor: '#F3F5F7', margin: '5px', backgroundImage: `url(${phone})`, backgroundSize: 'cover', backgroundPosition: 'center' ,  height: '300px' }}>
                      <Col md={6} className="d-flex flex-column justify-content-end">
                            <div>
                              <p className='jura-text' style={{ fontSize: '20px', fontWeight: '599', color: 'black' }}>Smart Phones</p>
                              <p className='jura-text' style={{ fontSize: '15px', fontWeight: '599', textDecoration: 'underline', color: 'black' }}>Collection<span>&rarr;</span></p>
                            </div>
                          </Col>
                        </Row>
                        {/* earphone */}
                        <Row style={{ padding: '30px', backgroundColor: '#F3F5F7', margin: '5px', backgroundImage: `url(${earphone})`, backgroundSize: 'cover', backgroundPosition: 'center' ,  height: '300px' }}>
                        <Col md={6} className="d-flex flex-column justify-content-end">
                          <div>
                            <p className='jura-text' style={{ fontSize: '20px', fontWeight: '599', color: 'black' }}>Smart Phones</p>
                            <p className='jura-text' style={{ fontSize: '15px', fontWeight: '599', textDecoration: 'underline', color: 'black' }}>Collection<span>&rarr;</span></p>
                          </div>
                        </Col>
                      </Row>
                </Col>
               </Row>     

              <h1>Latest Products</h1>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </>
          )}
        </>
      );
  }
};

export default HomeScreen;
