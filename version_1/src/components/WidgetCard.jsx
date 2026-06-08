import styles from './WidgetCard.module.css';

// УПРОЩЁН: Виджет-карточка больше не управляет загрузкой
// Она просто получает данные и флаг isMockData от SectionPanel
function WidgetCard({ widgetId, title, isMockData, children }) {
  console.log(`[WidgetCard] Рендер виджета: ${widgetId}, тестовые данные: ${isMockData}`);

  return (
    <div className={`${styles.card} ${isMockData ? styles.mockCard : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {/* НОВОЕ: индикатор тестовых данных на карточке */}
        {isMockData && (
          <span className={styles.mockIndicator} title="Тестовые данные">
            ⚠
          </span>
        )}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default WidgetCard;