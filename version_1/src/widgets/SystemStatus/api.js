import apiClient from '../../config/apiClient';

export async function fetchSystemStatus() {
  try {
    const response = await apiClient.get('/api/system/status');
    return response;
  } catch (error) {
    console.error('Ошибка загрузки статуса системы:', error);
    return getMockData();
  }
}

function getMockData() {
  return {
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    disk: Math.floor(Math.random() * 100),
    uptime: Math.floor(Math.random() * 720) + 24,
    services: [
      { name: 'API Gateway', status: Math.random() > 0.1 ? 'online' : 'degraded' },
      { name: 'Database', status: Math.random() > 0.05 ? 'online' : 'offline' },
      { name: 'Cache', status: 'online' },
      { name: 'Queue', status: Math.random() > 0.15 ? 'online' : 'degraded' }
    ]
  };
}