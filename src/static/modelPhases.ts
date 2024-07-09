interface ObjectPhaseInfo{
    id:number;
    year: number;
    description:string;
    ifcModel:any;

}
export const projectPhasesArray:ObjectPhaseInfo[]=[]
let phase0:ObjectPhaseInfo ={
    id:0,
    year:1955,
    description: "Original Construction",
    ifcModel: "ifc/20240702/ph00_tfm_modified.ifc"
}
let phase1:ObjectPhaseInfo ={
    id:1,
    year:2023,
    description: "Thermal Envelope renovation and elevator installation",
    ifcModel: "ifc/20240702/ph01_tfm_modified.ifc"
}
let phase2:ObjectPhaseInfo ={
    id:2,
    year:2035,
    description: "Buildinj Services renovation",
    ifcModel: "ifc/202"
}
projectPhasesArray.push(phase0,phase1,phase2)