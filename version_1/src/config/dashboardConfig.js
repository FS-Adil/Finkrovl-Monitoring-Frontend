import OrderExecutability from '../widgets/OrderExecutability';
import SalesChart from '../widgets/SalesChart';
import SystemStatus from '../widgets/SystemStatus';

export const defaultRefreshInterval = 3600000;

export const widgets = [
  {
    id: 'order-executability-1',
    component: OrderExecutability,
    gridArea: '1 / 1 / 1 / 1',
    title: 'Исполняемость заказов (Основной склад)',
    // refreshInterval: 1800000 // 30 минут
  },
  {
    id: 'order-executability-2',
    component: OrderExecutability,
    gridArea: '1 / 2 / 1 / 2',
    title: 'Исполняемость заказов (Региональный склад)',
    // refreshInterval: 1800000
  },
  {
    id: 'sales-chart',
    component: SalesChart,
    gridArea: '2 / 1 / 4 / 4',
    title: 'График продаж',
    // refreshInterval: 3600000
  },
  {
    id: 'system-status',
    component: SystemStatus,
    gridArea: '1 / 3 / 2 / 3',
    title: 'Статус системы',
    // refreshInterval: 300000 // 5 минут
  }
];