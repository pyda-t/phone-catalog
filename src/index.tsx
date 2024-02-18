import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GlobalProvider>
    <HashRouter>
      <Routes>
        <Route path="/*" element={ <App /> } />
      </Routes>
    </HashRouter>
  </GlobalProvider>
);

reportWebVitals();
