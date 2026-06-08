import { useState, useCallback, useEffect } from 'react';
import apiClient from '../config/apiClient';
import { getWidgetById } from '../config/dashboardConfig';
import WidgetCard from './WidgetCard';
import styles from './SectionPanel.module.css';

function SectionPanel({ sectionId, title, widgets, endpoint }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [isMockData, setIsMockData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`[SectionPanel] Рендер раздела "${title}", виджетов: ${widgets.length}`);

  const loadSectionData = useCallback(async () => {
    console.log(`[SectionPanel] Загрузка данных секции "${title}" с endpoint: ${endpoint}`);
    setLoading(true);
    setError(null);
    setIsMockData(false);

    try {
      const response = await apiClient.get(endpoint);
      console.log(`[SectionPanel] Данные получены для "${title}":`, response);
      setSectionData(response);
      setIsMockData(false);
    } catch (err) {
      console.warn(`[SectionPanel] Сервер недоступен для "${title}", используются тестовые данные`);
      const mockSectionData = {};
      widgets.forEach(widget => {
        if (widget.mockData) {
          mockSectionData[widget.dataKey] = widget.mockData;
        }
      });
      setSectionData(mockSectionData);
      setIsMockData(true);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title, widgets]);

  useEffect(() => {
    loadSectionData();
  }, [loadSectionData]);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    console.log(`[SectionPanel] Ручное обновление раздела "${title}"`);
    setIsRefreshing(true);
    await loadSectionData();
    setLastUpdated(new Date().toLocaleTimeString());
    setIsRefreshing(false);
  }, [isRefreshing, loadSectionData, title]);

  if (loading && !sectionData) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.refreshing}>Загрузка...</span>
          </div>
        </div>
        <div className={styles.widgetsGrid}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Загрузка данных секции...</span>
          </div>
        </div>
      </div>
    );
  }

  if (widgets.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.emptyText}>Нет виджетов</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>{title}</h2>
          {isMockData && (
            <span className={styles.mockBadge} title="Сервер недоступен, показаны тестовые данные">
              ⚠ Тестовые данные
            </span>
          )}
          {lastUpdated && !isMockData && (
            <span className={styles.lastUpdated}>
              Обновлено: {lastUpdated}
            </span>
          )}
          {isRefreshing && (
            <span className={styles.refreshing}>Обновление...</span>
          )}
        </div>
        <button
          className={`${styles.refreshButton} ${isRefreshing ? styles.spinning : ''}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title={`Обновить все виджеты раздела "${title}"`}
        >
          ↻ Обновить раздел
        </button>
      </div>

      <div className={styles.widgetsGrid}>
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widgetId={widget.id}
            title={widget.title}
            isMockData={isMockData}
          >
            <widget.component
              widgetId={widget.id}
              data={sectionData?.[widget.dataKey] || null}
              loading={loading}
              isMockData={isMockData}
            />
          </WidgetCard>
        ))}
      </div>
    </div>
  );
}

export default SectionPanel;