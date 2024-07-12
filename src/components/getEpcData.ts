import { certificates } from "../static/energyPerformanceCertificate";
import { dblEpc,dblEpcStatic,dblEpcDynamic,dblEpcEmissionsCO2,dblEpcNonRenEnergyConsumption,dblEpcEnergyDemand } from "./interfaceEpc";

export const dblEpcData:dblEpc[] =[]
function transformCertificateData  (certificates){
    certificates.forEach(certificate => {
        console.log(certificate)
       
        let dblEpcStatic:dblEpcStatic = {
            buildingType:undefined,
            address: undefined,
            climaticZone: undefined,
            constructionYear: undefined,
            normative:undefined
        }
        let dblEpcDynamic:dblEpcDynamic = {
            scope: undefined,
            certificateId: undefined,
            startDate:undefined,
            endDate: undefined,
            epcProcedure:undefined,
            epcCertificateUrl:undefined,
            epcBuildingUrl:undefined,
        }
        let dblEpcEmissionsCO2:dblEpcEmissionsCO2 = {
            emissionsEnergyRating :undefined,
            emissionsEnergyYearArea:undefined,
            emissionsDhwRating:undefined,
            emissionsDhwYearArea:undefined,
            emissionsHeatingRating:undefined,
            emissionsHeatingYearArea: undefined,
        }
        let dblEpcNonRenEnergyConsumption:dblEpcNonRenEnergyConsumption = {
            nonRenEnergyConsumptionRating: undefined,
            nonRenEnergyConsumptionYearArea: undefined,
            nonRenDhwEnergyComsumptionRating:undefined,
            nonRenDhwEnergyConsumptionYearArea: undefined,
            nonRenHeatingEnergyConsumptionRating: undefined,
            nonRenHeatingEnergyConsumptionYearArea: undefined,
        }
        let dblEpcEnergyDemand:dblEpcEnergyDemand = {
            energyDemandHeatingRating: undefined,
            energyDemandHeatingYearArea: undefined,
            energyDemandDhwRating: undefined,
            energyDemandDhwYearArea: undefined
        }
        if(certificate.hasOwnProperty("type")){
            dblEpcStatic.buildingType = certificate.type
        }
        if(certificate.hasOwnProperty("constructionYear")){
            dblEpcStatic.constructionYear = certificate.constructionYear
        }
        if(certificate.hasOwnProperty("address")){
            dblEpcStatic.address = certificate.address
        }
        if(certificate.hasOwnProperty("climaticZone")){
            dblEpcStatic.climaticZone = certificate.climaticZone
        }
        if(certificate.hasOwnProperty("normative")){
            dblEpcDynamic.epcProcedure = certificate.normative
        }
        if(certificate.hasOwnProperty("procedure")){
            dblEpcDynamic.epcProcedure = certificate.procedure
        }
        if(certificate.hasOwnProperty("certificateId")){
            dblEpcDynamic.certificateId = certificate.certificateId
        }
        if(certificate.hasOwnProperty("scope")){
            dblEpcDynamic.scope= certificate.scope
        }
        if(certificate.hasOwnProperty("startDate")&& certificate.hasOwnProperty("startDate")){
            dblEpcDynamic.startDate = certificate.startDate
            dblEpcDynamic.endDate = certificate.endDate
        }
        if(certificate.hasOwnProperty("_links")&& certificate._links.hasOwnProperty("self")&& certificate._links.hasOwnProperty("building")){
            dblEpcDynamic.epcCertificateUrl = certificate._links.self.href
            dblEpcDynamic.epcBuildingUrl = certificate._links.building.href
        }
        if(certificate.hasOwnProperty("emissions")){
            dblEpcEmissionsCO2.emissionsEnergyYearArea = certificate.emissions
            if(certificate.hasOwnProperty("energyEmissionsRating")){
                dblEpcEmissionsCO2.emissionsEnergyRating = certificate.energyEmissionsRating
            }
            if(certificate.hasOwnProperty("co2Emissions")){
                dblEpcEmissionsCO2.emissionsDhwYearArea = certificate.co2Emissions.acs
                dblEpcEmissionsCO2.emissionsHeatingYearArea = certificate.co2Emissions.heating
            }
            if(certificate.hasOwnProperty("qualification")&& certificate.qualification.hasOwnProperty("co2Emissions")){
                dblEpcEmissionsCO2.emissionsDhwRating = certificate.qualification.co2Emissions.acs
                dblEpcEmissionsCO2.emissionsHeatingRating = certificate.qualification.co2Emissions.heating
            }
        }
        if(certificate.hasOwnProperty("consumption") && certificate.hasOwnProperty("energyRating")){
            dblEpcNonRenEnergyConsumption.nonRenEnergyConsumptionRating = certificate.energyRating
            dblEpcNonRenEnergyConsumption.nonRenEnergyConsumptionYearArea = certificate.consumption
            if(certificate.hasOwnProperty("consume")&& certificate.consume.hasOwnProperty("primaryNoRenewableEnergy")){
                dblEpcNonRenEnergyConsumption.nonRenDhwEnergyConsumptionYearArea = certificate.consume.primaryNoRenewableEnergy.acs
                dblEpcNonRenEnergyConsumption.nonRenHeatingEnergyConsumptionYearArea= certificate.consume.primaryNoRenewableEnergy.heating
            }
            if(certificate.hasOwnProperty("qualification")&& certificate.qualification.hasOwnProperty("primaryNoRenewableEnergy")){
                dblEpcNonRenEnergyConsumption.nonRenDhwEnergyComsumptionRating = certificate.qualification.primaryNoRenewableEnergy.acs
                dblEpcNonRenEnergyConsumption.nonRenHeatingEnergyConsumptionRating = certificate.qualification.primaryNoRenewableEnergy.heating
            }
        }
        if(certificate.hasOwnProperty("demand")&& certificate.demand.hasOwnProperty("buildingObject")){
            dblEpcEnergyDemand.energyDemandDhwYearArea = certificate.demand.buildingObject.acs
            dblEpcEnergyDemand.energyDemandHeatingYearArea = certificate.demand.buildingObject.heating
            if(certificate.hasOwnProperty("qualification")&& certificate.qualification.hasOwnProperty("demand")){
                dblEpcEnergyDemand.energyDemandDhwRating = certificate.qualification.demand.acs
                dblEpcEnergyDemand.energyDemandHeatingRating = certificate.qualification.demand.heating
            }
        }
        const dblEpc :dblEpc={
            dblEpcStatic,
            dblEpcDynamic,
            dblEpcEmissionsCO2,
            dblEpcNonRenEnergyConsumption,
            dblEpcEnergyDemand
        }
        dblEpcData.push(dblEpc)
    });
    //console.log(dblEpcData)
}
transformCertificateData(certificates)
