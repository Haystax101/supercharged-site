import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'

// Analytics is optional: a preview deploy without secrets should still render.
const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN
if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BASE_URL is '/' locally and '/<repo>/' on GitHub Pages, so client-side
        routes resolve correctly under a project-page subpath. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PostHogProvider client={posthog}>
        <App />
      </PostHogProvider>
    </BrowserRouter>
  </StrictMode>,
)
