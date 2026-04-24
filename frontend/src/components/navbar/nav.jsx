import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Logo from './logo';
import { useNavigate } from "react-router-dom";
import "./nav.css";
import { toast } from 'react-toastify';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaBars, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function NavbarNav() {
    const { user, setUser, isHostMode, setIsHostMode } = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cityFromURL = query.get("city") || "";
    const [search, setSearch] = useState(cityFromURL);

    const handleToggle = () => {
        if (!isHostMode) {
            localStorage.setItem("redirectAfter", "host");
            // Become a Host
            if (!user) {
                navigate("/login");
            } else {
                navigate("/account/listings");
            }
        } else {
            // Switch to Travelling
            navigate("/");
            localStorage.setItem("mode", "travel");
            setIsHostMode(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                credentials: "include"
            });

            const result = await response.json();
            if (result.logout) {
                setUser(null);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const mode = localStorage.getItem("mode");
        if (mode === "host") setIsHostMode(true);
    }, []);

    useEffect(() => {
        setSearch(cityFromURL);
    }, [cityFromURL]);

    return (
        <>
            <Navbar expand="lg" bg='body-light' sticky='top' className='border-bottom' style={{ backgroundColor: "#f1f3f5" }}>
                <Container fluid className='px-3 px-sm-5'>
                    <Navbar.Brand
                        style={{ cursor: isHostMode ? "not-allowed" : "pointer" }}
                        onClick={() => {
                            if (!isHostMode) navigate("/");
                        }}
                    >
                        <Logo />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarNavAltMarkup'></Navbar.Toggle>
                    <Navbar.Collapse id='navbarNavAltMarkup'>
                        <Nav className='w-100 d-flex flex-column flex-md-row align-items-center'>
                            <div className="flex-grow-1 d-flex justify-content-center w-100 my-2 my-md-0">
                                <form
                                    className="search-bar w-100"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (search.trim()) {
                                            navigate(`/?city=${search}`);
                                        }
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search destination"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />

                                    <button type="submit">
                                        <FaSearch />
                                    </button>
                                </form>
                            </div>
                            <div className="ms-md-auto d-flex align-items-center flex-nowrap justify-content-center gap-2 mt-2 mt-md-0">
                                <button className="host-toggle-btn me-3" onClick={handleToggle}>
                                    {isHostMode ? "Switch to Travelling" : "Become a Host"}
                                </button>
                                {user && (
                                    <div className="profile d-flex align-items-center">
                                        <div className="avatar me-2" style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>
                                            {user.username[0].toUpperCase()}
                                        </div>
                                    </div>
                                )}
                                <div className="menu-wrapper">
                                    <div className="menu-button" onClick={() => setOpenMenu(!openMenu)}>
                                        <FaBars />
                                    </div>

                                    {openMenu && (
                                        <div className="menu-dropdown">
                                            {!user ? (
                                                <>
                                                    <div onClick={() => navigate("/login")}>Log in or sign up</div>
                                                </>
                                            ) : (
                                                <div onClick={handleLogout}>Logout</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}