import React from 'react';

const ControlPanel = ({
  fields,
  onFieldChange,
  selectedField,
  onSelectField,
  calibration,
  onCalibrationChange,
}) => {
  const selectedFieldData = fields[selectedField];

  return (
    <div className="control-panel">
      <h3>Cheque Details</h3>
      {Object.entries(fields).map(([id, field]) => (
        <div key={id} className={`form-group ${selectedField === id ? 'selected' : ''}`} onClick={() => onSelectField(id)}>
          <label>{id}</label>
          <input
            type="text"
            value={field.text}
            onChange={(e) => onFieldChange(id, 'text', e.target.value)}
          />
        </div>
      ))}

      {selectedFieldData && (
        <div className="styling-controls">
          <hr />
          <h4>Styling for "{selectedField}"</h4>
          {/* ... styling controls ... */}
        </div>
      )}

      <div className="calibration-controls">
        <hr />
        <h4>Print Calibration (mm)</h4>
        <div className="form-group">
          <label>Offset X</label>
          <input
            type="number"
            value={calibration.x}
            onChange={(e) => onCalibrationChange('x', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Offset Y</label>
          <input
            type="number"
            value={calibration.y}
            onChange={(e) => onCalibrationChange('y', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
