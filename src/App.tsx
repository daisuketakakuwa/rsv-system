import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AdminPage from './pages/Admin/AdminPage';
import CreateEventPage from './pages/CreateEvent/CreateEvent';
import TopPage from './pages/Top/TopPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
