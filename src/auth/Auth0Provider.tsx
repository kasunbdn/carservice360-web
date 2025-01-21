import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function Auth0ProviderWithNavigate({ children }: Props) {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const redirectUri = window.location.origin;

  // Callback function to handle redirect after login
  const onRedirectCallback = (appState: any) => {
    console.log(
      "Auth0Provider.tsx: Auth0 redirect callback received:",
      appState
    );
    const returnTo = appState?.returnTo || window.location.pathname;
    console.log("Auth0Provider.tsx: Navigating to:", returnTo);
    navigate(returnTo);
  };

  // Log initialization
  console.log("Auth0Provider.tsx: Auth0Provider initialized with:", {
    domain,
    clientId,
    redirectUri,
  });

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
