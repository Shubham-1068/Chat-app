import ChatSection from "./Components/ChatSection"
import LoginButton from "./Components/Login"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginButton />
    },
    {
      path: "/chats",
      element: <ChatSection />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
