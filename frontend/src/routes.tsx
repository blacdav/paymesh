import { createBrowserRouter } from "react-router";
import Flashscreen from "./pages/flashscreen";
import Onboardingscreen from "./pages/onboardingscreen";
import Signin from "./pages/auth/signin";
import IndividualLayout from "./pages/individual/layout";
import BusinessLayout from "./pages/business/layout";

export const routes = createBrowserRouter([
  { path: '/', element: <Flashscreen /> },
  { path: '/onboarding', element: <Onboardingscreen /> },
  { path: '/signin', element: <Signin /> },
  { 
    path: '/individual',
    element: <IndividualLayout />,
    children: [
      { index: true, element: <Signin /> },
      { path: '', element: <Flashscreen /> },
      { path: '', element: <Flashscreen /> },
    ]
  },
  { 
    path: '/business',
    element: <BusinessLayout />,
    children: [
      { index: true, element: <Signin /> },
      { path: '', element: <Flashscreen /> },
      { path: '', element: <Flashscreen /> },
    ]
  }
])