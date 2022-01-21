import React from "react"
import { Redirect } from "react-router-dom"

// Produit
import AjoutProduit from "../pages/Produit/AjoutProduit"
import ModifierProduit from "../pages/Produit/ModifierProduit"
import ListeProduit from "../pages/Produit/ListeProduit"
import AjoutTypeProduit from "../pages/Produit/AjoutTypeProduit"

const authProtectedRoutes = [

  //Produit
  { path: "/ajout-produit", component: AjoutProduit },
  { path: "/liste-produit", component: ListeProduit },
  { path: "/modifier-produit", component: ModifierProduit },
  { path: "/ajout-type-produit", component: AjoutTypeProduit },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
]

export { authProtectedRoutes, publicRoutes }
