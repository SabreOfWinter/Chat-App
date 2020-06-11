import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l s4">
              <h5>Product</h5>
              <ul>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/dashboard">API</Link></li>
              </ul>
            </div>
            <div className="col 4 s4">
              <h5>Company</h5>
              <ul>
              <li><a target="_blank" href="https://www.termsandconditionsgenerator.com/live.php?token=Tjxm9ZVrLi5BoetvhgEE7rA8qcKFkMrc">Terms and Conditions</a></li>
                <li><Link to="/">Our ethos</Link></li>
              </ul>
            </div>
            <div className="col 8 s4">
              <h5>More</h5>
              <ul>
              <li><Link to="/pricing">About Us</Link></li>
              <li><a target="_blank" href="https://www.termsandconditionsgenerator.com/live.php?token=Tjxm9ZVrLi5BoetvhgEE7rA8qcKFkMrc">Terms and Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;