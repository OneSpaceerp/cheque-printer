import React from 'react';
import DraggableField from './DraggableField';

const ChequeEditor = ({ templateId, fields, onFieldChange, selectedField, onSelectField }) => {
  const chequeImageUrl = `http://localhost:3001/templates/${templateId}.png`;

  return (
    <div className="cheque-editor-container" style={{ position: 'relative' }}>
      <img src={chequeImageUrl} alt="Cheque template" style={{ maxWidth: '100%' }} />
      {Object.entries(fields).map(([id, field]) => (
        <DraggableField
          key={id}
          id={id}
          initialPosition={{ x: field.x, y: field.y }}
          onFieldChange={onFieldChange}
          isSelected={selectedField === id}
          onSelect={() => onSelectField(id)}
        >
          <input
            type="text"
            value={field.text}
            onChange={(e) => onFieldChange(id, 'text', e.target.value)}
            style={{
              fontSize: `${field.fontSize || 16}px`,
              fontWeight: field.fontWeight || 'normal',
              textAlign: field.textAlign || 'left',
              border: selectedField === id ? '2px dashed #007bff' : '1px solid #ccc',
              padding: '5px',
            }}
          />
        </DraggableField>
      ))}
    </div>
  );
};

export default ChequeEditor;
