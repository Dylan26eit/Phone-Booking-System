// DropZone.js
import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

function DropZone({ onDrop, acceptedTypes, currentItem, label }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: acceptedTypes, // ['phone'] or ['charger']
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;
  const backgroundColor = isActive ? '#f0f0f0' : '#e0e0e0';

  const dropZoneStyle = {
    border: '2px dashed gray',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: backgroundColor,
    minHeight: '60px',
  };

  return (
    <div ref={drop} style={dropZoneStyle}>
      {currentItem ? `${label}: ${currentItem.name}` : `Drop ${label} Here`}
      {isActive && <div>Release to drop</div>}
    </div>
  );
}

DropZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  acceptedTypes: PropTypes.array.isRequired,
  currentItem: PropTypes.object,
  label: PropTypes.string.isRequired,
};

export default DropZone;
