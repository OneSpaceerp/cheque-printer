import React from 'react';

const PrintPreview = ({ fields, calibration }) => {
  return (
    <div className="print-preview">
      {Object.entries(fields).map(([id, field]) => {
        const style = {
          position: 'absolute',
          top: `calc(${field.y}px + ${calibration.y}mm)`,
          left: `calc(${field.x}px + ${calibration.x}mm)`,
          fontSize: `${field.fontSize || 16}px`,
          fontWeight: field.fontWeight || 'normal',
          textAlign: field.textAlign || 'left',
          color: 'black',
        };

        return (
          <div key={id} style={style}>
            {field.text}
          </div>
        );
      })}
    </div>
  );
};

export default PrintPreview;
