import React from "react";
import '../Footer/Footer.css'

const Footer = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <footer className="footer">
            <p>All rights reserved by Electronics Service Pvt Ltd.</p>
            <p>
                Powered by: fakestoreapi Pvt Ltd | &copy; {year} —{" "}
                <strong>Electronics Products</strong>
            </p>
        </footer>
    );
};

export default Footer;
