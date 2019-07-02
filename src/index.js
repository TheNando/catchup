import './style'
import App from './components/app'

// Ask for notification permissions
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission()
}

export default App
