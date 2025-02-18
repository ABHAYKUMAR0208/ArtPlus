import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </Provider>
  </BrowserRouter>
);
