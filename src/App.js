import { Route, Routes } from 'react-router-dom';
// import './App.css';

import Layout from './Layout';
import HomePage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

//1VKvKphSmQsa0B45hDqVulTZ7wM6OgYftTjfzlk5FM7wOxBxeEZsnY0p0NBg
//token from sportsmonkey
//BASE_URL:https://api.sportmonks.com/football/v3
//FULL_URL:https://api.sportmonks.com/football/v3/fixtures/date/YYYY_MM_DD?includes=events

//second

//https://1fadad5ce25a4c8ca3fcfca4410c60bc.weavy.io

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
