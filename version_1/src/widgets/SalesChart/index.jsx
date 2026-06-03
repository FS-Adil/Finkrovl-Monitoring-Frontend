import { useState, useEffect, useCallback } from 'react';
import { fetchSalesData } from './api';
import { config } from './config';
import styles from './styles.module.css';

function SalesChart({ onRefetch }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [viewMode, setViewMode] = useState('revenue');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchSalesData({
        period: 'year',
        groupBy: 'month'
      });
      setData(result);
    } catch (error) {
      setError('Ошибка загрузки данных');
      console.error('Error fetching sales data:', error);
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
        <span>Загрузка данных...</span>
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

  const getMaxValue = () => {
    switch(viewMode) {
      case 'revenue': return Math.max(...data.map(d => d.revenue));
      case 'orders': return Math.max(...data.map(d => d.orders));
      case 'customers': return Math.max(...data.map(d => d.customers));
      default: return 1;
    }
  };

  const formatValue = (value) => {
    if (viewMode === 'revenue') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    return value;
  };

  const maxValue = getMaxValue();

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.viewModes}>
          {[
            { key: 'revenue', label: 'Выручка', color: config.colors.primary },
            { key: 'orders', label: 'Заказы', color: config.colors.secondary },
            { key: 'customers', label: 'Клиенты', color: config.colors.accent }
          ].map(mode => (
            <button
              key={mode.key}
              className={`${styles.viewButton} ${viewMode === mode.key ? styles.active : ''}`}
              onClick={() => setViewMode(mode.key)}
              style={{
                borderColor: viewMode === mode.key ? mode.color : 'transparent'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.chart}>
        {data.map((item, index) => (
          <div key={item.month} className={styles.barGroup}>
            <div className={styles.barValue}>
              {hoveredBar === index ? formatValue(item[viewMode]) : ''}
            </div>
            <div
              className={styles.bar}
              style={{
                height: `${(item[viewMode] / maxValue) * 100}%`,
                background: `linear-gradient(to top, ${config.colors.primary}, ${config.colors.secondary})`,
              }}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === index && (
                <div className={styles.tooltip}>
                  <div>Выручка: {formatValue(item.revenue)}</div>
                  <div>Заказов: {item.orders}</div>
                  <div>Клиентов: {item.customers}</div>
                </div>
              )}
            </div>
            <div className={styles.barLabel}>{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesChart;