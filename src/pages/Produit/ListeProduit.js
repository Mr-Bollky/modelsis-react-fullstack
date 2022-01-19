
import React, { Component,Suspense } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
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
  Spinner
} from "reactstrap"

import Select from "react-select"
import {component} from "react-select"
import axios from 'axios'
import  { Redirect,useHistory } from 'react-router-dom'
// import $ from "jquery";import { useHistory } from "react-router-dom";

import Flatpickr from "react-flatpickr"
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';
import url from "../../common/api"
//import BootstrapSelect from "bootstrap-select"

class ListeProduit extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      expertData:[],
      expert:[],
      chargement:false,
       
    }
    this.handleDetail.bind(this)
  }
  componentDidMount() {
    this.handleChargerData()
  }

  handleDetail=(id)=>{
    localStorage.setItem('idexpert',id);
    this.setState({ok: <Redirect to='/detail-expert'  />});
  }


  handleChargerData=()=>{
    var data=JSON.parse(localStorage.getItem("authAshia")).profile
   
   fetch(url+"profiles/"+data.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({expertData:data.utilisateurs,chargement:true})
        data.utilisateurs.filter(e=>e.fonction=="EXPERT").map((element,idx) =>{
          var tab= {
            nom: element.nom,
            prenom: element.prenom,
            email: element.email,
            action: <a > <i onClick={this.handleDetail.bind(this.bind,element.id)} style={{color:"#5FC4E1"}} className="bx bxs-info-pencil bx-sm "/> </a>, 
          }
          this.setState({expert:[...this.state.expert,tab]})
        })
      
        
        
       }
       
      );
  }

  handleAjoutProduit=()=>{
    this.setState({ok: <Redirect to='/ajout-produit'  />});
  }

  loading = () => <Spinner animation="grow" />

  render() {

    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "nom",
          sort: "asc",
          width: 270,
        },
        {
          label: "Date created",
          field: "date",
          sort: "asc",
          width: 270,
        },
        {
          label: "Type",
          field: "type",
          sort: "asc",
          width: 270,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 100,
        },
      ],
       rows:_.sortBy(this.state.expert, 'created_at').reverse()
      //rows:this.state.expert
    }


    return (
      <React.Fragment>
        <div className="page-content"> {this.state.ok}
           
          
          <MetaTags>
            <title >Liste des experts</title>
          </MetaTags>

          <Container fluid={true}>
            <Row>
              <Col md="8">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                </div>
              </Col>
            </Row>

            

            <Row>
              <Col className="col-12 mt-4">
              {/* {
                (this.state.chargement)?
              */}
                <Card style={{borderRadius:"25px",borderColor:"#6A7172",borderWidth:"5px"}}>
                  <CardBody>
                    <CardTitle className="h4 mb-5">
                      PRODUCTS
                    </CardTitle>

                    <p className="card-title-desc">
                    </p>
                    <Suspense fallback={this.loading()}>
                      <MDBDataTable responsive striped bordered data={data} />
                    </Suspense>
                  </CardBody>
                </Card>
                {/* :(
                  <div style={{marginTop:"150px",textAlign:"center"}}>
                    <Spinner type="grow" color="secondary" />
                 </div>
                )
              } */}
              </Col>
            </Row>

            
            <Row>
              <Col lg="6" md="6" sm="12" className="mb-2">
                <Button
                  color="success"
                  className="font-16 btn-block btn float-right"
                  onClick={this.handleAjoutProduit}
                  style={{backgroundColor:"#aad29a", borderColor:"#aad29a",float:"right",borderRadius:"40px"}}
                >
                  <i className="mdi mdi-plus-circle-outline me-1" />
                  Ajouter un nouveau type
                </Button>
              </Col>

              <Col lg="6" md="6" sm="12" className="pull-right">
                <Button
                  color="success"
                  className="font-16 btn-block btn   float-right"
                  onClick={this.handleAjoutProduit}
                  style={{backgroundColor:"#aad29a", borderColor:"#aad29a",float:"right",borderRadius:"40px"}}
                >
                  <i className="mdi mdi-plus-circle-outline me-1" />
                  Ajouter un nouveau produit
                </Button>
              </Col>
            </Row>


          </Container>
        </div>
      </React.Fragment>
    )
  }
}
export default ListeProduit