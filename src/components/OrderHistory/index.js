import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import globalStyles from "./../../globalStyles";
import "./styles.scss";

const columns = [
  {
    id: "orderCreatedDate",
    label: "Orderdatum",
  },
  // {
  //   id: "documentID",
  //   label: "Ordernummer",
  // },
  {
    id: "orderTotal",
    label: "Summa",
  },
];

const styles = {
  cursor: "pointer",
  width: "10%",
  fontFamily: globalStyles.fontFamily,
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `${columnValue}:-`;
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

const OrderHistory = ({ orders }) => {
  const history = useHistory();

  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, pos) => {
                const { label } = column;

                return (
                  <TableCell key={pos} style={styles}>
                    {label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((row, pos) => {
                const { documentID } = row;

                return (
                  <TableRow
                    key={pos}
                    onClick={() => history.push(`/order/${documentID}`)}
                  >
                    {columns.map((column, pos) => {
                      const columnName = column.id;
                      const columnValue = row[columnName];
                      const formattedText = formatText(columnName, columnValue);

                      return (
                        <TableCell key={pos} style={styles}>
                          {formattedText}
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

export default OrderHistory;
