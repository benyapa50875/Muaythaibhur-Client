 
import BlogDetail from '../pages/user/BlogDetail';
import Blogs from '../pages/user/BlogPage';
import LessonDetail from '../pages/user/LessonDetails';
import Lessons from '../pages/user/Lessons';
import Evaluation from '../pages/user/Evaluation';

const userRoutes = [
  /* public routes */
  { path: '/lessons', element: <Lessons /> },
  { path: '/lessons/:id', element: <LessonDetail /> },
  { path: '/lessons/evaluation/:id', element: <Evaluation /> },
  { path: '/community', element: <Blogs /> },
  { path: '/community/:id', element: <BlogDetail /> },
];

export default userRoutes;
