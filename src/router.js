import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
// import Signup from "@/pages/Signup.vue";
// import Signin from "@/pages/Signin.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      // {
      //   path: "/signin",
      //   name: "Signin",
      //   component: Signin,
      // },
      // {
      //   path: "/signup",
      //   name: "Signup",
      //   component: Signup,
      // },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
      },
    ],
  },
];

export default routes;
