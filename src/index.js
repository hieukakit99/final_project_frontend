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
import UpdateEmployee from "./components/UserProfile/UpdateEmployee/UpdateEmployee";
import RecruitmentEdit from "./components/RecuitmentManagement/RecruitmentEdit/RecruitmentEdit";
import RecruitmentList from "./components/RecuitmentManagement/RecuitmentList";
import TrainingList from "./components/TrainingManagement/TrainingList";
import CreateTrainingClass from "./components/TrainingManagement/CreateNewClass/CreateTrainingClass";
import EditClass from "./components/TrainingManagement/EditTrainingClass/EditClass";

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
        path: "/employee-profile",
        element: <UserList />,
      },

      {
        path: "/recruitment",
        element: <RecruitmentList />,
      },
      {
        path: "/recruitment/:id",
        element: <RecruitmentEdit />,
      },
      {
        path: "/training",
        element: <TrainingList />,
      },
      {
        path: "/training/create",
        element: <CreateTrainingClass />,
      },
      {
        path: "/training/:id",
        element: <EditClass />,
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
