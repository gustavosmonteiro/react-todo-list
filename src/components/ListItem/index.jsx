import React, { useState } from "react";

// This component is responsible for show, edit, save and delete a list item

export default props => {
  const [itemName, setItemName] = useState("");

  const onToggleItemEditing = () => {
    setItemName(props.item[props.value]);
    props.toggleItemEditing(props.item[props.id]);
  };

  return (
    <div>
      {(!props.item.editing && (
        <div>
          {props.item[props.value]}
          <button onClick={onToggleItemEditing}>Edit</button>
          <button onClick={() => props.deleteItem(props.item[props.id])}>
            Delete
          </button>
        </div>
      )) || (
        <div>
          <input
            type="text"
            value={itemName}
            onChange={event => setItemName(event.target.value)}
          />
          <button onClick={() => props.saveItem(props.item[props.id], itemName)}>
            Save
          </button>
          <button onClick={() => props.toggleItemEditing(props.item[props.id])}>
            Cancel
          </button>
        </div>
      )}
      {props.render && props.render(props.item[props.id])}
    </div>
  );
};
