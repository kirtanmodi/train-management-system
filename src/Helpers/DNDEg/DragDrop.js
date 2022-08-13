import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Comp from "./Comp";

const List = [
  {
    id: 1,
    item: "eat",
  },
  {
    id: 2,
    item: "cook",
  },
  {
    id: 3,
    item: "buy",
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pList = List.filter((o) => id === o.id);
    setBoard((board) => [...board, pList[0]]);
  };

  return (
    <>
      <div className="Pics">
        {List.map((i) => {
          return <Comp key={i.id} item={i.item} id={i.id} />;
        })}
      </div>
      <div
        ref={drop}
        style={{
          width: "300px",
          height: "500px",
          border: "2px solid black",
          display: "flex",
          gap: "10px",
          padding: "10px",
          flexWrap: "wrap",
        }}
        className="Board"
      >
        {board.map((i) => {
          return (
            <div
              style={{
                height: "fit-content",
              }}
              key={i.id}
            >
              {i.item}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DragDrop;
