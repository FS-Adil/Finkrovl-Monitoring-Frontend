import { widgets } from '../config/dashboardConfig';
import WidgetWrapper from './WidgetWrapper';
import styles from './DashboardShell.module.css';

function DashboardShell() {
  if (widgets.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет доступных виджетов</p>
        <p className={styles.hint}>
          Добавьте виджеты в конфигурацию dashboardConfig.js
        </p>
      </div>
    );
  }

  return (
    <div 
      className={styles.grid}
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridAutoRows: 'minmax(250px, auto)'
      }}
    >
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={styles.cell}
          style={{ gridArea: widget.gridArea }}
        >
          <WidgetWrapper
            widgetId={widget.id}
            title={widget.title}
            refreshInterval={widget.refreshInterval}
          >
            {(refreshData) => (
              <widget.component
                widgetId={widget.id}
                onRefetch={refreshData}
              />
            )}
          </WidgetWrapper>
        </div>
      ))}
    </div>
  );
}

export default DashboardShell;