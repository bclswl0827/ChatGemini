import { useEffect } from "react";
import { Container } from "../components/Container";
import { globalConfig } from "../config/global";

const NotFound = () => {
    const { site: siteTitle } = globalConfig.title;

    useEffect(() => {
        document.title = `404 Not Found | ${siteTitle}`;
    }, [siteTitle]);

    return (
        <Container className="font-semibold text-gray-800 text-lg mx-auto">
            404 Not Found!
        </Container>
    );
};

export default NotFound;
