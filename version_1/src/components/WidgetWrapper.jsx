import { useState, useEffect, useCallback } from 'react';
import { defaultRefreshInterval } from '../config/dashboardConfig';
import styles from './WidgetWrapper.module.css';

const REFRESH_OPTIONS = [
  { label: '1 час', value: 3600000 },
  { label: '5 часов', value: 18000000 },
  { label: '1 день', value: 86400000 },
  { label: 'Ручное', value: null }
];

function WidgetWrapper({ widgetId, title, children, refreshInterval }) {
  const [selectedInterval, setSelectedInterval] = useState(
    refreshInterval || defaultRefreshInterval
  );
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    if (selectedInterval === null) return;

    const timer = setInterval(() => {
      triggerRefresh();
    }, selectedInterval);

    return () => clearInterval(timer);
  }, [selectedInterval, triggerRefresh]);

  const handleIntervalChange = (e) => {
    setSelectedInterval(e.target.value ? Number(e.target.value) : null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{title}</h3>
          {lastUpdated && (
            <span className={styles.lastUpdated}>
              Обновлено: {lastUpdated}
            </span>
          )}
        </div>
        <div className={styles.controls}>
          <select
            className={styles.select}
            value={selectedInterval ?? ''}
            onChange={handleIntervalChange}
          >
            {REFRESH_OPTIONS.map(option => (
              <option
                key={option.label}
                value={option.value ?? ''}
              >
                {option.label}
              </option>
            ))}
          </select>
          <button
            className={styles.refreshButton}
            onClick={triggerRefresh}
            title="Обновить сейчас"
          >
            ↻
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {children(triggerRefresh, refreshKey)}
      </div>
    </div>
  );
}

export default WidgetWrapper;