export interface dblEpcStatic {
    buildingType:undefined | string,
    address: undefined | string ,
    climaticZone: undefined |string,
    constructionYear: undefined |string,
    normative:undefined|string,
}
export interface dblEpcDynamic  {
    scope: undefined |string,
    certificateId: undefined | string | number,
    startDate:undefined |string,
    endDate: undefined |string,
    epcProcedure:undefined |string
    epcCertificateUrl: undefined|string,
    epcBuildingUrl: undefined|string,
}
export interface dblEpcEmissionsCO2  {
    emissionsEnergyRating :undefined | string,
    emissionsEnergyYearArea:undefined | number,
    emissionsDhwRating:undefined | string,
    emissionsDhwYearArea:undefined | number,
    emissionsHeatingRating:undefined | string,
    emissionsHeatingYearArea: undefined | number,
}
export interface dblEpcNonRenEnergyConsumption  {
    nonRenEnergyConsumptionRating: undefined |string,
    nonRenEnergyConsumptionYearArea: undefined | number,
    nonRenDhwEnergyComsumptionRating:undefined |string,
    nonRenDhwEnergyConsumptionYearArea: undefined | number,
    nonRenHeatingEnergyConsumptionRating: undefined |string,
    nonRenHeatingEnergyConsumptionYearArea: undefined | number,
}
export interface dblEpcEnergyDemand  {
    energyDemandHeatingRating: undefined | string,
    energyDemandHeatingYearArea: undefined | number,
    energyDemandDhwRating: undefined | string,
    energyDemandDhwYearArea: undefined | number
}
export interface dblEpc {
    dblEpcStatic?: dblEpcStatic,
    dblEpcDynamic?: dblEpcDynamic,
    dblEpcEmissionsCO2?: dblEpcEmissionsCO2,
    dblEpcNonRenEnergyConsumption?: dblEpcNonRenEnergyConsumption,
    dblEpcEnergyDemand?: dblEpcEnergyDemand
} 
export type UndefinedDblEpc = dblEpc | undefined;

