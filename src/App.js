import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/"
import AppRoute from "./routes/route"

// layouts
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getLayout = this.getLayout.bind(this)
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  // onRoutechange() {
  //   alert("hii")
  //   setTimeout(() => {
  //     if (document.getElementsByClassName("mm-active").length > 0) {
  //       console.log(ref.current.el);
  //       const currentPosition = document.getElementsByClassName("mm-active")[0]
  //         .offsetTop
  //         console.log(currentPosition)
  //       if (currentPosition > 500)
  //         this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
  //           currentPosition + 300
  //     }
  //   }, 300)
  // }

  render() {
    const Layout = this.getLayout()

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
