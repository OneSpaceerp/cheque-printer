import React, { useState } from 'react';
import './App.css';
import { useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import { DndContext } from '@dnd-kit/core';
import ChequeEditor from './components/ChequeEditor';
import ControlPanel from './components/ControlPanel';
import PrintPreview from './components/PrintPreview';

function App() {
  const { language, toggleLanguage, isRtl } = useLanguage();
  const t = translations[language];
  const [activeTemplate, setActiveTemplate] = useState('CIB01');
  const [fields, setFields] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [calibration, setCalibration] = useState({ x: 0, y: 0 });

  // MOCK DATA for now
  useState(() => {
    const initialLayout = {
      payee: { x: 100, y: 150, text: 'Payee Name' },
      amountNumeric: { x: 400, y: 150, text: '1,000.00' },
      amountWords: { x: 100, y: 200, text: 'One Thousand Only' },
      date: { x: 400, y: 50, text: '01/01/2025' },
    };
    setFields(initialLayout);
  }, [activeTemplate]);

  const direction = isRtl ? 'rtl' : 'ltr';

  const handleDragEnd = ({ active, delta }) => {
    setFields((fields) => ({
      ...fields,
      [active.id]: {
        ...fields[active.id],
        x: fields[active.id].x + delta.x,
        y: fields[active.id].y + delta.y,
      },
    }));
  };

  const handleFieldChange = (id, prop, value) => {
    setFields((fields) => ({
      ...fields,
      [id]: {
        ...fields[id],
        [prop]: value,
      },
    }));
  };

  const handleSelectField = (id) => {
    setSelectedField(id);
  };

  const handleCalibrationChange = (axis, value) => {
    setCalibration((cal) => ({ ...cal, [axis]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="App" dir={direction}>
      <div className="no-print">
        <header className="App-header">
          <h1>{t.title}</h1>
          <button onClick={toggleLanguage}>{t.language}</button>
        </header>
        <main className="main-container">
          <aside className="sidebar">
            <ControlPanel
              fields={fields}
              onFieldChange={handleFieldChange}
              selectedField={selectedField}
              onSelectField={handleSelectField}
              calibration={calibration}
              onCalibrationChange={handleCalibrationChange}
            />
            <button onClick={handlePrint} style={{ marginTop: '20px' }}>Print</button>
          </aside>
          <section className="editor-area">
            <DndContext onDragEnd={handleDragEnd}>
              <ChequeEditor
                templateId={activeTemplate}
                fields={fields}
                onFieldChange={handleFieldChange}
                selectedField={selectedField}
                onSelectField={handleSelectField}
              />
            </DndContext>
          </section>
        </main>
      </div>
      <div className="print-only">
        <PrintPreview fields={fields} calibration={calibration} />
      </div>
    </div>
  );
}

export default App;
