import { ListItem, ListItemButton } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";

function DragComp({ id, item }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: item,
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem
      selected={isDragging}
      sx={{
        border: isDragging ? "5px solid pink" : "0px",
      }}
    >
      <ListItemButton
        divider={true}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span ref={drag} draggable={true}>
          {item}
        </span>
      </ListItemButton>
    </ListItem>
  );
}

export default DragComp;
