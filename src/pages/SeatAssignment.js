import React from "react";
import { DndProvider } from "react-dnd";
import TrainAssignmentTables from "../Components/TrainAssignmentTables";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "../Helpers/DNDEg/DragDrop";

function SeatAssignment() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        marginTop: "10px",
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <TrainAssignmentTables />
        {/* <DragDrop /> */}
      </DndProvider>
      {/* <Bucket /> */}
    </div>
  );
}

export default SeatAssignment;
