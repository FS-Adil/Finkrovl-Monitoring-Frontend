import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshFunctionRef = useRef(null);

  // Функция для регистрации метода обновления из дочернего компонента
  const registerRefreshFunction = useCallback((refreshFn) => {
    refreshFunctionRef.current = refreshFn;
  }, []);

  const triggerRefresh = useCallback(async () => {
    if (refreshFunctionRef.current && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await refreshFunctionRef.current();
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Ошибка обновления виджета:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [isRefreshing]);

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
          {isRefreshing && (
            <span className={styles.refreshing}>
              Обновление...
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
            className={`${styles.refreshButton} ${isRefreshing ? styles.spinning : ''}`}
            onClick={triggerRefresh}
            disabled={isRefreshing}
            title="Обновить сейчас"
          >
            ↻
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {children(registerRefreshFunction)}
      </div>
    </div>
  );
}

export default WidgetWrapper;