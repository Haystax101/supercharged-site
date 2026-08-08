import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Home from './pages/Home';
import WaitlistFlow from './components/WaitlistFlow';
import ManifestoOverlay from './components/ManifestoOverlay';
import AboutOverlay from './components/AboutOverlay';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Support from './pages/Support';
import Terms from './pages/Terms';

// Images to preload
import alexImage from './assets/alex.JPG';
import bowenImage from './assets/bowen.png';
import georgeImage from './assets/george.png';
import groupImage from './assets/group.jpg';

function App() {
  const [isWaitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(257);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload about page images in the background
    const imagesToPreload = [alexImage, bowenImage, georgeImage, groupImage];
    imagesToPreload.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });

    const fetchWaitlistCount = async () => {
      if (!supabase) return; // preview deploy without secrets: keep the seed count
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
          setWaitlistCount(count);
        }
      } catch (err) {
        console.error('Error fetching waitlist count:', err);
      }
    };

    fetchWaitlistCount();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              waitlistCount={waitlistCount}
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenAbout={() => navigate('/about')}
              onOpenManifesto={() => navigate('/manifesto')}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutOverlay
              onClose={() => navigate('/')}
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenManifesto={() => navigate('/manifesto')}
            />
          }
        />
        <Route
          path="/manifesto"
          element={
            <ManifestoOverlay
              onClose={() => navigate('/')}
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenAbout={() => navigate('/about')}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <PrivacyPolicy
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenAbout={() => navigate('/about')}
              onOpenManifesto={() => navigate('/manifesto')}
            />
          }
        />
        <Route
          path="/support"
          element={
            <Support
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenAbout={() => navigate('/about')}
              onOpenManifesto={() => navigate('/manifesto')}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <Terms
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onOpenAbout={() => navigate('/about')}
              onOpenManifesto={() => navigate('/manifesto')}
            />
          }
        />
      </Routes>

      {/* Global Modals */}
      <WaitlistFlow isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}

export default App;
