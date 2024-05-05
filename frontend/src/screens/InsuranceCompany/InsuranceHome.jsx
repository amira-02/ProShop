import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const InsuranceHome = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const { data: Policies, refetch, isLoading, error } = useGetUsersQuery();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Exemple de données pour les colonnes et les lignes
  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'startDate', label: 'Start Date', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
  ];

  // Exemple de données de politique
  const policies = [
    { name: 'Policy 1', price: 100, startDate: '2022-05-01', type: 'Health' },
    { name: 'Policy 2', price: 200, startDate: '2022-06-01', type: 'Auto' },
    // Ajoutez d'autres politiques au besoin
  ];

  return (
    <div>
      <h1>Welcome to Insurance Company Screen</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link to="/PolicyListScreen">
          <Button variant="primary" style={{ marginRight: '10px' }}>View Offers</Button>
        </Link>
        <Link to="/">
          <Button variant="success">View Claims</Button>
        </Link>
      </div>
      
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {policies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((policy, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = policy[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={policies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default InsuranceHome;
