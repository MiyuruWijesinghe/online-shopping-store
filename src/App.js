import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/dashboard-styles.css";
import "./styles/footer-styles.css";
import "./styles/common-styles.css"
import "./styles/slide-show.css"
import cartImage from "./images/shopping.jpg";

import AuthService from "./services/auth.service";
import Home from "./components/Common/Home";
import Login from "./components/Common/Login";
import Register from "./components/Common/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EditorDashboard from "./components/Dashboard/EditorDashboard";
import ReviewerDashboard from "./components/Dashboard/ReviewerDashboard";
import ResearcherDashboard from "./components/Dashboard/ResearcherDashboard";
import WorkshopConductorDashboard from "./components/Dashboard/WorkshopConductorDashboard";
import RoleList from "./components/Roles/RoleList";
import AddRole from "./components/Roles/AddRole";
import ViewRole from "./components/Roles/ViewRole";
import ConferenceListAdmin from "./components/Conference/ConferenceListAdmin";
import AddConference from "./components/Conference/AddConference";
import ViewConferenceAdmin from "./components/Conference/ViewConferenceAdmin";
import ConferenceList from "./components/Conference/ConferenceList";
import ViewConference from "./components/Conference/ViewConference";
import ConferenceDetailsList from "./components/ConferenceDetails/ConferenceDetailsList";
import AddConferenceDetails from "./components/ConferenceDetails/AddConferenceDetails";
import ViewConferenceDetails from "./components/ConferenceDetails/ViewConferenceDetails";
import ConferenceDetailsListAdmin from "./components/ConferenceDetails/ConferenceDetailsListAdmin";
import ApproveRejectConferenceDetails from "./components/ConferenceDetails/ApproveRejectConferenceDetails";
import TrackList from "./components/ConferenceTracks/TrackList";
import AddTrack from "./components/ConferenceTracks/AddTrack";
import ViewTrack from "./components/ConferenceTracks/ViewTrack";
import TrackListAdmin from "./components/ConferenceTracks/TrackListAdmin";
import ApproveRejectTrack from "./components/ConferenceTracks/ApproveRejectTrack";
import NotificationBoxEditor from "./components/Notifications/NotificationBoxEditor";
import ViewNotificationEditor from "./components/Notifications/ViewNotificationEditor";
import NotificationBoxResearcher from "./components/Notifications/NotificationBoxResearcher";
import ViewNotificationResearcher from "./components/Notifications/ViewNotificationResearcher";
import NotificationBoxWorkshopConductor from "./components/Notifications/NotificationBoxWorkshopConductor";
import ViewNotificationWorkshopConductor from "./components/Notifications/ViewNotificationWorkshopConductor";
import KeyNoteSpeakerList from "./components/KeynoteSpeakers/KeyNoteSpeakerList";
import AddKeyNoteSpeaker from "./components/KeynoteSpeakers/AddKeyNoteSpeaker";
import ViewKeyNoteSpeaker from "./components/KeynoteSpeakers/ViewKeyNoteSpeaker";
import KeyNoteSpeakerListAdmin from "./components/KeynoteSpeakers/KeyNoteSpeakerListAdmin";
import ApproveRejectKeyNoteSpeaker from "./components/KeynoteSpeakers/ApproveRejectKeyNoteSpeaker";
import ResearchList from "./components/Research/ResearchList";
import AddResearch from "./components/Research/AddResearch";
import ViewResearch from "./components/Research/ViewResearch";
import ResearchListReviewer from "./components/Research/ResearchListReviewer";
import ApproveRejectResearch from "./components/Research/ApproveRejectResearch";
import ResearchListAdmin from "./components/Research/ResearchListAdmin";
import ViewResearchAdmin from "./components/Research/ViewResearchAdmin";
import WorkshopList from "./components/Workshops/WorkshopList";
import AddWorkshop from "./components/Workshops/AddWorkshop";
import ViewWorkshop from "./components/Workshops/ViewWorkshop";
import WorkshopListReviewer from "./components/Workshops/WorkshopListReviewer";
import ApproveRejectWorkshop from "./components/Workshops/ApproveRejectWorkshop";
import WorkshopListAdmin from "./components/Workshops/WorkshopListAdmin";
import ViewWorkshopAdmin from "./components/Workshops/ViewWorkshopAdmin";
import KeynotesFront from "./components/Common/KeynotesFront";
import ViewKeyNoteFront from "./components/Common/ViewKeyNoteFront";
import TracksFront from "./components/Common/TracksFront";
import WorkshopsFront from "./components/Common/WorkshopsFront";
import ViewWorkshopsFront from "./components/Common/ViewWorkshopsFront";
import ResearchFront from "./components/Common/ResearchFront";
import ViewResearchFront from "./components/Common/ViewResearchFront";
import ResearchDownloads from "./components/Common/ResearchDownloads";
import WorkshopsDownloads from "./components/Common/WorkshopsDownloads";
import LatestNews from "./components/Common/LatestNews";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showEditorBoard: false,
      showResearcherBoard: false,
      showReviewerBoard: false,
      showWorkshopBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("ROLE_ADMIN"),
        showEditorBoard: user.role.includes("ROLE_EDITOR"),
        showResearcherBoard: user.role.includes("ROLE_RESEARCHER"),
        showReviewerBoard: user.role.includes("ROLE_REVIEWER"),
        showWorkshopBoard: user.role.includes("ROLE_WORKSHOP_CONDUCTOR"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard, showEditorBoard, showResearcherBoard, showReviewerBoard, showWorkshopBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand" ><img src={cartImage} style={{height: '50px', width: '50px'}}/>&nbsp; <b>BuyTNow</b></Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link" ><i className="fa fa-user-secret"></i>&nbsp; Admin</Link>
                </li>
            )}

            {showEditorBoard && (
                <li className="nav-item">
                  <Link to={"/editor"} className="nav-link" ><i className="fa fa-user-circle-o"></i>&nbsp; Editor</Link>
                </li>
            )}

            {showResearcherBoard && (
                <li className="nav-item">
                  <Link to={"/researcher"} className="nav-link" ><i className="fa fa-user-circle-o"></i>&nbsp; Researcher</Link>
                </li>
            )}

            {showReviewerBoard && (
                <li className="nav-item">
                  <Link to={"/reviewer"} className="nav-link" ><i className="fa fa-user-circle-o"></i>&nbsp; Reviewer</Link>
                </li>
            )}

            {showWorkshopBoard && (
                <li className="nav-item">
                  <Link to={"/workshop-conductor"} className="nav-link" ><i className="fa fa-user-circle-o"></i>&nbsp; Workshop Conductor</Link>
                </li>
            )}

          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={ "/profile" } className="nav-link">
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
                  <Link to={"/"} className="nav-link">Register</Link>
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
            <Route path="/register/:name" component={Register} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/editor" component={EditorDashboard} />
            <Route path="/reviewer" component={ReviewerDashboard} />
            <Route path="/researcher" component={ResearcherDashboard} />
            <Route path="/workshop-conductor" component={WorkshopConductorDashboard} />
            <Route path="/roles" component={RoleList} />
            <Route path="/role/add" component={AddRole} />
            <Route path="/role/:id" component={ViewRole} />
            <Route path="/conferences-admin" component={ConferenceListAdmin} />
            <Route path="/conference/add" component={AddConference} />
            <Route path="/conference-admin/:id" component={ViewConferenceAdmin} />
            <Route path="/conferences" component={ConferenceList} />
            <Route path="/conference/:id" component={ViewConference} />
            <Route path="/conference-details" component={ConferenceDetailsList} />
            <Route path="/conference-detail/add" component={AddConferenceDetails} />
            <Route path="/conference-detail/:id" component={ViewConferenceDetails} />
            <Route path="/conference-details-admin" component={ConferenceDetailsListAdmin} />
            <Route path="/conference-detail-admin/:id" component={ApproveRejectConferenceDetails} />
            <Route path="/tracks" component={TrackList} />
            <Route path="/track/add" component={AddTrack} />
            <Route path="/track/:id" component={ViewTrack} />
            <Route path="/tracks-admin" component={TrackListAdmin} />
            <Route path="/track-admin/:id" component={ApproveRejectTrack} />
            <Route path="/notifications-editor" component={NotificationBoxEditor} />
            <Route path="/notification-editor/:id" component={ViewNotificationEditor} />
            <Route path="/notifications-researcher" component={NotificationBoxResearcher} />
            <Route path="/notification-researcher/:id" component={ViewNotificationResearcher} />
            <Route path="/notifications-workshop-conductor" component={NotificationBoxWorkshopConductor} />
            <Route path="/notification-workshop-conductor/:id" component={ViewNotificationWorkshopConductor} />
            <Route path="/keynote-speakers" component={KeyNoteSpeakerList} />
            <Route path="/keynote-speaker/add" component={AddKeyNoteSpeaker} />
            <Route path="/keynote-speaker/:id" component={ViewKeyNoteSpeaker} />
            <Route path="/keynote-speakers-admin" component={KeyNoteSpeakerListAdmin} />
            <Route path="/keynote-speaker-admin/:id" component={ApproveRejectKeyNoteSpeaker} />
            <Route path="/researches" component={ResearchList} />
            <Route path="/research/add" component={AddResearch} />
            <Route path="/research/:id" component={ViewResearch} />
            <Route path="/researches-reviewer" component={ResearchListReviewer} />
            <Route path="/research-reviewer/:id" component={ApproveRejectResearch} />
            <Route path="/researches-admin" component={ResearchListAdmin} />
            <Route path="/research-admin/:id" component={ViewResearchAdmin} />
            <Route path="/workshops" component={WorkshopList} />
            <Route path="/workshop/add" component={AddWorkshop} />
            <Route path="/workshop/:id" component={ViewWorkshop} />
            <Route path="/workshops-reviewer" component={WorkshopListReviewer} />
            <Route path="/workshop-reviewer/:id" component={ApproveRejectWorkshop} />
            <Route path="/workshops-admin" component={WorkshopListAdmin} />
            <Route path="/workshop-admin/:id" component={ViewWorkshopAdmin} />
            <Route path="/common-keynotes" component={KeynotesFront} />
            <Route path="/common-keynote/:id" component={ViewKeyNoteFront} />
            <Route path="/common-tracks" component={TracksFront} />
            <Route path="/common-workshops" component={WorkshopsFront} />
            <Route path="/common-workshop/:id" component={ViewWorkshopsFront} />
            <Route path="/common-researches" component={ResearchFront} />
            <Route path="/common-research/:id" component={ViewResearchFront} />
            <Route path="/research-downloads" component={ResearchDownloads} />
            <Route path="/workshop-downloads" component={WorkshopsDownloads} />
            <Route path="/common-news" component={LatestNews} />

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

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
