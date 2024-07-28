import * as DBL from "./dblInterface"

export let dblSkinMaterialInventory: [] 
export let dblStructuralMaterialInventory: [] 
export let dblServiceMaterialInventory: [] 
export let dblSpaceMaterialInventory: [] 
export let dblStuffMaterialInventory: [] 

export let dblSkinMadasterSummary: []
export let dblStructuralMadasterSummary: [] 
export let dblServiceMadasterSummary: []
export let dblSpaceMadasterSummary: [] 
export let dblStuffMadasterSummary:[]

export let dblMadasterSummary:any=[]

export async function classifyMaterials(...obj) {  

    dblSkinMaterialInventory = [];
    dblStructuralMaterialInventory = [];
    dblServiceMaterialInventory= [];
    dblSpaceMaterialInventory= [];
    dblStuffMaterialInventory = [];

    dblSkinMadasterSummary = [];
    dblStructuralMadasterSummary = [];
    dblServiceMadasterSummary = [];
    dblSpaceMadasterSummary = [];
    dblStuffMadasterSummary = [];
    
  
    obj.forEach((obj) => {
      for (const level in obj) {
        const dblLevel = obj[level]; 
        for (const e in dblLevel) {
          const dblElement = dblLevel[e];
          const elementEntityType = dblElement.entity.entityType;
          
          const isLoadBearing = dblElement.props.dblIsLoadBearing;
          const IsExternal = dblElement.props.dblIsExternal;
          const materialArray = dblElement.materials
  
          if (DBL.isDblWall(elementEntityType) || DBL.isDblFloor(elementEntityType) || DBL.isDblRoof(elementEntityType)) {
            if(isLoadBearing){
              classifyMaterialBuildingLayer(materialArray,dblStructuralMaterialInventory)
            }else if(IsExternal){
              classifyMaterialBuildingLayer(materialArray,dblSkinMaterialInventory)
            }
            else {
              classifyMaterialBuildingLayer(materialArray,dblSpaceMaterialInventory)
            }
          } else if(DBL.isDblWindow(elementEntityType)){
            if(IsExternal){
              classifyMaterialBuildingLayer(materialArray,dblSkinMaterialInventory)
            }else{
              classifyMaterialBuildingLayer(materialArray,dblServiceMaterialInventory)
            }
          } else if(DBL.isDblStructuralLinealElement(elementEntityType)){
            if(isLoadBearing){
              classifyMaterialBuildingLayer(materialArray,dblStructuralMaterialInventory)
            } else{
              classifyMaterialBuildingLayer(materialArray,dblServiceMaterialInventory)
            }
          } else if(DBL.isDblCovering(elementEntityType)){
            if(IsExternal){
              classifyMaterialBuildingLayer(materialArray,dblSkinMaterialInventory)
            } else{
              classifyMaterialBuildingLayer(materialArray,dblSpaceMaterialInventory)
            }
          }
        }
      }
    });

    sumMaterialArrays(dblSkinMaterialInventory,dblStructuralMaterialInventory,dblServiceMaterialInventory,dblSpaceMaterialInventory,dblStuffMaterialInventory)
    summarizeMaterials(
      {materialCategoryArray:dblSkinMaterialInventory,madasterCategoryArray:dblSkinMadasterSummary},
      {materialCategoryArray:dblStructuralMaterialInventory,madasterCategoryArray:dblStructuralMadasterSummary},
      {materialCategoryArray:dblServiceMaterialInventory,madasterCategoryArray:dblServiceMadasterSummary},
      {materialCategoryArray:dblSpaceMaterialInventory,madasterCategoryArray:dblSpaceMadasterSummary},
    )
 
    console.log("SkinMaterialInventory",dblSkinMaterialInventory)
    console.log("StructuralMaterialInventory",dblStructuralMaterialInventory)
    console.log("ServiceMaterialInventory",dblServiceMaterialInventory)
    console.log("SpaceMaterialInventory",dblSpaceMaterialInventory)
    console.log("StuffMaterialInventory",dblStuffMaterialInventory)

  
}


function classifyMaterialBuildingLayer(materialArray, dblBuildingLayer): void {
    materialArray.forEach((material:DBL.dblElementMaterial) => {
      
      const materialCategoryUniclassName = material.dblMaterialUniclassName;
      const materialCategoryUniclassCode = material.dblMaterialUniclassCode;
      const materialCategoryWasteCategory = material.dblMaterialWasteCategory;
      const productCategoryUniclassCode = material.dblProductUniclassCode
      const productCategoryUniclassName =  material.dblProductUniclassName
      const materialCategoryMassDensity = material.dblMaterialDensity
      const materialNetVolume = material.dblMaterialNetVolume
      const combinedUniclassName = material.dblCombinedUniclassName
      const materialCategoryMadaster = material.dblMaterialCategoryMadaster
      
      if(productCategoryUniclassCode!== undefined && productCategoryUniclassName!= undefined && materialNetVolume!== undefined){
        let existingCategory = dblBuildingLayer.find(category => category.dblCombinedUniclassName === combinedUniclassName);
      if (!existingCategory) {
        // Si no existe, crear un nuevo objeto de categoría
        const newMaterialCategory:DBL.dblMaterialCategory = {
          dblMaterialCategoryMadaster: materialCategoryMadaster,
          dblMaterialCategoryUniclassName: materialCategoryUniclassName,
          dblMaterialCategoryUniclassCode: materialCategoryUniclassCode,
          dblProductCategoryUniclassCode: productCategoryUniclassCode,
          dblProductCategoryUniclassName: productCategoryUniclassName,
          dblCombinedUniclassName: combinedUniclassName,
          dblMaterialCategoryMassDensity: materialCategoryMassDensity,
          dblMaterialCategoryWasteCategory: materialCategoryWasteCategory,
          dblMaterialNetVolumeSum: undefined,
          dblMaterialWeightSum: undefined,
          dblMaterialArray: []
        };
        // Añadir el material al array de la nueva categoría
        newMaterialCategory.dblMaterialArray.push(material);
        // Añadir la nueva categoría al dblBuildingLayer
        dblBuildingLayer.push(newMaterialCategory);
      } else {
        // Si ya existe, añadir el material al array de la categoría existente
        existingCategory.dblMaterialArray.push(material);
      }
      }

    });
}

