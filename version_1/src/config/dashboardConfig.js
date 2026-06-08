// НОВЫЙ: Конфигурация виджетов
// Каждый виджет регистрируется здесь ОДИН раз с уникальным id
// Разделы в sectionsConfig.js ссылаются на эти id
// Чтобы добавить новый виджет:
// 1. Импортировать компонент
// 2. Добавить объект в widgets
// 3. Указать его id в нужном разделе в sectionsConfig.js

// КОНФИГУРАЦИЯ ВИДЖЕТОВ
// Добавлен dataKey — ключ, под которым данные виджета приходят в JSON секции
// Добавлены мок-данные для каждого виджета (используются при недоступности API)

import OrderExecutabilityOne from '../widgets/OrderExecutabilityOne';
import OrderExecutabilityThree from '../widgets/OrderExecutabilityThree';
import OrderExecutabilityTwo from '../widgets/OrderExecutabilityTwo';
import OrderProductionOne from '../widgets/OrderProductionOne';
import OrderPmoOne from '../widgets/OrderPmoOne';
import OrderPmoTwo from '../widgets/OrderPmoTwo';
import SalesChart from '../widgets/SalesChart';
import SystemStatus from '../widgets/SystemStatus';

export const defaultRefreshInterval = 3600000;

export const widgets = [
  {
    id: 'order-executability-1',
    component: OrderExecutabilityOne,
    title: 'Заказ покупателя ПРИНЯТ',
    dataKey: 'orderExecutabilityOne',  // ← НОВОЕ: ключ в JSON ответе секции
    mockData: {                     // ← НОВОЕ: тестовые данные если API недоступен
      total: 7,
      paid: 4,
      unpaid: 2,
      processing: 1,
      details: [
        { author: 'Иванов И.И.', orderNumber: 'ORD-2024001', date: '2024-01-15', comment: 'Срочный заказ', status: 'paid' },
        { author: 'Петров П.П.', orderNumber: 'ORD-2024002', date: '2024-01-16', comment: 'Стандартная доставка', status: 'paid' },
        { author: 'Сидоров С.С.', orderNumber: 'ORD-2024003', date: '2024-01-17', comment: 'Требуется проверка', status: 'processing' },
        { author: 'Козлов К.К.', orderNumber: 'ORD-2024004', date: '2024-01-18', comment: 'Оплачен частично', status: 'unpaid' },
        { author: 'Новиков Н.Н.', orderNumber: 'ORD-2024005', date: '2024-01-19', comment: 'Премиум клиент', status: 'paid' },
        { author: 'Морозов М.М.', orderNumber: 'ORD-2024006', date: '2024-01-20', comment: 'Дополнительная позиция', status: 'paid' },
        { author: 'Волков В.В.', orderNumber: 'ORD-2024007', date: '2024-01-21', comment: 'Возврат', status: 'unpaid' }
      ]
    }
  },
  {
    id: 'order-executability-2',
    component: OrderExecutabilityTwo,
    title: 'Заказ покупателя на ПРОИЗВОДСТВО',
    dataKey: 'orderExecutabilityTwo',
    mockData: {
      total: 5,
      paid: 3,
      unpaid: 2,
      details: [
        { author: 'Смирнов А.А.', orderNumber: 'ORD-2024101', date: '2024-02-10', comment: 'Региональная доставка', status: 'paid' },
        { author: 'Фёдоров Ф.Ф.', orderNumber: 'ORD-2024102', date: '2024-02-11', comment: 'Экспресс', status: 'paid' },
        { author: 'Григорьев Г.Г.', orderNumber: 'ORD-2024103', date: '2024-02-12', comment: 'Ожидает оплаты', status: 'unpaid' },
        { author: 'Алексеев А.А.', orderNumber: 'ORD-2024104', date: '2024-02-13', comment: 'На складе', status: 'unpaid' },
        { author: 'Дмитриев Д.Д.', orderNumber: 'ORD-2024105', date: '2024-02-14', comment: 'Оплачен', status: 'paid' }
      ]
    }
  },
  {
    id: 'order-executability-3',
    component: OrderExecutabilityThree,
    title: 'Заказ покупателя на ОТГРУЗКУ',
    dataKey: 'orderExecutabilityThree',
    mockData: {
      total: 5,
      paid: 4,
      unpaid: 1,
      details: [
        { author: 'Смирнов А.А.', orderNumber: 'ORD-2024101', date: '2024-02-10', comment: 'Региональная доставка', status: 'paid' },
        { author: 'Фёдоров Ф.Ф.', orderNumber: 'ORD-2024102', date: '2024-02-11', comment: 'Экспресс', status: 'paid' },
        { author: 'Григорьев Г.Г.', orderNumber: 'ORD-2024103', date: '2024-02-12', comment: 'Ожидает оплаты', status: 'unpaid' },
        { author: 'Алексеев А.А.', orderNumber: 'ORD-2024104', date: '2024-02-13', comment: 'На складе', status: 'paid' },
        { author: 'Дмитриев Д.Д.', orderNumber: 'ORD-2024105', date: '2024-02-14', comment: 'Оплачен', status: 'paid' }
      ]
    }
  },
  {
    id: 'order-production-1',
    component: OrderProductionOne,
    title: 'Изготовление продукции',
    dataKey: 'orderProductionOne',
    mockData: {
      total: 6,
      paid: 6,
      unpaid: 0,
      details: [
        { author: 'Смирнов А.А.', orderNumber: 'ORD-2024101', date: '2024-02-10', comment: 'Региональная доставка', status: 'paid' },
        { author: 'Фёдоров Ф.Ф.', orderNumber: 'ORD-2024102', date: '2024-02-11', comment: 'Экспресс', status: 'paid' },
        { author: 'Григорьев Г.Г.', orderNumber: 'ORD-2024103', date: '2024-02-12', comment: 'Ожидает оплаты', status: 'paid' },
        { author: 'Алексеев А.А.', orderNumber: 'ORD-2024104', date: '2024-02-13', comment: 'На складе', status: 'paid' },
        { author: 'Дмитриев Д.Д.', orderNumber: 'ORD-2024105', date: '2024-02-14', comment: 'Оплачен', status: 'paid' }
      ]
    }
  },
  {
    id: 'order-pmo-1',
    component: OrderPmoOne,
    title: 'Наличие',
    dataKey: 'orderPmoOne',
    mockData: {
      total: 5,
      paid: 5,
      unpaid: 0,
      details: [
        { author: 'Смирнов А.А.', orderNumber: 'ORD-2024101', date: '2024-02-10', comment: 'Региональная доставка', status: 'paid' },
        { author: 'Фёдоров Ф.Ф.', orderNumber: 'ORD-2024102', date: '2024-02-11', comment: 'Экспресс', status: 'paid' },
        { author: 'Григорьев Г.Г.', orderNumber: 'ORD-2024103', date: '2024-02-12', comment: 'Ожидает оплаты', status: 'paid' },
        { author: 'Алексеев А.А.', orderNumber: 'ORD-2024104', date: '2024-02-13', comment: 'На складе', status: 'paid' },
        { author: 'Дмитриев Д.Д.', orderNumber: 'ORD-2024105', date: '2024-02-14', comment: 'Оплачен', status: 'paid' }
      ]
    }
  },
  {
    id: 'order-pmo-2',
    component: OrderPmoTwo,
    title: 'Правильное заполнение приходника',
    dataKey: 'orderPmoTwo',
    mockData: {
      total: 5,
      paid: 5,
      unpaid: 0,
      details: [
        { author: 'Смирнов А.А.', orderNumber: 'ORD-2024101', date: '2024-02-10', comment: 'Региональная доставка', status: 'paid' },
        { author: 'Фёдоров Ф.Ф.', orderNumber: 'ORD-2024102', date: '2024-02-11', comment: 'Экспресс', status: 'paid' },
        { author: 'Григорьев Г.Г.', orderNumber: 'ORD-2024103', date: '2024-02-12', comment: 'Ожидает оплаты', status: 'paid' },
        { author: 'Алексеев А.А.', orderNumber: 'ORD-2024104', date: '2024-02-13', comment: 'На складе', status: 'paid' },
        { author: 'Дмитриев Д.Д.', orderNumber: 'ORD-2024105', date: '2024-02-14', comment: 'Оплачен', status: 'paid' }
      ]
    }
  },
  {
    id: 'sales-chart',
    component: SalesChart,
    title: 'График продаж',
    dataKey: 'SalesChart',  // ← НОВОЕ
    mockData: [            // ← НОВОЕ
      { month: 'Янв', revenue: 450000, orders: 120, customers: 80 },
      { month: 'Фев', revenue: 380000, orders: 95, customers: 65 },
      { month: 'Мар', revenue: 520000, orders: 145, customers: 92 },
      { month: 'Апр', revenue: 410000, orders: 110, customers: 73 },
      { month: 'Май', revenue: 480000, orders: 130, customers: 85 },
      { month: 'Июн', revenue: 550000, orders: 160, customers: 98 },
      { month: 'Июл', revenue: 600000, orders: 175, customers: 105 },
      { month: 'Авг', revenue: 530000, orders: 150, customers: 90 },
      { month: 'Сен', revenue: 490000, orders: 135, customers: 82 },
      { month: 'Окт', revenue: 570000, orders: 165, customers: 95 },
      { month: 'Ноя', revenue: 620000, orders: 180, customers: 110 },
      { month: 'Дек', revenue: 700000, orders: 200, customers: 125 }
    ]
  },
  {
    id: 'system-status',
    component: SystemStatus,
    title: 'Статус системы',
    dataKey: 'systemStatus',  // ← НОВОЕ
    mockData: {               // ← НОВОЕ
      cpu: 45,
      memory: 62,
      disk: 38,
      uptime: 720,
      services: [
        { name: 'API Gateway', status: 'online' },
        { name: 'Database', status: 'online' },
        { name: 'Cache', status: 'online' },
        { name: 'Queue', status: 'degraded' }
      ]
    }
  }
];

// НОВЫЙ: Хелпер для получения виджета по id
export function getWidgetById(id) {
  return widgets.find(w => w.id === id);
}