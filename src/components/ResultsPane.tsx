// src/components/ResultsPane.tsx
import type { Summary } from '../types';
import { getTypeClass } from '../utils/jsonHelpers';

interface ResultsPaneProps {
  summary: Summary | null;
  path: string[];
  onBreadcrumbClick: (index: number) => void;
  onCardClick: (key: string) => void;
  hasData: boolean; // simple check to show placeholder vs content
}

export const ResultsPane = ({ summary, path, onBreadcrumbClick, onCardClick, hasData }: ResultsPaneProps) => {
  if (!hasData || !summary) {
    return (
      <div className="output-pane">
        <div className="placeholder-text">
          <h2>Ready to scan</h2>
          <p>Upload a file or paste text to begin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="output-pane">
      <div className="results-section">
        <div className="breadcrumb-bar">
          {path.map((item, index) => (
            <span key={index} className="breadcrumb-item">
              <span className="breadcrumb-link" onClick={() => onBreadcrumbClick(index)}>
                {item}
              </span>
              {index < path.length - 1 && <span className="breadcrumb-separator">/</span>}
            </span>
          ))}
        </div>

        <div className="results-header">
          <h3>{summary.type} Overview</h3>
          <span className="item-count">{summary.count} items</span>
        </div>

        <div className="results-grid">
          {summary.preview.map((item, index) => (
            <div
              key={index}
              className={`result-card ${item.isExpandable ? 'clickable' : ''}`}
              onClick={() => onCardClick(item.key)}
            >
              <span className="result-key">{item.key}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`type-badge ${getTypeClass(item.type)}`}>{item.type}</span>
                {item.isExpandable && <span style={{ color: '#666', fontSize: '12px' }}>▶</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};