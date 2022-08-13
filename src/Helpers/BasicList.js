import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import DragComp from "./DragComponents";

export default function BasicList({ unAssignedBookingIds }) {
  //   const { trainRows, trainColumns, trainCompartments, csvFile, bookingArr } =
  //     useSelector(
  //       (state) => ({
  //         trainRows: state.trainRows,
  //         trainColumns: state.trainColumns,
  //         trainCompartments: state.trainCompartments,
  //         csvFile: state.csvFile,
  //         bookingArr: state.bookingArr,
  //       }),
  //       shallowEqual
  //     );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        border: "2px solid black",
      }}
    >
      <List>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Booking #
          </span>
        </ListItem>
        {unAssignedBookingIds.map((i, id) => {
          return <DragComp key={id} item={i} id={id} />;
        })}
        <Divider />
      </List>
    </Box>
  );
}
