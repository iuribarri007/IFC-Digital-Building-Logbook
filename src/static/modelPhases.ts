interface ObjectPhaseInfo{
    id:number;
    year: number;
    energyCertificateScope: string;
    description:string;
    ifcModel:any;
}

export const projectPhasesArray:ObjectPhaseInfo[]=[]
let phase0:ObjectPhaseInfo ={
    id:0,
    year:1955,
    energyCertificateScope:"EdifExistente",
    description: "Original Construction",
    ifcModel: "ifc/20240702/ph00_tfm_modified.ifc"
}
let phase1:ObjectPhaseInfo ={
    id:1,
    year:2023,
    energyCertificateScope:"Proyecto",
    description: "Thermal Envelope renovation and elevator installation",
    ifcModel: "ifc/20240702/ph01_tfm_modified.ifc"
}
let phase2:ObjectPhaseInfo ={
    id:2,
    year:2035,
    energyCertificateScope:"",
    description: "Buildinj Services renovation",
    ifcModel: "ifc/202"
}
projectPhasesArray.push(phase0,phase1,phase2)

const dblEPCGeneral = {
    epcScope: undefined,
    epcClimaticZone: undefined,
    epcStartDate:undefined,
    epcEndDate: undefined,
}
const dblEpcEmissionsCO2 = {
    emissionsEnergyRating :undefined,
    emissionsEnergyTotal:undefined,
    emissionsDHW:undefined,
    emissionsHeating: undefined
}
const dblEpcEnergyConsumption = {
    energyConsumptionRating: undefined,
    energyConsumptionTotal: undefined,
    energyComsumptionDHWCRating:undefined,
    energyConsumptionHeatingRating: undefined
}
const dblEpcEnergyDemand = {
    energyDemandHeatingRating: undefined,
    energyDemandDHWRating: undefined,
}
const dblEpc={
    dblEPCGeneral,
    dblEpcEmissionsCO2,
    dblEpcEnergyConsumption,
    dblEpcEnergyDemand
}