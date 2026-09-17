import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';

const imageFiles = import.meta.glob('../assets/Images/**/*', {
    eager: true,
    import: 'default',
    query: '?url',
}) as Record<string, string>;

export type Category = 'Asesoria' | 'Fotografia' | 'DiseñoInteriores';

type Project = {
    title: string;
    description: string;
    category: Category;
    image: string;
    color: string;
};

const projects: Project[] = [
    {
        title: 'Asesorías /',
        description: 'Dirección creativa',
        category: 'Asesoria',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
        color: '#b8c1e0',
    },
    {
        title: 'Fotografía',
        description: 'Imagen, concepto y narrativa visual.',
        category: 'Fotografia',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
        color: '#d9d4cc',
    },
    {
        title: 'Diseño de interiores',
        description: 'Diseño de ambientes cálidos con detalles contemporáneos.',
        category: 'DiseñoInteriores',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        color: '#929a81',
    },
];

const categoryNames: Record<Category, string> = {
    Asesoria: 'Dirección creativa',
    Fotografia: 'Fotografía',
    DiseñoInteriores: 'Diseño de interiores',
};

function readableProjectName(name: string) {
    return name
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim();
}

export function PortfolioPage({ category, onClose }: { category: Category; onClose: () => void }) {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const categoryImages = useMemo(() => {
        const grouped = new Map<string, string[]>();

        Object.entries(imageFiles).forEach(([path, url]) => {
            const parts = path.split('/');
            const projectName = parts[parts.length - 2];
            if (parts[parts.length - 3] !== category || !projectName) return;
            grouped.set(projectName, [...(grouped.get(projectName) ?? []), url]);
        });

        return Array.from(grouped.entries()).map(([name, images]) => ({
            name,
            images,
            cover: images[0],
        }));
    }, [category]);

    const activeProject = categoryImages.find((project) => project.name === selectedProject);
    const selectedImage = activeProject && selectedImageIndex !== null
        ? activeProject.images[selectedImageIndex]
        : null;

    useEffect(() => {
        if (!selectedProject && selectedImageIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (selectedImageIndex !== null) {
                    setSelectedImageIndex(null);
                } else {
                    setSelectedProject(null);
                }
            }

            if (selectedImageIndex !== null && activeProject) {
                if (event.key === 'ArrowRight') {
                    setSelectedImageIndex((index) => index === null ? 0 : (index + 1) % activeProject.images.length);
                }
                if (event.key === 'ArrowLeft') {
                    setSelectedImageIndex((index) => index === null
                        ? activeProject.images.length - 1
                        : (index - 1 + activeProject.images.length) % activeProject.images.length);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeProject, selectedImageIndex, selectedProject]);

    return (
        <div className="portfolio-page">
            <header className="portfolio-topbar">
                <button className="portfolio-home" type="button" onClick={onClose} aria-label="Volver al inicio">
                    ←
                </button>
            </header>

            <main
                className="portfolio-strip"
                aria-label={`Portfolio de ${categoryNames[category]}`}
                onWheel={(event) => {
                    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                        event.currentTarget.scrollLeft += event.deltaY;
                    }
                }}
            >
                {categoryImages.map((project) => (
                    <button
                        className="portfolio-strip__item"
                        type="button"
                        key={project.name}
                        onClick={() => setSelectedProject(project.name)}
                    >
                        <div className="portfolio-strip__title">
                            <h2>{readableProjectName(project.name)}</h2>
                            <p>{categoryNames[category]}</p>
                        </div>
                        <img src={project.cover} alt={readableProjectName(project.name)} />
                    </button>
                ))}
            </main>

            {activeProject && (
                <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={readableProjectName(activeProject.name)}>
                    <button className="portfolio-modal__close" type="button" onClick={() => setSelectedProject(null)}>
                        ×
                    </button>
                    <div className="portfolio-modal__content">
                        <p className="section-label">{categoryNames[category]}</p>
                        <h3>{readableProjectName(activeProject.name)}</h3>
                        <div className="portfolio-gallery">
                            {activeProject.images.map((image, index) => (
                                <button
                                    className="portfolio-gallery__image"
                                    key={image}
                                    type="button"
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img src={image} alt={`${readableProjectName(activeProject.name)} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                    {selectedImage && selectedImageIndex !== null && (
                        <div className="image-lightbox" role="dialog" aria-modal="true">
                            <button className="image-lightbox__close" type="button" onClick={() => setSelectedImageIndex(null)}>
                                ×
                            </button>
                            <button
                                className="image-lightbox__arrow image-lightbox__arrow--previous"
                                type="button"
                                aria-label="Imagen anterior"
                                onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + activeProject.images.length) % activeProject.images.length)}
                            >
                                ←
                            </button>
                            <img src={selectedImage} alt={readableProjectName(activeProject.name)} />
                            <button
                                className="image-lightbox__arrow image-lightbox__arrow--next"
                                type="button"
                                aria-label="Imagen siguiente"
                                onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % activeProject.images.length)}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function ProjectsSection({ onSelectCategory }: { onSelectCategory: (category: Category) => void }) {
    return (
        <section className="projects-section">
            <div className="project-grid">
                {projects.map((project) => (
                    <button
                        key={project.title}
                        type="button"
                        className="project-card project-card--image"
                        style={{ '--project-color': project.color } as CSSProperties}
                        onClick={() => onSelectCategory(project.category)}
                    >
                        <div
                            className="project-photo"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="project-card__footer">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <span className="project-card__link">Ver proyectos →</span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
