import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Error404 from "./pages/Error404.jsx";

// Layouts & User Protected Layout
import RootLayout from "./layout/RootLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import GuardLayout from "./layout/GuardLayout.jsx";

// Role Based Protected Routes
import AdminProtectedRoutes from "./layout/protectedRoute/AdminProtectedRoutes.jsx";
import MaidProtectedRoutes from "./layout/protectedRoute/MaidProtectedRoutes.jsx";
import ClientProtectedRoutes from "./layout/protectedRoute/ClientProtectedRoutes.jsx";

// Admin Routes
import AllClients from "./pages/dashboard/admin/AllClients.jsx";
import AllServices from "./pages/dashboard/admin/AllServices.jsx";
import AllMaids from "./pages/dashboard/admin/AllMaids.jsx";

import Settings from "./pages/dashboard/settings/Settings.jsx";
import SingleUser from "./pages/dashboard/admin/SingleUser.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GuardLayout />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin" element={<AdminProtectedRoutes />}>
          <Route path="maids" element={<AllMaids />} />
          <Route path="maids/:id" element={<SingleUser />} />

          <Route path="clients" element={<AllClients />} />
          <Route path="clients/:id" element={<AllClients />} />
          <Route path="services" element={<AllServices />} />
        </Route>
        <Route path="maid" element={<MaidProtectedRoutes />}></Route>
        <Route path="clients" element={<ClientProtectedRoutes />}></Route>
      </Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Route>
  )
);

// import { createBrowserRouter } from "react-router-dom";

// // Pages
// import Home from "./pages/Home.jsx";
// import Dashboard from "./pages/dashboard/Dashboard.jsx";
// import Login from "./pages/Login.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import Error404 from "./pages/Error404.jsx";

// // Layouts & User Protected Layout
// import RootLayout from "./layout/RootLayout.jsx";
// import AuthLayout from "./layout/AuthLayout.jsx";
// import DashboardLayout from "./layout/DashboardLayout.jsx";
// import GuardLayout from "./layout/GuardLayout.jsx";

// // Role Based Protected Routes
// import AdminProtectedRoutes from "./layout/protectedRoute/AdminProtectedRoutes.jsx";
// import MaidProtectedRoutes from "./layout/protectedRoute/MaidProtectedRoutes.jsx";
// import ClientProtectedRoutes from "./layout/protectedRoute/ClientProtectedRoutes.jsx";

// // Admin Routes
// import AllClients from "./pages/dashboard/admin/AllClients.jsx";
// import AllServices from "./pages/dashboard/admin/AllServices.jsx";
// import AllMaids from "./pages/dashboard/admin/AllMaids.jsx";

// import Settings from "./pages/dashboard/settings/Settings.jsx";
// import SingleUser from "./pages/dashboard/admin/SingleUser.jsx";

// export const router = createBrowserRouter([
//   {
//     element: <GuardLayout />,
//     children: [
//       {
//         // Main
//         element: <RootLayout />,
//         children: [
//           {
//             path: "/",
//             element: <Home />,
//           },
//         ],
//       },

//       // Auth
//       {
//         element: <AuthLayout />,
//         children: [
//           {
//             path: "/login",
//             element: <Login />,
//           },
//           {
//             path: "/signup",
//             element: <SignUp />,
//           },
//         ],
//       },

//       //Dashboard
//       {
//         element: <DashboardLayout />,
//         path: "/dashboard",
//         children: [
//           {
//             index: true,
//             element: <Dashboard />,
//           },
//           {
//             path: "settings",
//             element: <Settings />,
//           },

//           // Admin Dashboard
//           {
//             path: "admin",
//             element: <AdminProtectedRoutes />,
//             children: [
//               {
//                 path: "maids",
//                 element: <AllMaids />,
//               },
//               {
//                 path: "maids/:id",
//                 element: <SingleUser />,
//               },
//               {
//                 path: "clients",
//                 element: <AllClients />,
//               },
//               {
//                 path: "clients/:id",
//                 element: <SingleUser />,
//               },
//               {
//                 path: "services",
//                 element: <AllServices />,
//               },
//             ],
//           },

//           // Maid Dashboard
//           {
//             path: "maid",
//             element: <MaidProtectedRoutes />,
//             children: [],
//           },
//           // Clients Dashboard
//           {
//             path: "clients",
//             element: <ClientProtectedRoutes />,
//             children: [],
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <Error404 />,
//       },
//     ],
//   },
// ]);
