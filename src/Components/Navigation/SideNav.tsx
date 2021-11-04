import Navigation from "../Navigation/Navigation";
import { CSSTransition } from "react-transition-group";
import "./SideNav.css";
import { useRef } from "react";

function SideNav({ expanded }: { expanded: boolean }) {
    const itemRef = useRef(null)

    return (
        <CSSTransition nodeRef={itemRef} appear={expanded} in={expanded} classNames={"side-nav"} timeout={300}>
            <div ref={itemRef} className={"side-nav"}>
                <Navigation />
            </div>
        </CSSTransition>
    );
}

export default SideNav;