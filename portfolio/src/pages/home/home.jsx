import Services from "./services/services";
import Hero from "./hero/hero";
import Project from "./project/project";

function Home() {
    return (
        <>
            <Hero />
            <Project />
            <Services />
        </>
    );
}

export default Home