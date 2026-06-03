import apiClient from '../../config/apiClient';

export async function fetchSalesData(params = {}) {
  try {
    const response = await apiClient.get('/api/analytics/sales', {
      params: {
        period: params.period || 'year',
        groupBy: params.groupBy || 'month',
        ...params
      }
    });
    
    return response;
  } catch (error) {
    console.error('Ошибка загрузки данных продаж:', error);
    return getMockData();
  }
}

function getMockData() {
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];
  
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 500000) + 100000,
    orders: Math.floor(Math.random() * 200) + 50,
    customers: Math.floor(Math.random() * 100) + 30
  }));
}