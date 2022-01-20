import React, { Component } from "react"
import PropTypes from 'prop-types'

import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions"
import  { Redirect } from 'react-router-dom'
import $ from "jquery";
import url from "../../common/api"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      message:"Incorect login or password !"
    }

  this.handleValidSubmit.bind(this)
  }

  handleValidSubmit=() =>{
    this.setState({message:"Incorect login or password !"})
    if($("#email").val()!="" && $("#password").val()!="" ){
        $("#btn-charge").css("display","block")
        $("#btn-connexion").css("display","none")
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify({"email":$("#email").val(),"password":$("#password").val()})
    };
    
  
    fetch(url+'user/login',requestOptions)
      .then(response => response.json())
      .then(data =>{console.log("data login:",data)
  
      if(data.length>0){
        $("#btn-charge").css("display","none")
        $("#btn-connexion").css("display","block")
        $("#echecAuth").css("display","none")
        localStorage.setItem("authAshia", JSON.stringify(data[0]))
        if(data[0].status=="DESACTIVE"){
          this.setState({message:"Votre compte est suspendu;veuillez contacter votre administrateur"})
          $("#btn-charge").css("display","none")
          $("#btn-connexion").css("display","block")
          $("#echecAuth").css("display","block")
        }else{
          this.setState({ok: <Redirect to='/accueil'  />})
        }
      }else{
        $("#btn-charge").css("display","none")
        $("#btn-connexion").css("display","block")
        $("#echecAuth").css("display","block")
      }
    })
  }
  
  componentDidMount() {
    this.props.apiError("")
    $("#echecAuth").css("display","none")
    $("#btn-charge").css("display","none")

  }

  signIn = (res, type) => {
    const { socialLogin } = this.props
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    }
  }

  //handleGoogleLoginResponse
  googleResponse = response => {
    this.signIn(response, "google")
  }

  //handleTwitterLoginResponse
  twitterResponse = () => { }

  //handleFacebookLoginResponse
  facebookResponse = response => {
    this.signIn(response, "facebook")
  }

  render() {
    return (
      <React.Fragment> {this.state.ok}
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">

                  <CardBody className="pt-0">
                    
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                      >
                        {this.props.error && this.props.error ? (
                          <Alert color="danger">{this.props.error}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            id="email"
                            // className="form-control"
                            placeholder="Enter your email"
                            // type="email"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                          />
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-info btn-block waves-effect waves-light"
                            onClick={this.handleValidSubmit}
                            style={{backgroundColor:"#5FC4E1"}}
                            id="btn-connexion"
                          >
                            Se connecter
                          </button>
                          <button
                            className="btn btn-info btn-block waves-effect waves-light"
                            disabled
                            id="btn-charge"
                          >
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                         
                          </button>
                        </div>
                      </AvForm>
                    </div>
                    <div>
                    <div id="echecAuth" class="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)
