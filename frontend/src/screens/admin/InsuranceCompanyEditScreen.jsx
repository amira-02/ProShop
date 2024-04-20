import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetInsuranceCompanyDetailsQuery,
  useUpdateInsuranceCompanyMutation,
  useUploadInsuranceCompanyImageMutation,
} from '../../slices/InsuranceCompanyApiSlice'; // Import des hooks pour la gestion des compagnies d'assurance

const InsuranceCompanyEditScreen = () => {
  const { id: companyId } = useParams(); // Récupération de l'ID de la compagnie d'assurance

  // États pour stocker les informations de la compagnie d'assurance
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');

  // Hook pour récupérer les détails de la compagnie d'assurance
  const {
    data: company,
    isLoading,
    refetch,
    error,
  } = useGetInsuranceCompanyDetailsQuery(companyId);

  // Hook pour mettre à jour la compagnie d'assurance
  const [updateCompany, { isLoading: loadingUpdate }] =
    useUpdateInsuranceCompanyMutation();

  // Hook pour télécharger l'image de la compagnie d'assurance
  const [uploadCompanyImage, { isLoading: loadingUpload }] =
    useUploadInsuranceCompanyImageMutation();

  const navigate = useNavigate();

  // Fonction pour soumettre le formulaire de mise à jour de la compagnie d'assurance
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCompany({
        companyId,
        name,
        email,
        address,
        contact,
        // image,
      }).unwrap(); // NOTE: ici nous devons déballer la Promise pour capturer toute erreur dans notre bloc catch
      toast.success('Company updated');
      refetch();
      navigate('/admin/companylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Effet pour mettre à jour les états lorsque les données de la compagnie d'assurance changent
  useEffect(() => {
    if (company) {
      setName(company.name);
      setEmail(company.email);
      setAddress(company.address);
      setContact(company.contact);
      // setImage(company.image);
    }
  }, [company]);

  // Fonction pour gérer le téléchargement de l'image de la compagnie d'assurance
  // const uploadFileHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   try {
  //     const res = await uploadCompanyImage(formData).unwrap();
  //     toast.success(res.message);
  //     setImage(res.image);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  return (
    <>
      <Link to='/admin/companylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Company</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* Formulaires pour les détails de la compagnie d'assurance */}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='contact'>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter contact'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group> */}

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default InsuranceCompanyEditScreen;
