import DashboardShell from './components/DashboardShell'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Dashboard</h1>
      <DashboardShell />
    </div>
  )
}

export default App