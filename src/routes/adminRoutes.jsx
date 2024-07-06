 
import AdminManager from '../pages/admin/AdminManager';
import BlogManager from '../pages/admin/BlogManager';
import ContactFormList from '../pages/admin/ContactFormList';
import ContactInfoForm from '../pages/admin/ContactInfo';
import ContactUsPage from '../pages/admin/ContactUs';
import EvaluationList from '../pages/admin/EvaluationList';
import HomepagePage from '../pages/admin/Homepage';
import LessonTable from '../pages/admin/LessonTable';
import LessonTypesTable from '../pages/admin/LessonTypeTable';
import UserList from '../pages/admin/UserList';
import WebSetting from '../pages/admin/WebSetting';


const adminRoutes = [

  /* admin routes */
  { path: '/admin/web_info', element: <WebSetting /> },
  { path: '/admin/lesson', element: <LessonTable /> },
  { path: '/admin/lesson_types', element: <LessonTypesTable /> },
  { path: '/admin/contact_info', element: <ContactInfoForm /> },
  { path: '/admin/blog', element: <BlogManager /> },
  { path: '/admin/contact_form', element: <ContactFormList /> },
  { path: '/admin/contact_us', element: <ContactUsPage /> },
  { path: '/admin/homepage', element: <HomepagePage /> },
  { path: '/admin/evaluation', element: <EvaluationList /> },
  { path: '/admin/user', element: <UserList /> },
  { path: '/admin/admin_list', element: <AdminManager /> },

];

export default adminRoutes;
