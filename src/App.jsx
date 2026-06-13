import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Experiencia from './components/Experiencia/Experiencia.jsx'
import Proyectos from './components/Proyectos/Proyectos.jsx'
import Habilidades from './components/Habilidades/Habilidades.jsx'
import ContactoForm from './components/ContactoForm/ContactoForm.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experiencia />
        <Proyectos />
        <Habilidades />
        <ContactoForm />
      </main>
      <Footer />
    </>
  )
}

export default App
