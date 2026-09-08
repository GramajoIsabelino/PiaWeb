import type { CSSProperties } from 'react';

type Project = {
    title: string;
    description: string;
    image: string;
    color: string;
    kind: 'image' | 'copy';
};

const projects: Project[] = [
    {
        title: 'Asesorías /',
        description: 'Dirección creativa',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
        color: '#b8c1e0',
        kind: 'image',
    },
    {
        title: 'Fotografía',
        description: 'Imagen, concepto y narrativa visual.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
        color: '#d9d4cc',
        kind: 'image',
    },
    {
        title: 'Diseño de interiores',
        description: 'Diseño de ambientes cálidos con detalles contemporáneos.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        color: '#929a81',
        kind: 'image',
    },
];

export function ProjectsSection() {
    return (
        <section className="projects-section">
            <div className="project-grid">
                {projects.map((project) => (
                    <article
                        key={project.title}
                        className={`project-card project-card--${project.kind}`}
                        style={{ '--project-color': project.color } as CSSProperties}
                    >
                        {project.kind === 'image' ? (
                            <>
                                <div
                                    className="project-photo"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className="project-card__footer">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </>
                        ) : (
                            <p className="project-card__message">
                                {project.title}
                                <br />
                                {project.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
// export default ProjectsSection;
