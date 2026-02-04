// src/App.tsx
import { useJsonExplorer } from './hooks/useJsonExplorer';
import { InputPane } from './components/InputPane';
import { ResultsPane } from './components/ResultsPane';
import './App.css';

function App() {
  const {
    jsonInput,
    setJsonInput,
    error,
    path,
    summary,
    parsedData,
    handleAnalyze,
    handleCardClick,
    handleBreadcrumbClick,
    resetAll,
    loadJsonData
  } = useJsonExplorer();

  return (
    <div className="app-container">
      <InputPane
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        onAnalyze={handleAnalyze}
        onClear={resetAll}
        onLoadData={loadJsonData}
        error={error}
      />

      <ResultsPane
        summary={summary}
        path={path}
        onBreadcrumbClick={handleBreadcrumbClick}
        onCardClick={handleCardClick}
        hasData={!!parsedData}
      />
    </div>
  )
}

export default App;