function sumMaterialArrays(...arrays: any): void {
  arrays.forEach((array) => {
    array.forEach((obj) => {
      let weightSum = obj.dblMaterialWeightSum || 0;
      let netVolumeSum = obj.dblMaterialNetVolumeSum || 0;
      obj.dblMaterialArray.forEach((material) => {
        if(material.dblMaterialWeight!==undefined){
          weightSum += material.dblMaterialWeight  || 0;
        }
        if(material.dblMaterialNetVolume!==undefined){
          netVolumeSum += material.dblMaterialNetVolume || 0;
        }
      });
      if (weightSum !== obj.dblMaterialWeightSum) {
        obj.dblMaterialWeightSum = (weightSum);
      }
      if (netVolumeSum !== obj.dblMaterialNetVolumeSum) {
        obj.dblMaterialNetVolumeSum = (netVolumeSum) ;
      }
    });
    
  });
  arrays.forEach((array)=>{
    array.forEach(obj =>{
       obj.dblMaterialWeightSum = parseFloat(obj.dblMaterialWeightSum.toFixed(4)) 
       obj.dblMaterialNetVolumeSum = parseFloat(obj.dblMaterialNetVolumeSum.toFixed(4)) 

    })
  })
}

function checkMaterialCategory(madasterCategory: string, array: any[]) {
  return array.findIndex((dblCategory) => dblCategory.dblMaterialCategoryMadaster === madasterCategory);
}

const madasterCategoryNames = ["Glass","Metal","Organic","Plastic","Stone","Unknown"]

export async function summarizeMaterials(...pairs: { materialCategoryArray:[]; madasterCategoryArray: any[] }[]): Promise<void> {
  pairs.forEach(({ materialCategoryArray, madasterCategoryArray }) => {
    materialCategoryArray.forEach((category: DBL.dblMaterialCategory) => {
      const madasterCategory: string | undefined = category.dblMaterialCategoryMadaster;
      const materialWeight: number | undefined = category.dblMaterialWeightSum;
      const materialVolume: number | undefined = category.dblMaterialNetVolumeSum;

      if (madasterCategory !== undefined && materialWeight !== undefined && materialVolume !== undefined && madasterCategoryNames.includes(madasterCategory)) {
        const categoryIndex = checkMaterialCategory(madasterCategory, madasterCategoryArray);
        if (categoryIndex !== -1) {
          const targetCategory: DBL.dblMaterialCategoryMadaster = madasterCategoryArray[categoryIndex];
          if (targetCategory !== undefined) {
            targetCategory.dblMaterialNetVolumeSummary += materialVolume;
            targetCategory.dblMaterialWeightSummary += materialWeight;
          }
        } else {
          let newMaterialCategoryMadaster: DBL.dblMaterialCategoryMadaster = {
            dblMaterialCategoryMadaster: madasterCategory,
            dblMaterialNetVolumeSummary: materialVolume,
            dblMaterialWeightSummary: materialWeight
          };
          madasterCategoryArray.push(newMaterialCategoryMadaster);
        }
      }
      madasterCategoryArray.sort((a, b) => a.dblMaterialCategoryMadaster.localeCompare(b.dblMaterialCategoryMadaster));
    });
    madasterCategoryArray.forEach((madasterCategory:DBL.dblMaterialCategoryMadaster)=>{
      madasterCategory.dblMaterialNetVolumeSummary = parseFloat(madasterCategory.dblMaterialNetVolumeSummary.toFixed(4)) 
      madasterCategory.dblMaterialWeightSummary = parseFloat(madasterCategory.dblMaterialWeightSummary.toFixed(4)) 
    })
    console.log("Madaster",madasterCategoryArray);
  });
}
// export async function summarizeMaterials(...pairs:{materialCategory; madasterCategoryArray:any[]}) {
//   pairs.forEach(({materialCategory,madasterCategoryArray})=>{
//     materialCategory.forEach((category :DBL.dblMaterialCategory) =>{
//       const madasterCategory:string|undefined = category.dblMaterialCategoryMadaster
//       const materialWeight:number|undefined = category.dblMaterialWeightSum
//       const materialVolume:number|undefined = category.dblMaterialNetVolumeSum
//       if(madasterCategory!=undefined && materialWeight!=undefined && materialVolume!= undefined){

//         const categoryIndex = checkMaterialCategory(madasterCategory,madasterCategoryArray)
//         const targetCategory:DBL.dblMaterialCategoryMadaster = madasterCategoryArray[categoryIndex]
        
//           if(categoryIndex!==-1 && targetCategory!== undefined){
//             targetCategory.dblMaterialNetVolumeSummary += materialVolume
//             targetCategory.dblMaterialWeightSummary += materialWeight
//           }
//           else {
//             let newMaterialCategoryMadaster:DBL.dblMaterialCategoryMadaster = {
//               dblMaterialCategoryMadaster:madasterCategory,
//               dblMaterialNetVolumeSummary: materialVolume,
//               dblMaterialWeightSummary:materialWeight
//             }
//             madasterCategoryArray.push(newMaterialCategoryMadaster)
//           }
//       }
//   }

//   })
//     )
//    console.log("XOY YO",madasterCategoryArray)
//   }