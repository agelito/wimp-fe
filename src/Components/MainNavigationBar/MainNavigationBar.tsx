import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { GearFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import Settings from "../Settings/Settings";
import './MainNavigationBar.css';

function MainNavigationBar() {
    const { t } = useTranslation();

    const [settingsShow, setSettingsShow] = useState<boolean>(false);

    return (
        <>
            <Navbar bg="light" expand="lg" className={"main-navigation-bar-height"}>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">{t("application_name")}</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setSettingsShow(true)}><GearFill /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Settings show={settingsShow} handleClose={() => setSettingsShow(false)} />
        </>
    );
}

export default MainNavigationBar;