import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import React from "react";
import Dashboard from "../pages/Dashboard.jsx";
import PropertyDetails from "../pages/PropertyDetails.jsx";
import AddProperty from "../pages/AddProperty.jsx";
import AddSubCategory from "../pages/AddSubCategory.jsx";
import AddCategory from "../pages/AddCategory.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import Profile from "../pages/Profile.jsx";
import MyProperties from "../pages/MyProperties.jsx";
import AddImage from "../pages/AddImage.jsx";
import AddContact from "../pages/AddContact.jsx";
import Hms from "../pages/Hms.jsx";
import Pricing from "../pages/Pricing.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import CloudMenu from "../pages/CloudMenu.jsx";
import RegistrationForm from "../pages/RegistrationForm.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import TermsAndConditions from "../pages/TermsAndConditions.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import RefundPolicy from "../pages/RefundPolicy.jsx";
import PricingUi from "../pages/PricingUi.jsx";
import Payments from "../pages/Payments.jsx";
import PackagePlan from "../pages/PackagePlan.jsx";
import ThankyouPage from "../pages/ThankyouPage.jsx";


export default function Routes({ scrollProp, setScrollProp }) {
  return useRoutes([{
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage scrollProp={scrollProp} setScrollProp={setScrollProp} />,
      },
      {
        path: "contact-us",
        element: <AddContact scrollProp={scrollProp} setScrollProp={setScrollProp}/>
      },
      {
        path: "cloud-menu/:menuName",
        element: <CloudMenu />
      },
      {
        path: "signup",
        element: <RegistrationForm />
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "properties",
            element: <MyProperties />
          },
          {
            path: "propertydetails",
            element: <PropertyDetails />
          },
          {
            path: "addproperty",
            element: <AddProperty />
          },
          {
            path: "category",
            element: <AddCategory />
          },
          {
            path: "subcategory",
            element: <AddSubCategory />
          },
          {
            path: "product",
            element: <AddProduct />
          },
          {
            path: "image",
            element: <AddImage />
          },
          {
            path: "package-plan",
            element: <PackagePlan />
          },
          {
            path: "payments",
            element: <Payments/>
          },
          {
            path: "package-renewal",
            element: <PricingUi />
          },
          {
            path: "thank-you",
            element: <ThankyouPage/>
          }
        ]
      },
      {
        path: "pricing",
        element: <Pricing setScrollProp={setScrollProp} />
      },
      {
        path: "about",
        element: <AboutUs />
      },
      {
        path: "hms",
        element: <Hms />
      },
      {
        path: "rms",
        element: <Hms />
      },
      {
        path: "cm",
        element: <Hms />
      },
      {
        path: "termsandconditions",
        element: <TermsAndConditions />
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy/>
      },
      {
        path: "refundpolicy",
        element: <RefundPolicy/>
      }
    ]
  }]);
}
