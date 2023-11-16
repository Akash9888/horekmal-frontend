import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Chip,
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderAction";
import Loader from "../components/Loader";

import DeleteIcon from "@mui/icons-material/Delete";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderPage() {
  const dispatch = useDispatch();
  const allOrdersDetails = useSelector((state) => state.allOrdersDetailsR);
  const { loading, orders } = allOrdersDetails;
  console.log(orders);

  const columns = [
    { id: "id", name: "ID" },
    { id: "qty", name: "Number of Products" },
    { id: "orderDate", name: "Date" },
    { id: "isPaid", name: "Payment Status" },
    { id: "isDelivered", name: "Delivery Status" },
    { id: "action", name: "Action" },
  ];
  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  useEffect(() => {
    dispatch(getAllOrders());
    console.log("use effect tiggers from orders page ");
  }, []);

  const handlePayment = () => {};
  const handelCancelOrder = () => {};
  const handleDelete = () => {};
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  return (
    <div className="p-5 text-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" className="mb-3 ">
            My Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} className="text-center">
                      {column.name}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((order) => {
                      return (
                        <StyledTableRow key={order._id}>
                          <StyledTableCell className="text-center">
                            {order._id}
                          </StyledTableCell>
                          <StyledTableCell className="text-center">
                            {order.orderItems.length}
                          </StyledTableCell>
                          <StyledTableCell className="text-center">
                            {new Date(order.orderDate).toLocaleString()}
                          </StyledTableCell>
                          {/* <StyledTableCell>{order.orderDate}</StyledTableCell> */}
                          <StyledTableCell className="text-center">
                            {order.isPaid ? (
                              <Chip label="Paid" color="success" />
                            ) : (
                              <Chip
                                label="Pay Now"
                                variant="outlined"
                                color="warning"
                                onClick={handlePayment}
                              />
                            )}
                          </StyledTableCell>

                          <StyledTableCell className="text-center">
                            {order.isDelivered ? (
                              <Chip label="Delivered" color="success" />
                            ) : (
                              <Chip
                                label="Pending"
                                variant="outlined"
                                color="warning"
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell className="text-center">
                            {order.isPaid ? (
                              <Chip label="Paid" color="success" />
                            ) : (
                              <Tooltip title="Cancel Order">
                                <IconButton size="large" color="denger">
                                  <DeleteIcon onClick={handelCancelOrder} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowperpage}
            page={page}
            count={orders.length}
            component="div"
            onPageChange={handlechangepage}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
        </>
      )}
    </div>
  );
}
