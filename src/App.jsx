import Markup from './jsx';
import { ToastContainer } from 'react-toastify';

import './assets/css/style.css';

function App() {
  return (
    <>
      <Markup />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  );
}

export default App;
