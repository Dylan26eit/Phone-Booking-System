// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

function DraggableItem({ item, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type, // 'phone' or 'charger'
    item: { id: item.id, type: type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const itemStyle = {
    border: '1px solid gray',
    borderRadius: '4px',
    padding: '8px',
    margin: '4px',
    backgroundColor: 'white',
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={drag} style={itemStyle}>
      {item.name} (${item.bond})
    </div>
  );
}

DraggableItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default DraggableItem;
