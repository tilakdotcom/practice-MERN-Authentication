import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  )
}

export default App
