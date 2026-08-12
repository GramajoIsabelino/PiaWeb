import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="app-shell">
            <Hero />
            <main>
                < ProjectsSection />
                < ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
