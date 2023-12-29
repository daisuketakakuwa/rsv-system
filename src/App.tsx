import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TopPage from './pages/Top/TopPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<TopPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
