interface ObjectPhaseInfo{
    id:number;
    year: number;
    epcScope: string;
    epcStartDate: undefined|string;
    description:string;
    ifcModel:any;
}

export const projectPhasesArray:ObjectPhaseInfo[]=[]

//Object that holds basic information from each phase
let phase0:ObjectPhaseInfo ={
    id:0,
    year:1955,
    epcScope:"EdifExistente",
    epcStartDate:"2021-02-28",
    description: "Original Construction",
    ifcModel:"ifc/20240724/ph00_tfm_modified.ifc"
}
let phase1:ObjectPhaseInfo ={
    id:1,
    year:2023,
    epcScope:"Proyecto",
    epcStartDate: "2022-08-04",
    description: "Thermal Envelope renovation and elevator installation",
    ifcModel: "ifc/20240724/ph01_tfm_modified.ifc"
}

projectPhasesArray.push(phase0,phase1)

