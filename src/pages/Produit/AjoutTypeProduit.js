import React, { Component } from "react"
import MetaTags from 'react-meta-tags';

import { format } from 'date-fns';
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

import Select from "react-select";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import $ from "jquery";
// import ModalMessage from "../pages/messages/ModalMessage"
import Flatpickr from "react-flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import url from "../../common/api"
class AjoutProduit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      typeproduit:[],
      show:false,
      success:true,
      input: {},
      errors: {},
      message:"",
    }
  }

  componentDidMount() {
    $("#chargement").hide()
    $("#echecSauv").hide()
    $("#profile").hide()
    $("#valideFile").hide()
  }

  handleCreer=()=>{

    var date=new Date();

    $("#initial").hide()
    $("#chargement").show()

    var data= {
      "name": $("#nom").val(),
    }
    // console.log("donnee transmises:",data)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json'},
      body: JSON.stringify(data)
    };

    if(($("#nom").val()=="")){
      $("#initial").show()
      $("#chargement").hide()
      this.setState({message:"Please fill in the required fields !"})
      $("#echecSauv").show()
      this.setState({show:true,success:false});
    }
    else{
      fetch(url+"productType",requestOptions)
        .then((response) => response.json())
          .then((data) => {
            console.log("okkk====>",data)
            try{
              if(data.id){
                $("#chargement").hide()
                alert("Prouct add with success")
                this.setState({ok: <Redirect to='/ajout-produit'  />});
              }else{
                $("#chargement").hide()
                this.setState({message:"An error occured, please try again !"})
                $("#echecSauv").show()
              }
            }catch(err){
              $("#chargement").hide()
              this.setState({message:"An error occured, please try again !"})
              $("#echecSauv").show()
            }
          });
    }
  }


  handleValidate=()=>{
    if(this.state.success){
      this.setState({ok: <Redirect to='/liste-produit'/>});
    }else{
      this.setState({show:false})
    }
  }

  handleAnnuler=()=>{
    this.setState({ok: <Redirect to='/liste-produit'  />});
  }

  handleErrorNom=(e)=>{
    if(e.target.value!=0){
      $("#valideNom").hide()
      $("#nom").removeClass("is-invalid")
      $("#echecSauv").hide()
    }else{
      $("#valideNom").show()
      $("#nom").addClass("is-invalid")
    }
  }

  render() {

    const { pick } = this.state
    const animatedComponents = makeAnimated();

    return (
      <React.Fragment>
        <div className="page-content">   {this.state.ok}

        <MetaTags>
            <title>Add a new product type</title>
        </MetaTags>
        <Container fluid={true}>
            
            <hr/>

            <Card style={{borderRadius:"25px",borderColor:"#AAD29A",borderWidth:"5px"}}>
              <CardBody>
              <h4 className="text-center mt-2">Add a new product type</h4>
              <hr/>
              <Row className="mt-4"> 
                <Col md="12">
                  <label>Type name * </label>
                  <Input
                    onChange={this.handleErrorNom}
                    className="form-control is-invalid"
                    type="text"
                    id="nom"
                    placeholder="Type name"
                  />
                  <div id="valideNom" class="invalid-feedback">
                    Please enter the product type name.
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-start mt-5 mb-5">
              <Col md="6">
                <Button style={{backgroundColor:"#aad29a", borderColor:"#aad29a",float:"right",borderRadius:"10px"}} id="initial" color="success"

                  onClick={this.handleCreer}
                >
                  Add a product type
                </Button>
                
                <Button style={{float:"right",borderRadius:"10px"}} id="chargement" color="info" className="b-lg" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                  Sending...
                </Button>

              </Col>

              <Col md="6">
                <Button  style={{backgroundColor:"#6A7172",float:"left",borderRadius:"10px"}}  color="secondary" onClick={this.handleAnnuler}>
                  Cancel
                </Button>
              </Col>
            </Row>

              </CardBody>
            </Card>

            <Row className="justify-content-start mt-3 ">
              <Col md="3"></Col>
              <Col md="6">
              <div style={{textAlign:"center"}}>
                <div id="echecSauv" className="alert alert-danger mt-2" role="alert">
                    {this.state.message}
                </div>
              </div>
              </Col>
              <Col md="3"></Col>
            </Row> 

            <hr></hr>

            
          </Container>
          </div>
          
      </React.Fragment>
    )
  }

}
export default AjoutProduit