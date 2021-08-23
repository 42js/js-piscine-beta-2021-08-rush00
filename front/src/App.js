import { Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPages from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <div>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={ProfilePage} path="/profile" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPages} path="/@:username/:postId" />
    </div>
  );
}

export default App;
