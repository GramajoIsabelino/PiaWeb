import { FormEvent, useState } from 'react';

export function ContactSection() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const subject = encodeURIComponent(`Consulta de ${form.get('name') ?? 'nuevo proyecto'}`);
        const body = encodeURIComponent(
            `Nombre: ${form.get('name') ?? ''}\nEmail: ${form.get('email') ?? ''}\n\n${form.get('message') ?? ''}`,
        );
        window.location.href = `mailto:hola@cliente.com?subject=${subject}&body=${body}`;
    }

    return (
        <section className="contact-section">
            <div className="contact-card contact-intro">
                <p className="section-label">Contacto</p>
                <h2 className="TitleContact">Hablemos de nuevos proyectos</h2>
                <p className="descriptionContact">
                    ¿Buscas dirección creativa, dirección de arte o diseño de interiores? Estoy disponible para desarrollar
                    propuestas con estilo y estrategia.
                </p>

                <button className="button" type="button" onClick={() => setIsFormOpen((open) => !open)} aria-expanded={isFormOpen}>
                    {isFormOpen ? 'Cerrar formulario' : 'Charlemos'}
                </button>

                {isFormOpen && (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            Nombre
                            <input name="name" type="text" required />
                        </label>
                        <label>
                            Email
                            <input name="email" type="email" required />
                        </label>
                        <label>
                            Mensaje
                            <textarea name="message" rows={4} required />
                        </label>
                        <button className="button contact-form__submit" type="submit">Enviar</button>
                    </form>
                )}
            </div>
        </section>
    );
}

