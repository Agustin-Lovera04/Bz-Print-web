import { useRef, useEffect } from 'react';
import './style.css';
import fotoAle from "/public/images/foto ale.jpg"
import foto1 from '/public/images/foto1.jpg'
import foto3 from '/public/images/foto3.jpg'
import foto5 from '/public/images/foto5.jpg'

const Historia = () => {
  const parallaxRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Efecto parallax más intenso
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }

      // Efecto de aparición para el contenido
      if (contentRef.current) {
        const contentPosition = contentRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (contentPosition < windowHeight * 0.8) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
      }

      // Animación de las tarjetas
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const cardPosition = card.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (cardPosition < windowHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transitionDelay = `${index * 0.15}s`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const historiaData = [
    {
      title: "Los comienzos",
      content: "BZ nació de una necesidad y de muchas ganas de salir adelante. Mi nombre es Alejo Bazquez, tengo 21 años y soy el fundador de esta empresa que hoy ya lleva un año y medio recorriendo su camino en el rubro educativo. Empezamos literalmente desde cero: con una impresora prestada, tinta y hojas que me regalaban porque no tenía ni para eso. Fue una ayuda clave de mi novia la que me permitió dar el primer paso.",
      image: fotoAle,
      color: "hsla(15, 100%, 70%, 0.9)"
    },
    {
      title: "Primeros pasos",
      content: "Poco a poco empecé a construir. Primero logré comprar mis propias hojas, después la tinta, y con muchísimo esfuerzo, trabajo y más de un tropiezo, empezamos a sumar nuestros primeros equipos. Algunos los canjeaba por cosas que tenía en casa, otros los compraba rotos y los arreglaba. Así fue creciendo BZ, sumando también personas al equipo. Algunos estuvieron un tiempo, otros siguen hasta hoy, pero la esencia no cambió: ayudar a los estudiantes y hacerles la vida más fácil.",
      image: foto1,
      color: "hsla(30, 100%, 70%, 0.9)"
    },
    {
      title: "Nuestra misión",
      content: "Nuestro objetivo siempre fue claro: facilitar el acceso a lo que los estudiantes necesitan —desde un apunte hasta una mochila o un termo— sin que tengan que moverse de su casa, con un servicio rápido, confiable y pensado para ellos.",
      image: foto3,
      color: "hsla(220, 60%, 70%, 0.9)"
    },
    {
      title: "El futuro",
      content: "Pasamos de trabajar con equipos rotos a contar con 10 impresoras nuevas, ofreciendo el mejor servicio al mejor precio. Eso es BZ: un grupo de pibes con hambre de crecer, con ganas de revolucionar una pequeña parte del mundo —la educación— y con la convicción de que lo que viene, va a ser aún mejor.",
      image: foto5,
      color: "hsla(90, 60%, 70%, 0.9)"
    }
  ];

  return (
    <div className="historia-container">
      {/* Sección Hero con parallax */}
      <div className="parallax-section" ref={parallaxRef}>
        <div className="hero-content">
          <h1>Nuestra Historia</h1>
          <p>Un viaje de pasión, esfuerzo y crecimiento constante</p>
          <i class="bi bi-arrow-down-circle-fill scroll-indicator"></i>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="historia-content" ref={contentRef}>
        <div className="timeline">
          {historiaData.map((item, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="historia-card"
              style={{ '--card-color': item.color }}
            >
              <div className="card-text">
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
              <div className="card-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="card-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="final-quote mb-4">
          <blockquote>
            "El cliente que se va por precio volverá por servicio y el cliente que se va por servicio no volverá por ningún precio"
            <footer>- Alejo Bazquez, Fundador de BZ</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Historia;