import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/dashboard-styles.css";
import "./styles/footer-styles.css";
import "./styles/common-styles.css";
import "./styles/slide-show.css";
import "./styles/reportlist-styles.css";
import cartImage from "./images/shopping.jpg";

import AuthService from "./services/auth.service";
import Home from "./components/Common/Home";
import Login from "./components/Common/Login";
import Register from "./components/Common/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import SellerDashboard from "./components/Dashboard/SellerDashboard";
import BuyerDashboard from "./components/Dashboard/BuyerDashboard";
import BuyerProfile from "./components/Common/BuyerProfile";
import BuyerUpdateProfile from "./components/Common/BuyerUpdateProfile";
import CategoryList from "./components/Category/CategoryList";
import AddCategory from "./components/Category/AddCategory";
import ViewCategory from "./components/Category/ViewCategory";
import BrandList from "./components/Brand/BrandList";
import AddBrand from "./components/Brand/AddBrand";
import ViewBrand from "./components/Brand/ViewBrand";
import AttributeList from "./components/Attribute/AttributeList";
import AddAttribute from "./components/Attribute/AddAttribute";
import ViewAttribute from "./components/Attribute/ViewAttribute";
import AttributeValueList from "./components/AttributeValue/AttributeValueList";
import AddAttributeValue from "./components/AttributeValue/AddAttributeValue";
import ViewAttributeValue from "./components/AttributeValue/ViewAttributeValue";
import ItemList from "./components/Item/ItemList";
import AddItem from "./components/Item/AddItem";
import ViewItem from "./components/Item/ViewItem";
import ItemAttributeValueList from "./components/ItemAttributeValues/ItemAttributeValueList";
import CategoryListFront from "./components/Common/CategoryListFront";
import ItemListFront from "./components/Common/ItemListFront";
import ViewItemFront from "./components/Common/ViewItemFront";
import AdminReports from "./components/Reports/ReporsList"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showSellerBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("ADMIN"),
        showSellerBoard: user.role.includes("SELLER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }


  render() {
    const { currentUser, showAdminBoard, showSellerBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand" ><img src={cartImage} style={{ height: '50px', width: '50px' }} />&nbsp; <b>BuyTNow</b></Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" ><i className="fa fa-user-secret"></i>&nbsp; Admin</Link>
              </li>
            )}

            {showSellerBoard && (
              <li className="nav-item">
                <Link to={"/seller"} className="nav-link" ><i className="fa fa-user"></i>&nbsp; Seller</Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  <i className="fa fa-user"></i>&nbsp; {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={this.logOut}>
                  &nbsp; LogOut
                </a>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link">
                  <i className="fa fa-shopping-cart"></i>&nbsp; Cart
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">Login</Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/seller" component={SellerDashboard} />
            <Route path="/buyer" component={BuyerDashboard} />
            <Route path="/buyer-profile" component={BuyerProfile} />
            <Route path="/buyer-update-profile" component={BuyerUpdateProfile} />
            <Route path="/categories-admin" component={CategoryList} />
            <Route path="/category/add" component={AddCategory} />
            <Route path="/category-admin/:id" component={ViewCategory} />
            <Route path="/brands" component={BrandList} />
            <Route path="/brand/add" component={AddBrand} />
            <Route path="/brand-admin/:id" component={ViewBrand} />
            <Route path="/attributes" component={AttributeList} />
            <Route path="/attribute/add" component={AddAttribute} />
            <Route path="/attribute/:id" component={ViewAttribute} />
            <Route path="/attribute-values" component={AttributeValueList} />
            <Route path="/attribute-value/add" component={AddAttributeValue} />
            <Route path="/attribute-value/:id" component={ViewAttributeValue} />
            <Route path="/items-admin" component={ItemList} />
            <Route path="/item/add" component={AddItem} />
            <Route path="/item-admin/:id" component={ViewItem} />
            <Route path="/item-attribute-values/:id" component={ItemAttributeValueList} />
            <Route path="/common-categories" component={CategoryListFront} />
            <Route path="/common-items/:id" component={ItemListFront} />
            <Route path="/view-item/:id" component={ViewItemFront} />
            <Route path="/admin-report" component={AdminReports} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
