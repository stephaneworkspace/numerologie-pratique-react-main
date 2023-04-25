import React, { useEffect, useState } from 'react'
import axios from "axios"
//import logo from './logo.svg'
import './App.css'
import 'bulma/css/bulma.min.css'
import {match} from "assert"
/*
<img src={logo} className="App-logo" alt="logo" />
*/

interface FormProps {
  onSubmit: (data: FormData) => void
}

interface FormData {
  date: string
  first_name: string
  second_name: string
  third_name: string
  last_name_1: string
  last_name_2: string
  last_name_3: string
  color: number
}

interface JsonCgiApi {
  chemin_de_vie: [number],
  annee_personelle: {
    annee: number,
    nombre: number
  },
  cycles_adjacents: [{
    cycle: string,
    calcul: string,
    nombre: [number]
  }],
  cycles_realisations: [{
    cycle: string,
    age: string,
    calcul: string,
    nombre: [number]
  }],
  cycles_universels: [{
    cycle: string,
    nombre: number,
  }],
  personalite_juridique: [{
    carre_algo: [[number]],
    personalite_juridique_carre: {
      carre: [[number]],
      nom: string,
    },
    first_name: string,
    first_name_nombre: [number],
    first_name_carre: {
      carre: [[number]],
      nom: string,
    },
    second_name: string,
    second_name_nombre: [number],
    second_name_carre: {
      carre: [[number]],
      nom: string,
    },
    third_name: string,
    third_name_nombre: [number],
    third_name_carre: {
      carre: [[number]],
      nom: string,
    },
    all_first_name_nombre: [number],
    all_first_name_colonnes: {
      nom: string,
      colonne: string,
      nombre: [number],
      total: number,
      total_reduit: number,
      sw1: boolean,
      sw2: boolean
    },
    last_name_1: string,
    last_name_1_nombre: [number],
    last_name_1_carre: {
      carre: [[number]],
      nom: string,
    },
    last_name_2: string,
    last_name_2_nombre: [number],
    last_name_2_carre: {
      carre: [[number]],
      nom: string,
    },
    last_name_3: string,
    last_name_3_nombre: [number],
    last_name_3_carre: {
      carre: [[number]],
      nom: string,
    },
    all_last_name_nombre: [number],
    all_last_name_colonnes: {
      nom: string,
      colonne: string,
      nombre: [number],
      total: number,
      total_reduit: number,
      sw1: boolean,
      sw2: boolean
    },
    tel: {
      tel: string,
      tel_nombre: [number],
      tel_carre: {
        carre: [[number]],
        nom: string,
      }
    },
    mobile: {
      mobile: string,
      mobile_nombre: [number],
      mobile_carre: {
        carre: [[number]],
        nom: string,
      }
    }
  }]
}

function App() {
  const [formData, setFormData] = React.useState<FormData>({
    date: "1984-04-01",
    first_name: "",
    second_name: "",
    third_name: "",
    last_name_1: "",
    last_name_2: "",
    last_name_3: "",
    color: 0
  })
  const [nombres, setNombres] = React.useState<JsonCgiApi>({
    annee_personelle: {annee: 0, nombre: 0},
    chemin_de_vie: [0],
    cycles_adjacents: [{calcul: "", cycle: "", nombre: [0]}],
    cycles_realisations: [{age: "", calcul: "", cycle: "", nombre: [0]}],
    cycles_universels: [{cycle: "", nombre: 0}],
    personalite_juridique: [{
      all_first_name_colonnes: {colonne: "", nom: "", nombre: [0], sw1: false, sw2: false, total: 0, total_reduit: 0},
      all_first_name_nombre: [0],
      all_last_name_colonnes: {colonne: "", nom: "", nombre: [0], sw1: false, sw2: false, total: 0, total_reduit: 0},
      all_last_name_nombre: [0],
      carre_algo: [[0]],
      first_name: "",
      first_name_carre: {carre: [[0]], nom: ""},
      first_name_nombre: [0],
      last_name_1: "",
      last_name_1_carre: {carre: [[0]], nom: ""},
      last_name_1_nombre: [0],
      last_name_2: "",
      last_name_2_carre: {carre: [[0]], nom: ""},
      last_name_2_nombre: [0],
      last_name_3: "",
      last_name_3_carre: {carre: [[0]], nom: ""},
      last_name_3_nombre: [0],
      mobile: {mobile: "", mobile_carre: {carre: [[0]], nom: ""}, mobile_nombre: [0]},
      personalite_juridique_carre: {carre: [[0]], nom: ""},
      second_name: "",
      second_name_carre: {carre: [[0]], nom: ""},
      second_name_nombre: [0],
      tel: {tel: "", tel_carre: {carre: [[0]], nom: ""}, tel_nombre: [0]},
      third_name: "",
      third_name_carre: {carre: [[0]], nom: ""},
      third_name_nombre: [0]
    }]
  })

  /*
  const Checkbox = ({ label, asset, value, onChange }) => {
    return (
        <div>
          <input type="checkbox" name={label} checked={value} onChange={onChange} />
          <label htmlFor={label}>
            <img src={"data:image/svg+xml;base64," + asset} width={20} height={20} alt={label}/> {label}
          </label>
        </div>
    )
  }
  */

  const getNombres = async () => {
    const sw_debug = false
    const sw_debug_ubuntu_desktop = true
    let url = "https://www.numerologie-pratique.net/"
    if (sw_debug) {
      url = "http://localhost:8888/"
    }
    if (sw_debug_ubuntu_desktop) {
      url = "http://localhost/"
    }
    const date = formData.date.split("-")
    // TODO tel et mobile
    url += "cgi-bin/numerologie_core.cgi" +
        "?year=" + date[0] +
        "&month=" + date[1] +
        "&day=" + date[2] +
        "&first_name=" + formData.first_name +
        "&second_name=" + formData.second_name +
        "&third_name=" + formData.third_name +
        "&last_name_1=" + formData.last_name_1 +
        "&last_name_2=" + formData.last_name_2 +
        "&last_name_3=" + formData.last_name_3
    const response = await axios.get(url)
    const data = await response.data
    setNombres(data)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    getNombres()
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  useEffect(() => {
    getNombres()
  }, [])

  const [selectValue, setSelectValue] = React.useState("")

  const date = formData.date.split("-")
  return (
      <div className="App">
        <header className="App-header" style={{backgroundColor: formData.color == 0 ? "#ffffff" : "#282c34", color: formData.color == 0 ? "black" : "white"}}>
        <p />
        <p />
        <form onSubmit={handleSubmit}>
          <div className="columns">
            <div className="column">
            </div>
            <div className="column">
              <div className="box">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Date</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input is-primary"
                               type="date"
                               name="date"
                               value={formData.date}
                               onChange={handleInputChange} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Prénom</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input is-primary"
                               type="text"
                               name="first_name"
                               value={formData.first_name}
                               onChange={handleInputChange} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </header>
    </div>
  )
}

export default App