import apiClient from '../../config/apiClient';

export async function fetchOrderExecutability(params = {}) {
  try {
    const response = await apiClient.get('/api/orders/executability', {
      params: {
        period: params.period || 'month',
        limit: params.limit || 100,
        ...params
      }
    });
    
    return response;
  } catch (error) {
    console.error('Ошибка загрузки данных исполняемости:', error);
    
    // Fallback на моковые данные при ошибке
    return getMockData();
  }
}

function getMockData() {
  return {
    total: 150,
    paid: 120,
    unpaid: 20,
    processing: 10,
    details: [
      {
        author: 'Иванов И.И.',
        orderNumber: 'ORD-2024001',
        date: '2024-01-15',
        comment: 'Срочный заказ',
        status: 'paid'
      },
      {
        author: 'Петров П.П.',
        orderNumber: 'ORD-2024002',
        date: '2024-01-16',
        comment: 'Стандартная доставка',
        status: 'paid'
      },
      {
        author: 'Сидоров С.С.',
        orderNumber: 'ORD-2024003',
        date: '2024-01-17',
        comment: 'Требуется проверка',
        status: 'processing'
      },
      {
        author: 'Козлов К.К.',
        orderNumber: 'ORD-2024004',
        date: '2024-01-18',
        comment: 'Оплачен частично',
        status: 'unpaid'
      },
      {
        author: 'Новиков Н.Н.',
        orderNumber: 'ORD-2024005',
        date: '2024-01-19',
        comment: 'Премиум клиент',
        status: 'paid'
      }
    ]
  };
}