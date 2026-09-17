import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { PortfolioPage, ProjectsSection, type Category } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function getPortfolioCategory(): Category | null {
    const category = decodeURIComponent(window.location.hash.slice(1));
    return ['Asesoria', 'Fotografia', 'DiseñoInteriores'].includes(category)
        ? category as Category
        : null;
}

function App() {
    const [portfolioCategory, setPortfolioCategory] = useState<Category | null>(getPortfolioCategory);

    useEffect(() => {
        const handleHashChange = () => setPortfolioCategory(getPortfolioCategory());

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (portfolioCategory) {
        return <PortfolioPage category={portfolioCategory} onClose={() => window.location.hash = ''} />;
    }

    return (
        <div className="app-shell">
            <Hero />
            <main className="gradient-untitled" >
                <ProjectsSection onSelectCategory={(category) => { window.location.hash = category; }} />
                < ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
