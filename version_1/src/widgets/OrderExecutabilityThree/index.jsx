import { useState, useMemo } from 'react';
import { config } from './config';
import styles from './styles.module.css';

// ПЕРЕПИСАН: Виджет больше не делает запросы
// Он получает готовые data от SectionPanel через props
function OrderExecutabilityThree ({ widgetId, data, loading, isMockData }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(`[OrderExecutabilityThree] Рендер виджета ${widgetId}, данные:`, data ? 'есть' : 'нет', 'тестовые:', isMockData);

  if (loading || !data) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span>Ожидание данных...</span>
      </div>
    );
  }

  const stats = [
    { label: 'Нет данных по отгрузке', value: data.paid, status: 'paid', color: config.colors.paid },
    { label: 'Есть частичная отгрузка', value: data.unpaid, status: 'unpaid', color: config.colors.unpaid },
  ];

  const filteredDetails = selectedStatus
    ? data.details.filter(item => item.status === selectedStatus)
    : data.details;

  const statusLabels = {
    paid: 'не отгружен',
    unpaid: 'отгружен частично',
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <div
            key={stat.status}
            className={`${styles.statCard} ${selectedStatus === stat.status ? styles.active : ''}`}
            style={{ background: `${stat.color}10` }}
            onClick={() => { setSelectedStatus(stat.status); setModalOpen(true); }}
          >
            <div className={styles.statLabel}>{stat.label}</div>
            <h3 className={`${styles.statValue} ${styles[stat.status]}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className={styles.modal} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {selectedStatus ? statusLabels[selectedStatus] : 'Все'} заказы
              </h2>
              <button className={styles.closeButton} onClick={() => setModalOpen(false)}>×</button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Автор</th>
                  <th>Номер заказа</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.author}</td>
                    <td>{item.orderNumber}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderExecutabilityThree;