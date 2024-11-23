import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
      domain="dev-kdohaj2hwyh0xma5.us.auth0.com"
      clientId="vq1Ovt2j2uoq2yvCQIuROHfc2cLkLcxe"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
)
