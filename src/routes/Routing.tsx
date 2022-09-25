import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForumPage, SingleForumPostPage } from "../pages";
import { Navbar } from "../components";
import { ThemeSwitcher, ToastContextData, PostData } from "../contexts";
const Routing = () => {
  return (
    <Router>
      <ThemeSwitcher>
        <ToastContextData>
          <PostData>
            <Navbar />
            <Routes>
              <Route path="/" element={<ForumPage />} />
              <Route path="/:post_id" element={<SingleForumPostPage />} />
            </Routes>
          </PostData>
        </ToastContextData>
      </ThemeSwitcher>
    </Router>
  );
};

export { Routing };
