import styled from "@emotion/styled";
import { parse } from "papaparse";
import React, { memo, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicList from "../Helpers/BasicList";
import { setSeatSelected } from "../redux/mainSlice";

const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");

function TrainAssignmentTables() {
  const dispatch = useDispatch();
  const {
    trainRows,
    trainColumns,
    trainCompartments,
    csvFile,
    bookingArr,
    seatSelected,
  } = useSelector(
    (state) => ({
      trainRows: state.trainRows,
      trainColumns: state.trainColumns,
      trainCompartments: state.trainCompartments,
      csvFile: state.csvFile,
      bookingArr: state.bookingArr,
      seatSelected: state.seatSelected,
    }),
    shallowEqual
  );

  const trainSeatNoArray = Array.from(
    { length: trainColumns },
    (_, index) => index + 1
  );

  const [bookingId, setBookingId] = useState("");

  const [unAssignedBookingIds, setUnAssignedBookingIds] = useState(bookingArr);

  const [assignedSeats, setAssignedSeats] = useState(
    Array.from({ length: trainColumns * trainRows }, (_, index) => index + 1)
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => setBookingId(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const handleDrop = () => {
      setAssignedSeats((prev) => {
        const newArr = [...prev];
        newArr[seatSelected - 1] = bookingId;
        return newArr;
      });
    };
    if (bookingId === "") return;
    handleDrop();
  }, [bookingId]);

  const handleSeatClick = (event) => {
    dispatch(setSeatSelected(parseInt(event.target.innerText)));
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexDirection: "column",
          //   alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            position: "relative",
            left: "1.2%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "10px",
            fontWeight: "500",
            fontSize: "2rem",
          }}
        >
          {trainSeatNoArray.map((seat, idx) => {
            return <span key={idx}>{seat}</span>;
          })}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <div
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignContent: "space-around",
              gap: "20px",
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "2.2rem",
            }}
          >
            {alphabetArray.slice(0, trainRows).map((letter, idx) => {
              return <div key={idx}>{letter}</div>;
            })}
          </div>
          <TrainChart ref={drop} column={trainColumns} rows={trainRows}>
            {assignedSeats.map((seat, id) => {
              let seatColor;

              if (id + 1 === seatSelected) {
                seatColor = "green";
              } else {
                seatColor = "aliceblue";
              }
              return (
                <Seats
                  onClick={(e) => handleSeatClick(e)}
                  bgColor={seat.length > 2 ? "orange" : seatColor}
                  key={id}
                  fontS={seat.length > 2 ? "0.9em" : "1em"}
                  fontW={seat.length > 2 ? "700" : null}
                >
                  {seat}
                </Seats>
              );
            })}
          </TrainChart>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          marginTop: "20px",
        }}
      >
        <BasicList unAssignedBookingIds={unAssignedBookingIds} />
      </div>
    </>
  );
}

export default TrainAssignmentTables;

const TrainChart = styled.div((props) => ({
  minHeight: "400px",
  maxHeight: "300px",
  minWidth: "90%",
  maxWidth: "80%",
  backgroundColor: "lightgrey",
  padding: "10px",
  display: "grid",
  gap: "20px",
  gridTemplateColumns: `repeat(${props.column}, 1fr)`,
  gridTemplateRows: `repeat(${props.rows}, 1fr)`,
}));

const Seats = styled.div((props) => ({
  //   minHeight: "10%",
  //   minWidth: "10%",
  //   maxHeight: "300px",
  //   maxWidth: "70px",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  backgroundColor: props.bgColor,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontSize: props.fontS,
  fontWeight: props.fontW,
}));
