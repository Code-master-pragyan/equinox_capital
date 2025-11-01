import React from "react";

function Footer() {
    return (
        <div className="footer bg-light border-top mt-5">
            <div className="container p-5" style={{ padding: "3rem" }}>
                <div className="row">
                    <div className="col-3 rights">
                        <img src="/media/images/logo.svg" alt="logo" style={{ width: "50%" }} />
                        <p style={{ fontSize: "0.8rem", width: "90%", marginTop: "1rem", fontWeight: "400", color: "rgba(0, 0, 0, 0.46)" }}>&copy; 2010 - 2025, Not Zerodha Broking Ltd.<br></br> All rights reserved.</p>
                        <ul className="social">
                            <li><a href=""><i className="fa-brands fa-x-twitter"></i></a></li>
                            <li><a href=""><i className="fa-brands fa-square-facebook"></i></a></li>
                            <li><a href=""><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href=""><i className="fa-brands fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4 company-foot">
                                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Company</h3>
                                <a href="">About</a>
                                <a href="">Products</a>
                                <a href="">Pricing</a>
                                <a href="">Refferal programme</a>
                                <a href="">Careers</a>
                                <a href="">Zerodha.tech</a>
                                <a href="">Press & media</a>
                                <a href="">Zerodha cares(CSR)</a>
                            </div>
                            <div className="col-4 support-foot">
                                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Support</h3>
                                <a href="">Contact</a>
                                <a href="">Support portal</a>
                                <a href="">Z-Connect blog</a>
                                <a href="">List of charges</a>
                                <a href="">Downloads & resources</a>
                            </div>
                            <div className="col-4 account-foot">
                                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Account</h3>
                                <a href="">Open an account</a>
                                <a href="">Fund transfer</a>
                                <a href="">60 day challenge</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 footer-text">
                    <p>Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a className="text-decoration-none" href="mailto:complaints@zerodha.com">complaints@zerodha.com</a>, for DP related to <a className="text-decoration-none" href="mailto:dp@zerodha.com">dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
                    <p>Procedure to file a complaint on <a className="text-decoration-none" rel="nofollow" href="https://scores.sebi.gov.in/" target="_blank">SEBI SCORES</a>: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>
                    <p><a className="text-decoration-none" rel="nofollow" href="https://smartodr.in/" target="_blank">Smart Online Dispute Resolution</a> | <a className="text-decoration-none" href="https://zerodha-common.s3.ap-south-1.amazonaws.com/Downloads-and-resources/Smart%20ODR%20info.pdf" target="_blank">Grievances Redressal Mechanism</a></p>
                    <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
                    <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
                    <p>India's largest broker based on networth as per NSE. <a className="text-decoration-none" rel="nofollow" href="https://enit.nseindia.com/MemDirWeb/brokerDetailPage_Beta?memID=2516&amp;h_MemType=members&amp;memName=ZERODHA%20BROKING%20LIMITED" target="_blank">NSE broker factsheet</a></p>
                    <p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please <a className="text-decoration-none" href="https://support.zerodha.com/category/your-zerodha-account/your-profile/ticket-creation/articles/how-do-i-place-a-complaint-at-zerodha">create
                        a ticket here</a>.</p>
                </div>
            </div>

        </div>
    )
}

export default Footer;