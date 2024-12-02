import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TicketsIndexPage from '../pages/tickets/TicketsIndexPage';
import TicketsCreatePage from '../pages/tickets/TicketsCreatePage';


const GlobalRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/tickets">
        <Route index element={<TicketsIndexPage/>}/>
        <Route path='create' element={<TicketsCreatePage/>}/>
      </Route>
      <Route path='/404' element={<NotFoundPage />} />
      <Route path='*' element={<Navigate to="/404"/>} />
    </Routes>
  )
}

export default GlobalRouter;