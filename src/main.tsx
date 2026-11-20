import {createRoot} from 'react-dom/client';
import 'katex/dist/katex.min.css';
import App from './App.tsx';
import './index.css';

(window as unknown as { __MATHSMART_BOOTED__?: boolean }).__MATHSMART_BOOTED__ = true;
createRoot(document.getElementById('root')!).render(<App />);
