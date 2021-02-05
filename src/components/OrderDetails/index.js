import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "./../../redux/Orders/orders.actions";
import globalStyles from "./../../globalStyles";
import "./styles.scss";

const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Namn",
  },
  {
    id: "productPrice",
    label: "Pris",
  },
  {
    id: "quantity",
    label: "Antal",
  },
];

const styles = {
  width: "10%",
  fontFamily: globalStyles.fontFamily,
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `${columnValue} SEK`;
    case "productThumbnail":
      return <img src={columnValue} alt="productThumb" width={250} />;
    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, [dispatch]);

  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableBody>
            {Array.isArray(orderItems) &&
              orderItems.length > 0 &&
              orderItems.map((row, pos) => {
                return (
                  <TableRow key={pos}>
                    {columns.map((col, pos) => {
                      const columnName = col.id;
                      const columnValue = row[columnName];

                      return (
                        <TableCell key={pos} style={styles}>
                          {formatText(columnName, columnValue)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderDetails;
