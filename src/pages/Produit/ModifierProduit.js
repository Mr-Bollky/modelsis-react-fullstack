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


class ModifierProduit extends Component {
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
      "nom": $("#nom").val(), 
      "type_id":$("#type_id option:selected").val(),
    }
    console.log("donnee transmises:",data)

    if(($("#nom").val()=="") || ($("#type_id option:selected").val()=="0") ){
      $("#initial").show()
      $("#chargement").hide()
      this.setState({message:"Please fill in the required fields !"})
      $("#echecSauv").show()
      this.setState({show:true,success:false});
    }
    else{
      postQueries("utilisateurs",data).then(e=>{
        if(e){
          $("#initial").show()
          $("#chargement").hide()
          this.setState({message:"Product add with success !"})
          this.setState({show:true,success:true});
          }else{
          $("#initial").show()
          $("#chargement").hide()
          this.setState({message:"An error occured. Please try again !"})
          this.setState({show:true,success:false});
        }
      })
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

  handleErrorTypeProduit=(e)=>{
    if(e.target.value!=0){
      $("#valideTypeProduit").hide()
      $("#type_id").removeClass("is-invalid")
      $("#echecSauv").hide()
    }else{
      $("#valideTypeProduit").show()
      $("#type_id").addClass("is-invalid")
    }
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
            <title>Add a new product</title>
        </MetaTags>
        <Container fluid={true}>
            
            <hr/>

            <Card style={{borderRadius:"25px",borderColor:"#AAD29A",borderWidth:"5px"}}>
              <CardBody>
              <h4 className="text-center mt-2">Add a new product</h4>
              <hr/>
              <Row className="mt-4"> 
                <Col md="12">
                  <label>Name * </label>
                  <Input
                    onChange={this.handleErrorNom}
                    className="form-control is-invalid"
                    type="text"
                    id="nom"
                    placeholder="Name"
                  />
                  <div id="valideNom" class="invalid-feedback">
                    Please enter the product name.
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md="12">
                  <label>Product type *</label> 
                  <select onChange={this.handleErrorTypeProduit} className="form-select is-invalid" aria-label="Default select example" id="type_id">
                    <option value="0" selected>Product type</option>
                    {/* {
                      this.state.categorie.map((element,idx) =>(
                        <option value={element.value}>{element.label}</option>
                      ))
                    } */}
                  </select>
                  <div id="valideTypeProduit" class="invalid-feedback">
                    Please choose a product type.
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-start mt-5 mb-5">
              <Col md="6">
                <Button style={{backgroundColor:"#aad29a", borderColor:"#aad29a",float:"right",borderRadius:"10px"}} id="initial" color="success"

                  onClick={this.handleCreer}
                >
                  Add the product
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
export default ModifierProduit