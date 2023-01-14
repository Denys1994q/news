import "./navBtn.sass";

import { Link } from "react-router-dom";

import { NavBtnProps } from "./navBtn.props";

const NavBtn = ({ path, text, arrow }: NavBtnProps): JSX.Element => {
    return (
        <Link
            to={`/${path}`}
            className={arrow === "after" ? "btnRoute btnRoute-arrowAfter" : "btnRoute btnRoute-arrowBefore"}>
            {text}
        </Link>
    );
};

export default NavBtn;
