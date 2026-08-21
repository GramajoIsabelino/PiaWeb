type Project = {
    title: string;
    category: string;
    description: string;
    image: string;
};

const projects: Project[] = [
    {
        title: 'Colección editorial',
        category: 'Dirección creativa',
        description: 'Concepto visual y narrativa de campaña para lanzamiento.',
        image: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Identidad sensorial',
        category: 'Dirección de arte',
        description: 'Tono visual, paleta y fotografía para marca premium.',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Espacio doméstico',
        category: 'Diseño de interiores',
        description: 'Diseño de ambientes cálidos con detalles contemporáneos.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    },
];

export function ProjectsSection() {
    return (
        <section className="projects-section">
            <div className="section-heading">
                {/* <p className="section-label">Proyectos destacados</p> */}
                {/* <h2>Trabajo por categoría</h2> */}
            </div>
            <div className="project-grid ">
                {projects.map((project) => (
                    <article key={project.title} className="project-card">
                        <div
                            className="project-image card2"
                            style={{ backgroundImage: `url(${project.image})` }}
                        >
                            <span className="project-category">{project.category}</span>
                        </div>
                        <div className="project-copy ">
                            <h3 className="Title">{project.title}</h3>
                            <p className="description">{project.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

// export default ProjectsSection;
