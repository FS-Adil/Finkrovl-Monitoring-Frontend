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
    
    // Вычисляем статистику на основе реальных данных из details
    return processResponse(response);
  } catch (error) {
    console.error('Ошибка загрузки данных исполняемости:', error);
    return getMockData();
  }
}

// Обработка ответа — вычисление статистики из деталей
function processResponse(response) {
  const details = response.details || response.data?.details || response;
  
  if (!Array.isArray(details)) {
    console.warn('Ответ API не содержит массив details, используется как есть');
    return response;
  }

  const paid = details.filter(item => item.status === 'paid').length;
  const unpaid = details.filter(item => item.status === 'unpaid').length;
  const processing = details.filter(item => item.status === 'processing').length;

  return {
    total: details.length,
    paid,
    unpaid,
    processing,
    details
  };
}

function getMockData() {
  const details = [
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
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
    },
    {
      author: 'Морозов М.М.',
      orderNumber: 'ORD-2024006',
      date: '2024-01-20',
      comment: 'Дополнительная позиция',
      status: 'paid'
    },
    {
      author: 'Волков В.В.',
      orderNumber: 'ORD-2024007',
      date: '2024-01-21',
      comment: 'Возврат',
      status: 'unpaid'
    }
  ];

  // Вычисляем статистику из тех же данных, что попадают в таблицу
  const paid = details.filter(item => item.status === 'paid').length;
  const unpaid = details.filter(item => item.status === 'unpaid').length;
  const processing = details.filter(item => item.status === 'processing').length;

  return {
    total: details.length,
    paid,
    unpaid,
    processing,
    details
  };
}