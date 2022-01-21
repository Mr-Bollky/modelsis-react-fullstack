
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
            //thematique: element.nom,
            prenom: element.prenom,
            //format: element.format.code,
            //langue: element.nom,
            email: element.email,
            //typesystemeirrigue: element.nom,
         
             action: <a > <i onClick={this.handleDetail.bind(this.bind,element.id)} style={{color:"#5FC4E1"}} className="bx bxs-info-circle bx-sm "/> </a>,
            
          }
         
          this.setState({expert:[...this.state.expert,tab]})
        })
      
        
        
       }
       
      );
  }

  handleAjoutExpert=()=>{
    this.setState({ok: <Redirect to='/ajout-expert'  />});
  }

  loading = () => <Spinner animation="grow" />

  render() {

    const data = {
      columns: [
        {
          label: "Nom",
          field: "nom",
          sort: "asc",
          width: 150,
        },
        {
          label: "Prénom",
          field: "prenom",
          sort: "asc",
          width: 270,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 270,
        },
      
        {
          label: "Détail",
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

            <Card style={{borderRadius:"65px",borderColor:"#BBB78B",borderWidth:"5px"}}>
              <CardBody>
                <Row>
                  <Col lg="6" md="6" sm="12" className="mb-2">
                    <div className="form-outline" class="form">
                      <input
                        type="search"
                        className="form-control "
                        placeholder="Saisissez votre recherche..."
                        style={{borderRadius:"40px"}}
                      />
                    </div>
                  </Col>
                  <Col lg="6" md="6" sm="12" className="pull-right">
                    <Button
                      color="success"
                      className="font-16 btn-block btn   float-right"
                      onClick={this.handleAjoutExpert}
                     
                      style={{backgroundColor:"#aad29a", borderColor:"#aad29a",float:"right",borderRadius:"40px"}}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      Ajouter un nouvel expert
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Row>
              <Col className="col-12 mt-4">
              {/* {
                (this.state.chargement)?
        */}
                <Card style={{borderRadius:"25px",borderColor:"#6A7172",borderWidth:"5px"}}>
                  <CardBody>
                    <CardTitle className="h4 mb-5">
                      LISTE DES EXPERTS 
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
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
export default ListeProduit