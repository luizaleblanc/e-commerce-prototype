import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import AboutMe from "./components/AboutMe/AbouteMe";
import Techs from "./components/Techs/Techs";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Container>
      <Header />
      <Banner />
      <AboutMe />
      <Techs />
      <Projects />
      <Footer />
    </Container>
  );
}

export default App;
