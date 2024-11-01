import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
