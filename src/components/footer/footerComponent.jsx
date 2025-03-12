import './style-footerComponent.css';

export const Footer = () => {
    return (
        <footer className="bg-dark text-white container-fluid pt-3">
                <div className="row">
                    <div className="col-md-4 text-center text-lg-left">
                    <h5 className="h5" >CONTACTO</h5> <hr />
                        <ul className="list-unstyled d-inline-block text-center ul">
                            <li>
                                <p>+54 9 342 4-068-755</p>
                            </li>
                            <li>
                                <p>Bzeccomercce@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 text-center">
                        <h5 className="h5" >RRSS</h5> <hr />
                        <ul className="list-unstyled d-inline-block text-center ul">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=61570647211234" className="text-white" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/bzprint_/" className="text-white" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="moreLinks col-md-4 text-center text-lg-end">
                        <h5 className="h5" >UBICACIÓN</h5> <hr />
                        <ul className="list-unstyled ul">
                            <li>
                                <p>Santa Fe, Argentina</p>
                            </li>
                            <p>3000</p>
                            <li />
                         </ul>
                    </div>
                </div>
                <div className="row mt-3"><hr />
                    <div className="col text-center copy">
                        <p className='pFooter'>&copy; 2025 LOVERA AGUSTIN. TODOS LOS DERECHOS RESERVADOS.</p>
                </div>
            </div>
        </footer>
    );
}

