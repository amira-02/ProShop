import React from 'react';
import { useGetProductCountQuery } from '../slices/productsApiSlice';
import picOne from '../assets/aboutOne.jpeg';
import picTwo from '../assets/aboutTwo.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  // Global settings:
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100,
  delay: 100,
  duration: 800,
  easing: 'ease',
  once: false, // Set to false to repeat animations on each scroll
  mirror: false,
  anchorPlacement: 'top-bottom',
});

const AboutUsScreen = () => {
  const { data: productCount, isLoading, error } = useGetProductCountQuery();

  return (
    <div className='about-us'>
      <div style={{ height: '100px' }}></div>
      <div data-aos='zoom-in-up'>
        <div style={{ textAlign: 'center' }}>
          <div
            data-aos='fade-up'
            data-aos-anchor-placement='center-center'
            data-aos-duration='1500'
          >
            <p
              className='italic-text italiana-font'
              style={{ fontSize: '75px', color: 'black' }}
            >
              fortune favors the insured
            </p>
          </div>

          <p
            className='italic-text italiana-font'
            style={{ fontSize: '50px', color: 'black' }}
          >
            Where wealth meets security
          </p>
          <div>
            <button className='discover-button'>
              <span className='jura-text'>Discover More</span>
            </button>
            <button className='explore-button'>
              <span className='jura-text'>Explore</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: '100px' }}></div>
      <div data-aos='zoom-in-up'>
        <div style={{ backgroundColor: '#D9D9D9' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <img
                  src={picOne}
                  alt='YourImage'
                  style={{ maxWidth: '90%', height: 'auto', padding: '20px' }}
                />
              </div>
              <div className='col-md-6 d-flex align-items-center justify-content-end'>
                <div style={{ textAlign: 'left' }}>
                  <p
                    className='italiana-font'
                    style={{ fontSize: '50px', color: 'black' }}
                  >
                    What We Provide
                  </p>
                  <p
                    className='jura-text'
                    style={{
                      fontSize: '23px',
                      color: 'black',
                      paddingTop: '20px',
                    }}
                  >
                    You'll discover tailored insurance plans designed to keep
                    your electronics safe and secure. From comprehensive
                    coverage against accidents and theft to hassle-free claims
                    processing and 24/7 customer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '100px' }}></div>
      <div data-aos='zoom-in-up'>
        <div>
          <div className='container'>
            <p
              className='italiana-font'
              style={{ fontSize: '61px', color: 'black' }}
            >
              get the right protection to keep moving forward
            </p>
            <div className='row'>
              <div className='col-md-6 d-flex'>
                <div style={{ paddingTop: '20px', textAlign: 'left' }}>
                  <p
                    className='jura-text'
                    style={{
                      fontSize: '25px',
                      color: 'black',
                      marginBottom: '20px',
                      paddingLeft: '20px',
                    }}
                  >
                    We've got you covered. Our comprehensive insurance plans
                    ensure your electronics stay safe from accidents, theft, and
                    damages. Don't let a cracked screen, a power surge, or a
                    misplaced device leave you disconnected. We offer a variety
                    of plans to fit your needs, providing peace of mind and
                    keeping you worry-free.
                  </p>
                </div>
              </div>
              <div
                className='col-md-6'
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '20px',
                }}
              >
                <img
                  src={picTwo}
                  alt='YourImage'
                  style={{
                    maxWidth: '90%',
                    height: 'auto',
                    maxHeight: '400px',
                    padding: '10px',
                    paddingRight: ' 150px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '100px' }}></div>
      <div style={{ borderTop: '1px solid black' }}></div>
      <div style={{ height: '100px' }}></div>
      <div data-aos='zoom-in-up'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <p
                className='italiana-font'
                style={{ fontSize: '30px', color: 'black', fontWeight: '590' }}
              >
                Clients
              </p>
              <p
                className='jura-text'
                style={{ fontSize: '40px', color: 'black' }}
              >
                {error ? (
                  <p className='jura-text'>{error}</p>
                ) : (
                  <p className='jura-text'>
                    {' '}
                    +
                    {isLoading
                      ? 'Loading...'
                      : productCount === -1
                      ? 'No products found'
                      : productCount}
                  </p>
                )}
              </p>
            </div>
            <div className='col-md-4 text-center'>
              <p
                className='italiana-font'
                style={{ fontSize: '30px', color: 'black' }}
              >
                Support
              </p>
              <p
                className='jura-text'
                style={{ fontSize: '40px', color: 'black' }}
              >
                24 hours
              </p>
            </div>
            <div className='col-md-4 text-center'>
              <p
                className='italiana-font'
                style={{ fontSize: '30px', color: 'black' }}
              >
                Claims Processed
              </p>
              <p
                className='jura-text'
                style={{ fontSize: '40px', color: 'black' }}
              >
                50,000+
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '100px' }}></div>
    </div>
  );
};

export default AboutUsScreen;
