import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Home,
  Login,
  JobDetails,
  PostJob,
  Dashboard,
  Register,
  Profile,
  Employer, 
  MyPost,
  Seeker,
  BrowserJob,
  Apply,
  AppliedJob,
  SavedJob
} from "../pages/index.js";
import LayoutRoot from "../layout/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: (<LayoutRoot><App /></LayoutRoot>),
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "/login",
        element: (
          <LayoutRoot>
            <Login />
          </LayoutRoot>
        ),
      },
      {
        path: "/register",
        element: (
          <LayoutRoot>
            <Register />
          </LayoutRoot>
        ),
      },
      {
        path: "/job-details/:jobId",
        element: (
          <LayoutRoot>
            <JobDetails />
          </LayoutRoot>
        ),
      },
      {
        path: "/apply",
        element: (
          <LayoutRoot>
            <Apply />
          </LayoutRoot>
        ),
      },
      {
        path: "/job-search",
        element: <BrowserJob />,
      },

      {
        path: "/dashboard",
        element: (
          <LayoutRoot>
            <Dashboard />
          </LayoutRoot>
        ),
        children: [
          {
            path: "profile",
            element: (
              <LayoutRoot>
                <Profile />
              </LayoutRoot>
            ),
          },

          // employer paths
          {
            path: "employer",
            element: (
              <LayoutRoot>
                <Employer />
              </LayoutRoot>
            ),
            children: [
              {
                path: "post-job",
                element: (
                  <LayoutRoot>
                    <PostJob />
                  </LayoutRoot>
                ),
              },
              

              {
                path: "my-post",
                element: (
                  <LayoutRoot>
                    <MyPost />
                  </LayoutRoot>
                ),
              },
            ],
          },

          // seeker paths
          {
            path: "seeker",
            element: (
              <LayoutRoot>
                <Seeker />
              </LayoutRoot>
            ),
            children: [
              {
                path: "applied-job",
                element: (
                  <LayoutRoot>
                    <AppliedJob />
                  </LayoutRoot>
                ),
              },
              {
                path: "saved-job",
                element: (
                  <LayoutRoot>
                    <SavedJob />
                  </LayoutRoot>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
