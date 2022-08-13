import Card from "@mui/material/Card";
import Papa from "papaparse";
import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCSVFile,
  setTrainColumns,
  setTrainCompartments,
  setTrainRows,
  setBookingArr,
} from "../redux/mainSlice";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export default function BasicCard() {
  let navigate = useNavigate();
  const { trainRows, trainColumns, trainCompartments, csvFile } = useSelector(
    (state) => ({
      trainRows: state.trainRows,
      trainColumns: state.trainColumns,
      trainCompartments: state.trainCompartments,
      csvFile: state.csvFile,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [trainRowsState, setTrainRowsState] = useState(trainRows);
  const [trainColumnsState, setTrainColumnsState] = useState(trainColumns);
  const [trainCompartmentsState, setTrainCompartmentsState] =
    useState(trainCompartments);
  const [csvState, setCsvState] = useState(csvFile);

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!csvState) return console.log("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      dispatch(setCSVFile(csv));

      const bookingArr = csv.data.map((i) => {
        return i["Booking #"];
      });
      dispatch(setBookingArr(bookingArr));
      //   console.log(csvFile);
    };
    reader.readAsText(csvState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setTrainRows(4));
    dispatch(setTrainColumns(15));
    dispatch(setTrainCompartments(trainCompartmentsState));
    handleParse();
    navigate("/seat-assignment");
  };

  const handleFileChange = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        // setError("Please input a csv file");
        console.log("invalid file type");
        return;
      }

      // If input type is correct set the state
      setCsvState(inputFile);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "2px 5px 7px 0.3px #D9DADE",
      }}
    >
      <h1>Train Management System</h1>
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Enter Train Rows</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Train Rows"
            value={trainRowsState}
            onChange={(e) => setTrainRowsState(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Train Columns</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Train Columns"
            value={trainColumnsState}
            onChange={(e) => setTrainColumnsState(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Train Compartments</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Train Compartments"
            value={trainCompartmentsState}
            onChange={(e) => setTrainCompartmentsState(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload CSV file</Form.Label>
          <Form.Control
            type="file"
            // value={csvState}
            onChange={(e) => handleFileChange(e)}
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Start Seat Assignment
        </Button>
      </Form>
    </Card>
  );
}
