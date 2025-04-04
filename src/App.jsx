import {} from "react";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services from "./Pages/Services";
import Subscriptions from "./Pages/Subscriptions";
import Create from "./Pages/Create";
import Video from "./Pages/Video";
import Record from "./Pages/Record";
import Song from "./Pages/Song";
import Peer from "./Pages/Peer";
import MusicDistribute from "./Pages/MusicDistribute";
import Mastering from "./Pages/Mastering";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Promote from "./Pages/Promote";
import Opportunity from "./Pages/Opportunity";
import Review from "./Pages/Review";
import Fan from "./Pages/Fan";
import Career from "./Pages/Career";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Help from "./Pages/Help";
import Right from "./Pages/Right";
import More from "./Pages/More";
import Vision from "./Pages/Vision";
import GraphicDesignMockup from "./Pages/GraphicDesignMockup";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import VideoCreator from "./Pages/TextToVideo";
import Songwriting from "./Pages/Songwriting";
import AuthRedirectHandler from "./firebase/AuthRedirectHandler";
import CreateMusic from "./Pages/TextToMusic";
import RecordMusic from "./Pages/RecordMusic";
import MasteringPage from "./Pages/MasteringPage";
import SoundRecorder from "./Pages/SoundRecorder";
import PaymentSuccess from "./Components/PaymentSuccess";
import PaymentFailed from "./Components/PaymentFailed";
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // This makes it instant instead of smooth
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AuthRedirectHandler />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service" element={<Services />} />
            <Route path="/subscription" element={<Subscriptions />} />
            <Route path="/create" element={<Create />} />
            <Route path="/video" element={<Video />} />
            <Route path="/record" element={<Record />} />
            <Route path="/song" element={<Song />} />
            <Route path="/peer" element={<Peer />} />
            <Route path="/music" element={<MusicDistribute />} />
            <Route path="/mastering" element={<Mastering />} />
            <Route path="/promote" element={<Promote />} />
            <Route path="/opportunity" element={<Opportunity />} />
            <Route path="/review" element={<Review/>} />
            <Route path="/fan-reach" element={<Fan/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/privacy" element={<Privacy/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/right" element={<Right/>} />
            <Route path="/more" element={<More/>} />
            <Route path="/vision" element={<Vision/>} />
            {/* <Route path="/record-music" element={<RecordMusic/>} /> */}
            <Route path="/graphic-design-mockup" element={<GraphicDesignMockup/>} />
            <Route path="/text-to-video" element={<VideoCreator/>} />
            <Route path="/songwriting" element={<Songwriting/>} />
            <Route path="/create-music" element={<CreateMusic/>} />
            <Route path="/mastering-sound" element={<MasteringPage/>} />
            <Route path="/sound-recorder" element={<SoundRecorder/>} />
            <Route path="/verifySubscription/:id" element={<PaymentSuccess />} />
            <Route path="/failedSub/:id" element={<PaymentFailed />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
