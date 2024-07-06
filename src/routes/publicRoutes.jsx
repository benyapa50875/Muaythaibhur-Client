 
import BlogDetail from '../pages/user/BlogDetail';
import Blogs from '../pages/user/BlogPage';
import HomePage from '../pages/user/HomePage';
import LessonDetail from '../pages/user/LessonDetails';
import Lessons from '../pages/user/Lessons';
import SignUp from '../pages/user/Signup';
import SignIn from '../pages/user/Signin';
import ContactUs from '../pages/user/ContactUs';
import Evaluation from '../pages/user/Evaluation';
import AdminSignIn from '../pages/admin/Signin';
import EmailVerify from '../pages/user/EmailVerify';

const publicRoutes = [
  /* public routes */
  { path: '/', element: <HomePage /> },
  { path: '/admin/signin', element: <AdminSignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/contact', element: <ContactUs /> },
  { path: '/verify/success', element: <EmailVerify /> },
];

export default publicRoutes;
