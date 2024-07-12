export const certificates = [{
    "certificateId": "CEE-CAPV-2022-00230983-P",
    "portalId": "84802700005507",
    "consumption": 109.39,
    "energyRating": "E",
    "emissions": 22.68,
    "energyEmissionsRating": "E",
    "normative": "Anterior NBE-CT-79",
    "name": "BLOQUE 1 VIVIENDAS ARAMOTZ",
    "procedure": "CEXv2.3",
    "scope": "Proyecto",
    "climaticZone": "C1",
    "constructionYear": 1958,
    "numberOfHouses": 8,
    "cadastralData": "027 002 01 016 001",
    "type": "BloqueDeViviendaCompleto",
    "startDate": "2022-08-04",
    "endDate": "2032-08-04",
    "address": "Taldea/Grupo Aramotz 1, 48200 Durango Bizkaia",
    "location": {
      "roadType": "Taldea/Grupo",
      "street": "Aramotz",
      "portal": "1",
      "postalCode": "48200",
      "locality": "Durango",
      "municipality": "Durango",
      "county": "Bizkaia",
      "state": "Euskadi",
      "portalId": 84802700005507,
      "streetId": 134802700000430,
      "localityId": "14802700000016",
      "municipalityId": "027",
      "countyId": "48"
    },
    "geometryGeneralData": {
      "habitableArea": 507,
      "habitableAreaVolume": 1267.5,
      "compacity": 1.57,
      "heatedHabitableArea": 100,
      "refrigeratedHabitableArea": 0,
      "glazedAreaN": 14,
      "glazedAreaNE": 0,
      "glazedAreaE": 16,
      "glazedAreaSE": 0,
      "glazedAreaS": 25,
      "glazedAreaSO": 0,
      "glazedAreaO": 21,
      "glazedAreaNO": 0,
      "internalSourcesDensity": 0,
      "residentialUseVentilation": 0.63,
      "totalVentilation": 0.79,
      "acsDemand": 745
    },
    "demand": {
      "buildingObject": {
        "global": 71.56,
        "heating": 36.7,
        "refrigeration": 0,
        "acs": 34.86,
        "joint": 36.7
      }
    },
    "consume": {
      "finalEnergyVector": {
        "naturalGas": {
          "global": 82.24,
          "heating": 42.18,
          "refrigeration": 0,
          "acs": 40.07,
          "lightning": 0
        },
        "dieselC": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        },
        "glp": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        },
        "coal": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        },
        "pelletBiomass": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        },
        "otherBiomass": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        },
        "peninsularElectricity": {
          "global": 5.9,
          "heating": 9.17,
          "refrigeration": 0,
          "acs": 8.72,
          "lightning": 0
        },
        "biofuel": {
          "global": 0,
          "heating": 0,
          "refrigeration": 0,
          "acs": 0,
          "lightning": 0
        }
      },
      "primaryNoRenewableEnergy": {
        "heating": 68.11,
        "refrigeration": 0,
        "acs": 64.71,
        "lightning": 0
      }
    },
    "co2Emissions": {
      "heating": 13.66,
      "refrigeration": 0,
      "acs": 12.98,
      "lightning": 0,
      "electricConsumption": 1.95,
      "otherConsumptions": 20.72,
      "totalElectricConsumption": 990.05,
      "totalOtherConsumptions": 10507.32
    },
    "qualification": {
      "demand": {
        "heatingScale": {
          "a": 7.7,
          "b": 17.9,
          "c": 32.4,
          "d": 54.2,
          "e": 99.8,
          "f": 108.8
        },
        "heating": "D"
      },
      "primaryNoRenewableEnergy": {
        "globalScale": {
          "a": 24.2,
          "b": 39.2,
          "c": 60.7,
          "d": 93.4,
          "e": 200,
          "f": 226
        },
        "heating": "D",
        "acs": "G"
      },
      "co2Emissions": {
        "globalScale": {
          "a": 5.4,
          "b": 8.8,
          "c": 13.7,
          "d": 21,
          "e": 45.9,
          "f": 55
        },
        "heating": "D",
        "acs": "G"
      }
    },
    "thermalEnvelopeData": {
      "opaqueEnclosures": [
        {
          "name": "Fachada Este 2",
          "type": "Fachada",
          "area": 26,
          "orientation": "Este",
          "transmittance": 0.27,
          "obtainingMode": "Usuario"
        },
        {
          "name": "Medianera",
          "type": "Adiabatico",
          "area": 22,
          "transmittance": 0,
          "obtainingMode": "PorDefecto"
        },
        {
          "name": "Fachada Sur",
          "type": "Fachada",
          "area": 166,
          "orientation": "Sur",
          "transmittance": 0.27,
          "obtainingMode": "Usuario"
        },
        {
          "name": "Fachada Este 1",
          "type": "Fachada",
          "area": 55.5,
          "orientation": "Este",
          "transmittance": 0.25,
          "obtainingMode": "Usuario"
        },
        {
          "name": "Fachada Norte",
          "type": "Fachada",
          "area": 145,
          "orientation": "Norte",
          "transmittance": 0.25,
          "obtainingMode": "Usuario"
        },
        {
          "name": "PI V Elementos Comunes",
          "type": "ParticionInteriorVertical",
          "area": 103,
          "orientation": "Vertical",
          "transmittance": 0.95,
          "obtainingMode": "Estimado"
        },
        {
          "name": "Fachada Oeste",
          "type": "Fachada",
          "area": 61.5,
          "orientation": "Oeste",
          "transmittance": 0.27,
          "obtainingMode": "Usuario"
        },
        {
          "name": "CUBIERTA",
          "type": "Cubierta",
          "area": 129,
          "orientation": "Horizontal",
          "transmittance": 0.24,
          "obtainingMode": "Usuario"
        },
        {
          "name": "PI H camara sanitaria",
          "type": "ParticionInteriorHorizontal",
          "area": 121,
          "orientation": "Horizontal",
          "transmittance": 0.35,
          "obtainingMode": "Estimado"
        }
      ],
      "hollows": [
        {
          "name": "V3 Sur MS ",
          "type": "Hueco",
          "area": 5.06,
          "orientation": "Sur",
          "transmittance": 5.7,
          "solarFactor": 0.46,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Este MS Alero",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Este",
          "transmittance": 5.7,
          "solarFactor": 0.49,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V2 Sur MS",
          "type": "Hueco",
          "area": 1.82,
          "orientation": "Sur",
          "transmittance": 5.7,
          "solarFactor": 0.39,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Este MAD",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Este",
          "transmittance": 4.65,
          "solarFactor": 0.49,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Oeste PVC",
          "type": "Hueco",
          "area": 6.44,
          "orientation": "Oeste",
          "transmittance": 2.97,
          "solarFactor": 0.45,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Oeste MD",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Oeste",
          "transmittance": 3.78,
          "solarFactor": 0.52,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V3 Sur MS Balcón",
          "type": "Hueco",
          "area": 5.06,
          "orientation": "Sur",
          "transmittance": 5.7,
          "solarFactor": 0.31,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Sur MAD Alero",
          "type": "Hueco",
          "area": 4.83,
          "orientation": "Sur",
          "transmittance": 4.65,
          "solarFactor": 0.25,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Este MS",
          "type": "Hueco",
          "area": 6.44,
          "orientation": "Este",
          "transmittance": 5.7,
          "solarFactor": 0.57,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Sur PVC Balcón",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Sur",
          "transmittance": 2.97,
          "solarFactor": 0.18,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Oeste PVC Alero",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Oeste",
          "transmittance": 2.97,
          "solarFactor": 0.38,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Sur MS",
          "type": "Hueco",
          "area": 9.66,
          "orientation": "Sur",
          "transmittance": 5.7,
          "solarFactor": 0.46,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Norte PVC",
          "type": "Hueco",
          "area": 3.22,
          "orientation": "Norte",
          "transmittance": 2.97,
          "solarFactor": 0.54,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V2 Norte PVC",
          "type": "Hueco",
          "area": 7.28,
          "orientation": "Norte",
          "transmittance": 2.97,
          "solarFactor": 0.54,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Norte MD",
          "type": "Hueco",
          "area": 9.66,
          "orientation": "Norte",
          "transmittance": 3.78,
          "solarFactor": 0.63,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Sur MS ",
          "type": "Hueco",
          "area": 6.44,
          "orientation": "Sur",
          "transmittance": 5.7,
          "solarFactor": 0.46,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        },
        {
          "name": "V1 Sur PVC Alero",
          "type": "Hueco",
          "area": 4.83,
          "orientation": "Sur",
          "transmittance": 2.97,
          "solarFactor": 0.23,
          "transmittanceObtainingMode": "Estimado",
          "solarFactorObtainingMode": "Estimado"
        }
      ],
      "thermalBridges": [
        {
          "name": "PT Caja de Persiana-V1 Oeste PVC Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Caja de Persiana-V3 Sur MS Balcón",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Contorno de hueco-V1 Sur MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 30.6
        },
        {
          "name": "PT Caja de Persiana-V1 Norte PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Contorno de hueco-V1 Oeste MD",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Contorno de hueco-V3 Sur MS Balcón",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 13.4
        },
        {
          "name": "PT Caja de Persiana-V1 Sur MAD Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 3.45
        },
        {
          "name": "PT Contorno de hueco-V1 Norte PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Caja de Persiana-V1 Este MS Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Contorno de hueco-V1 Sur MAD Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 15.3
        },
        {
          "name": "PT Contorno de hueco-V1 Este MS Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Caja de Persiana-V1 Sur PVC Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 3.45
        },
        {
          "name": "PT Encuentro de fachada con cubierta-CUBIERTA",
          "obtainingMode": "Usuario",
          "transmittance": 0.26,
          "type": "Encuentro de fachada con cubierta",
          "length": 50.86
        },
        {
          "name": "PT Caja de Persiana-V1 Norte MD",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 6.9
        },
        {
          "name": "PT Caja de Persiana-V1 Sur MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 6.9
        },
        {
          "name": "PT Contorno de hueco-V1 Norte MD",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 30.6
        },
        {
          "name": "PT Caja de Persiana-V1 Oeste PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 4.6
        },
        {
          "name": "PT Encuentro de fachada con forjado-Fachada Norte",
          "obtainingMode": "Usuario",
          "transmittance": 0.16,
          "type": "Encuentro de fachada con forjado",
          "length": 43.35
        },
        {
          "name": "PT Encuentro de fachada con forjado-Fachada Sur",
          "obtainingMode": "Usuario",
          "transmittance": 0.16,
          "type": "Encuentro de fachada con forjado",
          "length": 49.8
        },
        {
          "name": "PT Caja de Persiana-V1 Oeste MD",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Caja de Persiana-V3 Sur MS ",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Encuentro de fachada con forjado-Fachada Este1",
          "obtainingMode": "Usuario",
          "transmittance": 0.16,
          "type": "Encuentro de fachada con forjado",
          "length": 16.65
        },
        {
          "name": "PT Contorno de hueco-V1 Oeste PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 20.4
        },
        {
          "name": "PT Encuentro de fachada con forjado-Fachada Oeste",
          "obtainingMode": "Usuario",
          "transmittance": 0.16,
          "type": "Encuentro de fachada con forjado",
          "length": 18.45
        },
        {
          "name": "PT Contorno de hueco-V1 Este MAD",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Caja de Persiana-V2 Norte PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 5.2
        },
        {
          "name": "PT Contorno de hueco-V1 Sur PVC Balcón",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Contorno de hueco-V1 Sur MS ",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 20.4
        },
        {
          "name": "PT Caja de Persiana-V1 Sur PVC Balcón",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        },
        {
          "name": "PT Contorno de hueco-V2 Sur MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 8.2
        },
        {
          "name": "PT Encuentro de fachada con forjado-Fachada Este2",
          "obtainingMode": "Usuario",
          "transmittance": 0.16,
          "type": "Encuentro de fachada con forjado",
          "length": 7.8
        },
        {
          "name": "PT Contorno de hueco-V2 Norte PVC",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 32.8
        },
        {
          "name": "PT Caja de Persiana-V2 Sur MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 1.3
        },
        {
          "name": "PT Contorno de hueco-V3 Sur MS ",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 13.4
        },
        {
          "name": "PT Caja de Persiana-V1 Sur MS ",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 4.6
        },
        {
          "name": "PT Contorno de hueco-V1 Sur PVC Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 15.3
        },
        {
          "name": "PT Contorno de hueco-V1 Oeste PVC Alero",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 10.2
        },
        {
          "name": "PT Caja de Persiana-V1 Este MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 4.6
        },
        {
          "name": "PT Contorno de hueco-V1 Este MS",
          "obtainingMode": "Usuario",
          "transmittance": 0.02,
          "type": "Contorno de hueco",
          "length": 20.4
        },
        {
          "name": "PT Vuelos",
          "obtainingMode": "Usuario",
          "transmittance": 0.27,
          "type": "Encuentro de fachada con voladizo",
          "length": 16.7
        },
        {
          "name": "PT Caja de Persiana-V1 Este MAD",
          "obtainingMode": "Usuario",
          "transmittance": 0.65,
          "type": "Caja de Persiana",
          "length": 2.3
        }
      ]
    },
    "thermalInstallations": {
      "heatingGenerators": [
        {
          "type": "Caldera Estándar",
          "obtainingMode": "Estimado",
          "seasonalYield": 0.62
        },
        {
          "type": "Caldera Estándar",
          "obtainingMode": "Estimado",
          "seasonalYield": 0.66
        },
        {
          "type": "Efecto Joule",
          "obtainingMode": "Estimado",
          "seasonalYield": 1
        }
      ],
      "acsInstallations": [
        {
          "type": "Caldera Estándar",
          "obtainingMode": "Estimado",
          "seasonalYield": 0.66
        },
        {
          "type": "Efecto Joule",
          "obtainingMode": "Estimado",
          "seasonalYield": 1
        },
        {
          "type": "Caldera Estándar",
          "obtainingMode": "Estimado",
          "seasonalYield": 0.62
        }
      ]
    },
    "conditionsOfOperationAndOccupation": {
      "spaces": [
        {
          "name": "Edificio Objeto",
          "area": 507,
          "conditioningLevel": "Acondicionado",
          "usageProfile": "residencial-24h-baja"
        }
      ]
    },
    "renewableEnergies": {
      "electric": [
        {
          "name": "Fotovoltaica",
          "selfConsumedGeneratedEnergy": 6079
        }
      ],
      "globalReductionNoRenewablePrimaryEnergy": 23.43,
      "globalReductionCO2Emissions": 3.97
    },
    "heating": {
      "centralizationDegree": "Equipos individuales",
      "mainEquipment": "Caldera estandar",
      "energyType": "Gas natural"
    },
    "refrigeration": {
      "centralizationDegree": " ",
      "mainEquipment": " ",
      "energyType": " "
    },
    "acs": {
      "centralizationDegree": "Equipos individuales",
      "mainEquipment": "Caldera estandar",
      "energyType": "Gas natural"
    },
    "mainEntityOfPage": "https://apps.euskadi.eus/y67paUtilidadSeccionWar/utilidadSeccionJSP/y67paCertificacionSeleccionada.do?idPropiedadRadio=48EEA%20202209344",
    "_links": {
      "self": {
        "name": "CEE-CAPV-2022-00230983-P",
        "href": "https://api.euskadi.eus/energy-efficiency/certificates/CEE-CAPV-2022-00230983-P"
      },
      "building": {
        "name": "Taldea/Grupo Aramotz 1, 48200 Durango Bizkaia",
        "href": "https://api.euskadi.eus/energy-efficiency/buildings/84802700005507"
      }
    }
  },//Another phase
  {
    "certificateId": "CEE-CAPV-2021-00203725-E",
    "portalId": "84802700005507",
    "consumption": 276.91,
    "energyRating": "G",
    "emissions": 55.55,
    "energyEmissionsRating": "G",
    "normative": "Anterior NBE-CT-79",
    "name": "BLOQUE 1 VIVIENDAS ARAMOTZ",
    "procedure": "CE3Xv2.3",
    "scope": "Edif. Existente",
    "climaticZone": "C1",
    "constructionYear": 1958,
    "numberOfHouses": 8,
    "cadastralData": "027 002 01 016 001",
    "type": "Vivienda",
    "startDate": "2021-02-28",
    "endDate": "2031-02-28",
    "address": "Taldea/Grupo Aramotz 1, 48200 Durango Bizkaia",
    "location": {
      "roadType": "Taldea/Grupo",
      "street": "Aramotz",
      "portal": "1",
      "postalCode": "48200",
      "locality": "Durango",
      "municipality": "Durango",
      "county": "Bizkaia",
      "state": "Euskadi",
      "portalId": 84802700005507,
      "streetId": 134802700000430,
      "localityId": "14802700000016",
      "municipalityId": "027",
      "countyId": "48"
    },
    "geometryGeneralData": {
      "habitableArea": 507,
      "heatedHabitableArea": 100,
      "refrigeratedHabitableArea": 0
    },
    "heating": {
      "centralizationDegree": "Equipos individuales",
      "mainEquipment": "Caldera estandar",
      "energyType": "Gas natural"
    },
    "refrigeration": {
      "centralizationDegree": " ",
      "mainEquipment": " ",
      "energyType": " "
    },
    "acs": {
      "centralizationDegree": "Equipos individuales",
      "mainEquipment": "Caldera estandar",
      "energyType": "Gas natural"
    },
    "mainEntityOfPage": "https://apps.euskadi.eus/y67paUtilidadSeccionWar/utilidadSeccionJSP/y67paCertificacionSeleccionada.do?idPropiedadRadio=48EEA%20202104657",
    "_links": {
      "self": {
        "name": "CEE-CAPV-2021-00203725-E",
        "href": "https://api.euskadi.eus/energy-efficiency/certificates/CEE-CAPV-2021-00203725-E"
      },
      "building": {
        "name": "Taldea/Grupo Aramotz 1, 48200 Durango Bizkaia",
        "href": "https://api.euskadi.eus/energy-efficiency/buildings/84802700005507"
      }
    }
  }
]