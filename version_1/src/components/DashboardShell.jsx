import { sections } from '../config/sectionsConfig';
import { getWidgetById } from '../config/dashboardConfig';
import SectionPanel from './SectionPanel';
import styles from './DashboardShell.module.css';

function DashboardShell() {
  console.log('[DashboardShell] Рендер оболочки, разделов:', sections.length);

  if (sections.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет доступных разделов</p>
        <p className={styles.hint}>
          Добавьте разделы в sectionsConfig.js и виджеты в dashboardConfig.js
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {sections.map((section) => {
        const sectionWidgets = section.widgetIds
          .map(id => getWidgetById(id))
          .filter(Boolean);

        console.log(`[DashboardShell] Раздел "${section.title}": виджетов ${sectionWidgets.length}`);

        return (
          <SectionPanel
            key={section.id}
            sectionId={section.id}
            title={section.title}
            widgets={sectionWidgets}
            endpoint={section.endpoint}  // ← НОВОЕ: передаём endpoint
          />
        );
      })}
    </div>
  );
}

export default DashboardShell;