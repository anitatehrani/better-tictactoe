import {Routes, Route, Outlet, Link} from "react-router-dom";
import {CheckName} from "./pages/CheckName";
import {Home} from "./pages/Home";
import {CheckUser} from "./pages/CheckUser";
import "./App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="check-name" element={<CheckName/>}/>
                <Route path="check-user" element={<CheckUser/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Route>
        </Routes>
    );
}

function Layout() {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav-list">
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    <li><Link className="nav-link" to="/check-name">Check Name</Link></li>
                    <li><Link className="nav-link" to="/check-user">Check User</Link></li>
                </ul>
            </nav>

            <div className="page-container">
                <Outlet/>
            </div>
        </div>
    );
}

function NoMatch() {
    return (
        <div className="page-container">
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
