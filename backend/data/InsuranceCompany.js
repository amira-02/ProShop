import bcrypt from 'bcryptjs';

const InsuranceCompany = [
    
{
  name: "insuranceCompany1",
  adress: "adress",
  email: "company@gmail.com",
  password:bcrypt.hashSync("Mot de passe", 10),
  contact: "Numéro de contact"
  }
];
 
export default InsuranceCompany;