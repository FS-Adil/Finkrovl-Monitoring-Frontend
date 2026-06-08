// НОВЫЙ: Конфигурация разделов дашборда
// Чтобы добавить новый раздел, достаточно добавить объект в массив sections
// Каждый раздел содержит id, title и массив id виджетов, которые в него входят

// КОНФИГУРАЦИЯ РАЗДЕЛОВ С API-ЭНДПОИНТАМИ
// Каждый раздел теперь имеет свой endpoint, который возвращает JSON с данными для всех виджетов секции

export const sections = [
  {
    id: 'customer-order',
    title: 'Заказ покупателя',
    endpoint: '/api/v1/section/customer-order',
    widgetIds: ['order-executability-1', 'order-executability-2', 'order-executability-3', ]
  },
  {
    id: 'production',
    title: 'Производство',
    endpoint: '/api/v1/section/production', 
    widgetIds: ['order-production-1', ]
    // widgetIds: ['sales-chart']
  },
  {
    id: 'pmo',
    title: 'ПМО',
    endpoint: '/api/v1/section/pmo', 
    widgetIds: ['order-pmo-1', 'order-pmo-2', ]
    // widgetIds: ['order-executability-2', 'system-status']
  }
];