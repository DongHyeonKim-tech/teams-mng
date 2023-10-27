import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { PageLayout } from "./features/layout/PageLayout";
import "./styles/App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <MainPage />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}
