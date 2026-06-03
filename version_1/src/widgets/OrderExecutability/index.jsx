import { useState, useEffect, useCallback } from 'react';
import { fetchOrderExecutability } from './api';
import { config } from './config';
import styles from './styles.module.css';

function OrderExecutability({ widgetId, onRefetch }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchOrderExecutability({
        widgetId,
        period: 'month'
      });
      setData(result);
    } catch (error) {
      setError('Ошибка загрузки данных');
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  }, [widgetId]);

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

  const stats = [
    { 
      label: 'Оплаченные', 
      value: data.paid, 
      status: 'paid',
      color: config.colors.paid 
    },
    { 
      label: 'Неоплаченные', 
      value: data.unpaid, 
      status: 'unpaid',
      color: config.colors.unpaid 
    },
    { 
      label: 'В обработке', 
      value: data.processing, 
      status: 'processing',
      color: config.colors.processing 
    }
  ];

  const filteredDetails = selectedStatus 
    ? data.details.filter(item => item.status === selectedStatus)
    : data.details;

  const statusLabels = {
    paid: 'Оплачен',
    unpaid: 'Не оплачен',
    processing: 'В обработке'
  };

  const handleCardClick = (status) => {
    setSelectedStatus(status);
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <div
            key={stat.status}
            className={`${styles.statCard} ${selectedStatus === stat.status ? styles.active : ''}`}
            style={{ background: `${stat.color}10` }}
            onClick={() => handleCardClick(stat.status)}
          >
            <div className={styles.statLabel}>{stat.label}</div>
            <h3 className={`${styles.statValue} ${styles[stat.status]}`}>
              {stat.value}
            </h3>
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
              <button 
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
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

export default OrderExecutability;