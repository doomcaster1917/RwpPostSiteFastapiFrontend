// setFromHeader prop handles if user click News/What_happens text. If true it opens home page and automatically scrolls to required text or news
import "./header.css"
import {Link} from "react-router-dom";
import UserTypeLinkHandler from "./UserTypeLinkHandler";


const Header = ({setFromHeader}) => {
    return (
        <div className="header">
            <Link to="/home" onClick={() => setFromHeader('What_happens')} className={'header_links'}> А что,
                собственно, случилось? </Link>
            <Link to="/home" onClick={() => setFromHeader('News')} className={'header_links'}> Новости </Link>
            <Link to="/home" className={'header_links'}> Главная</Link>
            <UserTypeLinkHandler/>
        </div>
    );
};

export default Header