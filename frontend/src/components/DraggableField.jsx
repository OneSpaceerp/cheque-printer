import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableField = ({ id, initialPosition, children, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute',
        top: initialPosition.y,
        left: initialPosition.x,
      }
    : {
        position: 'absolute',
        top: initialPosition.y,
        left: initialPosition.x,
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onSelect}>
      {children}
    </div>
  );
};

export default DraggableField;
