import { config } from './config';
import styles from './styles.module.css';

// ПЕРЕПИСАН: Виджет получает data от SectionPanel
function SystemStatus({ widgetId, data, loading, isMockData }) {
  console.log(`[SystemStatus] Рендер виджета ${widgetId}, данные:`, data ? `CPU: ${data.cpu}%` : 'нет', 'тестовые:', isMockData);

  if (loading || !data) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span>Ожидание данных...</span>
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

  const statusLabels = { online: 'Онлайн', degraded: 'Деградация', offline: 'Офлайн' };

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
                  transition: 'width 0.5s ease'
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
              {' '}{statusLabels[service.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemStatus;