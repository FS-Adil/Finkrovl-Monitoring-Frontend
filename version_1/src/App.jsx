import DashboardShell from './components/DashboardShell'
import styles from './App.module.css'

function App() {
  console.log('[App] Рендер приложения')

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Дашборд</h1>
      <DashboardShell />
    </div>
  )
}

export default App