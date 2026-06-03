import OrderExecutability from '../widgets/OrderExecutability';

export const defaultRefreshInterval = 3600000;

export const widgets = [
  {
    id: 'order-executability-1',
    component: OrderExecutability,
    gridArea: '1 / 1 / 3 / 2',
    title: 'Исполняемость заказов (Основной склад)',
    refreshInterval: 1800000 // 30 минут
  }
];