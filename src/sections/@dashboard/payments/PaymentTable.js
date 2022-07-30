/* eslint-disable camelcase */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
// material
import Table from '@mui/material/Table';
import Checkbox from '@mui/material/Checkbox'; 
import TableRow from '@mui/material/TableRow'; 
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
// components
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import PaymentListHead  from './PaymentListHead';
import PaymentMoreMenu  from './PaymentMoreMenu';

// function
import { getPaymentRefundedColor, getPlanColor} from '../../../utils/getColor'
import {getAllPayments, getUserProjectPayments} from '../../../services/api/payment'
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sender', label: 'Owner', alignRight: false },
  { id: 'project', label: 'Project', alignRight: false },
  { id: 'plan', label: 'Plan', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'method', label: 'Method', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'refunded', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_project) => _project.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

PaymentTable.propTypes = {
    queryString: PropTypes.string,
    userComp : PropTypes.bool,
    projectId: PropTypes.string
}

export default function PaymentTable({queryString, userComp, projectId}) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [payments, setPayments] = useState([])

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (queryString) {
        fetchPayments(queryString)
    }
    else {
        fetchPayments()
    }
  }, [])

  
  const fetchPayments = (queryString) => {
     setLoading(true)
     setTimeout(() => {
      if (userComp && projectId) {
        getUserProjectPayments(projectId).then(result => {
          setLoading(false)
          if (!result.ok) {
            return
          }
          console.log(result.data)
          setPayments(result.data)
        }).catch(() => setLoading(false))
       }
       else {
        getAllPayments(queryString).then(result => {
          setLoading(false)
          if (!result.ok) {
            return
          }
          setPayments(result.data)
        }).catch(() => setLoading(false))
       }
     }, 2000);
  }
  const handlePaymentSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = payments?.map((n) => n?.sender.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments?.length) : 0;

  const filteredPayments = applySortFilter(payments, getComparator(order, orderBy), filterName);

  const isPaymentNotFound = filteredPayments?.length === 0;

  return (
    <>
      <Container>      
        <Card>
        {loading && <LinearProgress />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PaymentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={payments?.length}
                  numSelected={selected?.length}
                  onPaymentSort={handlePaymentSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredPayments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { id, project:{name, plan}, amount, refunded, sender, method, createdAt } = row;
                    const isItemSelected = selected?.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell align="left">
                            {sender?.name}
                        </TableCell>
                        <TableCell align="left">
                            {name}
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color='info' >
                            {plan}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost">
                            {fDateTime(createdAt)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color='warning' >
                            {method}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color='secondary'>
                            {amount}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getPaymentRefundedColor(refunded)}>
                            {refunded ? 'Refunded' : 'Paid'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <PaymentMoreMenu payment={row} onFetchPayments={fetchPayments} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isPaymentNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={payments?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}


