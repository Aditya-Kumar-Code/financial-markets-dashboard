
import {Link } from "react-router-dom";

function Header() {
    return <><nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">InveBiz</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Mutual Funds</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Commodities</a>
          </li>
          
         
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          
          
        </form>
        <Link to="/login">
        <button class="btn btn-outline-success" action="/login"type="submit">Login</button>
        </Link>
        
      </div>
    </div>
  </nav></>;
  }
export default Header