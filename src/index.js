import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutRoot from "./components/LayoutRoot/LayoutRoot";
import SignIn from "./components/SignIn/SignIn";
import UserList from "./components/UserProfile/UserList/UserList";
import RecruitmentEdit from "./components/RecuitmentManagement/RecruitmentEdit/RecruitmentEdit";
import RecruitmentList from "./components/RecuitmentManagement/RecruitmentList";
import TrainingList from "./components/TrainingManagement/TrainingList";
import CreateTrainingClass from "./components/TrainingManagement/CreateNewClass/CreateTrainingClass";
import EditClass from "./components/TrainingManagement/EditTrainingClass/EditClass";
import RequestManager from "./components/RequestManager/RequestManager";
import ReportManager from "./components/ReportManager/ReportManager";
import RecruitmentCreate from "./components/RecuitmentManagement/RecruitmentCreate/RecruitmentCreate";
import EmployeeReports from "./components/EmployeeReports/EmployeeReports";
import ReportsEmployeeCreate from "./components/EmployeeReports/ReportsEmployeeCreate/ReportsEmployeeCreate";
import ReportsEmployeeEdit from "./components/EmployeeReports/ReportsEmployeeEdit/ReportsEmployeeEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/users",
        element: <UserList />,
      },

      {
        path: "/recruitments",
        element: <RecruitmentList />,
      },
      {
        path: "/recruitments/create",
        element: <RecruitmentCreate />,
      },
      {
        path: "/recruitments/:id",
        element: <RecruitmentEdit />,
      },
      {
        path: "/trainings",
        element: <TrainingList />,
      },
      {
        path: "/trainings/create",
        element: <CreateTrainingClass />,
      },
      {
        path: "/trainings/:id",
        element: <EditClass />,
      },
      {
        path: "/request",
        element: <RequestManager />,
      },
      {
        path: "/reports",
        element: <ReportManager />,
      },
      {
        path: "/employee-reports",
        element: <EmployeeReports />,
      },
      {
        path: "/employee-reports/create",
        element: <ReportsEmployeeCreate />,
      },
      {
        path: "/employee-reports/edit",
        element: <ReportsEmployeeEdit />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
