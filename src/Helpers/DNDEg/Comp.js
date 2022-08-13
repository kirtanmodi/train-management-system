import React from "react";
import { useDrag } from "react-dnd";

function Comp({ id, item }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: id,
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      draggable={true}
      style={{
        border: isDragging ? "5px solid pink" : "3px solid orange",
      }}
      //   key={i.id}
    >
      {item}
    </div>
  );
}

export default Comp;
