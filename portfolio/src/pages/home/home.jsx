import { useLogo } from "../../components/useSiteSettings";

function Home() {
    const logoData = useLogo();
    return (
        <div>
            <h1>Home</h1>
            {JSON.stringify(logoData)}
            <img src={logoData?.logo} />
        </div>
    );
}

export default Home