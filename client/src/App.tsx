import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
