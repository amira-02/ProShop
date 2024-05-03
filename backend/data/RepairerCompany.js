import bcrypt from 'bcryptjs';

const RepairerCompany = [
  {
    name: 'Repairer 1',
    address: 'Address 1',
    email: 'repairer1@example.com',
    password: bcrypt.hashSync('123456', 10),
    contact: '1234567890',
  },
  {
    name: 'Repairer 2',
    address: 'Address 2',
    email: 'repairer2@example.com',
    password: bcrypt.hashSync('123456', 10),
    contact: '9876543210',
  },
  {
    name: 'Repairer 3',
    address: 'Address 3',
    email: 'repairer3@example.com',
    password: bcrypt.hashSync('123456', 10),
    contact: '4567890123',
  },
];

export default RepairerCompany;
