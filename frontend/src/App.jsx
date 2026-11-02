import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreatePost } from "./pages/CreatePost";
import { Feed } from "./pages/feed";
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}
