import { useState, useEffect, useCallback } from 'react';
import { fetchSystemStatus } from './api';
import { config } from './config';
import styles from './styles.module.css';

function SystemStatus({ onRefetch }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchSystemStatus();
      setData(result);
    } catch (error) {
      setError('Ошибка загрузки статуса');
      console.error('Error fetching system status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (onRefetch) {
      onRefetch(loadData);
    }
  }, [onRefetch, loadData]);

  if (loading || !data) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span>Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span>{error}</span>
        <button onClick={loadData} className={styles.retryButton}>
          Повторить
        </button>
      </div>
    );
  }

  const getMetricColor = (value, type) => {
    const thresholds = config.thresholds[type];
    if (value >= thresholds.critical) return '#ff4d4f';
    if (value >= thresholds.warning) return '#faad14';
    return '#52c41a';
  };

  const metrics = [
    { label: 'CPU', value: data.cpu, type: 'cpu' },
    { label: 'Память', value: data.memory, type: 'memory' },
    { label: 'Диск', value: data.disk, type: 'disk' }
  ];

  const statusLabels = {
    online: 'Онлайн',
    degraded: 'Деградация',
    offline: 'Офлайн'
  };

  return (
    <div className={styles.container}>
      <div className={styles.metrics}>
        {metrics.map(metric => (
          <div key={metric.label} className={styles.metric}>
            <div className={styles.metricHeader}>
              <span>{metric.label}</span>
              <span className={styles.metricValue}>{metric.value}%</span>
            </div>
            <div className={styles.metricBar}>
              <div
                className={styles.metricFill}
                style={{
                  width: `${metric.value}%`,
                  background: getMetricColor(metric.value, metric.type),
                  transition: 'width 0.5s ease, background 0.3s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.uptime}>
        <span className={styles.uptimeLabel}>Время работы:</span>
        <span className={styles.uptimeValue}>{data.uptime} часов</span>
      </div>

      <div className={styles.services}>
        <h4 className={styles.servicesTitle}>Сервисы</h4>
        {data.services.map(service => (
          <div key={service.name} className={styles.serviceItem}>
            <span className={styles.serviceName}>{service.name}</span>
            <span className={styles.statusText}>
              <span className={`${styles.statusIndicator} ${styles[service.status]}`} />
              {' '}
              {statusLabels[service.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemStatus;