import * as OBC from "openbim-components";
import * as WEBIFC from "web-ifc";
import * as DBL from "./dblInterface.ts"
import { Fragment, FragmentsGroup } from "bim-fragment";

export const modelFragmentIdByLevel: any = {};
// Defining a function to check if a value is already present
export async function getEntityFragmentsByLevel(
  model: FragmentsGroup,
  obj: any
) {
  const properties = model.properties;
  if (properties === undefined || null) {return;}
  console.log(obj)
  let storeys
  storeys = obj.storeys;
  let classifiedIdProps: any = {};
  let ifcEntityType: any = null;
  //console.log(storeys)
  for (let level in storeys) {
    const modelEntityFragmentLevelArray: any = [];
    modelFragmentIdByLevel[level] = modelEntityFragmentLevelArray;
    const storeysObject = storeys[level];
    for (let e in storeysObject) {
      let set = storeysObject[e];
      let fragmentId = e;
      let setArray = Array.from(set);
      let modelEntityIdFragment: DBL.ModelEntityIdFragment = {
        expressId: undefined,
        fragmentIds: [fragmentId],
        fragmentMap: {}
      };
      for (let id in setArray) {
        let classifiedId: number = setArray[id] as number;
        //console.log(classifiedId)
         modelEntityIdFragment = {
          expressId: classifiedId,
          fragmentIds: [fragmentId],
          fragmentMap: {}
        };
        const fragmentArray= modelEntityIdFragment.fragmentIds
        classifiedIdProps = properties[classifiedId];
        ifcEntityType = classifiedIdProps.type;

        if ( DBL.isDblCommonElement(ifcEntityType)) {
          const index = checkPresentExpressIdIndex(
            classifiedId,
            modelEntityFragmentLevelArray
          );
          // Case where the Id already exist
          if (index !== -1) {
            modelEntityFragmentLevelArray[index].fragmentIds.push(fragmentId);
          } 
          // Case where the id is new
          else {
            modelEntityFragmentLevelArray.push(modelEntityIdFragment);
          }
        }
      }
    }
    if (modelEntityFragmentLevelArray.length === 0) {
      delete modelFragmentIdByLevel[modelEntityFragmentLevelArray];
    }
  }
  for (const l in modelFragmentIdByLevel){
    const level= modelFragmentIdByLevel[l]
    for (const element of level){
      const expressID= element.expressId
      const fragmentMap= element.fragmentMap
      const expressTemporaryArray:number[] = []
      expressTemporaryArray.push(expressID)
      const expressSet = new Set(expressTemporaryArray)
      const fragmentArray= element.fragmentIds
      fragmentArray.forEach(fragmentId =>{
        fragmentMap[fragmentId] = expressSet
      })
    }
  }
}

function checkPresentExpressIdIndex(
  expressId: number,
  fragments: DBL.ModelEntityIdFragment[]
): number {
  return fragments.findIndex((fragment) => fragment.expressId === expressId);
}

export const wallEntitiesByLevel: { [key: string]: DBL.ModelEntity[] } = {};
export const windowEntitiesByLevel: { [key: string]: DBL.ModelEntity[] } = {};
export const floorEntitiesByLevel: { [key: string]: DBL.ModelEntity[] } = {};
export const roofEntitiesByLevel: { [key: string]: DBL.ModelEntity[] } = {};


export const dblEnvelopeWallElements: any = {};
export const dblEnvelopeWindowElements: any = {};
export const dblEnvelopeFloorElements: any = {};
export const dblEnvelopeRoofElements: any = {};

export let dblWallElements: any 
export let dblWindowElements: any
export let dblFloorElements: any
export let dblRoofElements: any 

export let dblStrLinealElements: any 
export let dblCoveringElements: any


// Structure the information associated with the selected Ids: Properties, quantities and materials.
export async function getDblEntitiesByLevel(model: FragmentsGroup, obj: any) {
  dblWallElements = {};
  dblWindowElements = {};
  dblFloorElements= {};
  dblRoofElements = {};
  
  dblStrLinealElements ={}
  dblCoveringElements={}

  const properties = model.properties;
  if (properties === undefined || null) {
    return;
  }
  const modelMatP = OBC.IfcPropertiesUtils.getAllItemsOfType(
    properties,
    WEBIFC.IFCMATERIALPROPERTIES
  );
  const modelMatPsets = modelMatP.filter(
    (item) =>
      item.Name.value.includes("Pset") &&
      (item.Name.value.includes("Thermal") ||
        item.Name.value.includes("Common") ||
        item.Name.value.includes("DBL"))
  );
  for (const level in obj) {
    //
    let levelArray = obj[level];
    console.log(level);
    const dblModelWallsLevelArray: any = [];
    const dblModelWindowsLevelArray: any = [];
    const dblModelFloorsLevelArray: any = [];
    const dblModelRoofsLevelArray: any = [];
    //
    const dblModelStrLinealLevelArray:any=[];
    const dblModelCoveringLevelArray: any=[];
    //
    const dblModelStairsLevelArray:any=[]
    const dblModelRailingLevelArray:any=[]

    const dblExternalWallsLevelArray: any = [];
    const dblExternalWindowsLevelArray: any = [];
    const dblExternalFloorsLevelArray: any = [];
    const dblExternalRoofsLevelArray: any = [];

    for (let id in levelArray) {
      const expressID = levelArray[id].expressId;
      const fragmentIdArray = levelArray[id].fragmentIds;
      const idProps = properties[expressID];
      const idType = idProps.type;
      const fragmentMap = levelArray[id].fragmentMap

      let dblElementMaterialSet: any = [];
      let dblWallProps: DBL.dblWallProps = {
        dblWallType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblIsThermalEnvelope:undefined,
        dblYearProduction: undefined,
        dblWallEnvelopeCode: undefined,
        dblWallEnvelopeOrientation: undefined,
        dblWallUvalue: undefined,
        dblWallRvalue: undefined,
      };
      let dblWallQtos: DBL.dblWallQtos = {
        dblWallLenght: undefined,
        dblWallWidth: undefined,
        dblWallHeight: undefined,
        dblWallNetArea: undefined,
        dblWallGrossArea: undefined,
        dblWallNetVolume: undefined,
      };
      //Windows
      let dblWindowProps: DBL.dblWindowProps = {
        dblWindowType: undefined,
        dblIsExternal: undefined,
        dblIsThermalEnvelope:undefined,
        dblYearProduction:undefined,
        dblWindowEnvelopeCode: undefined,
        dblWindowEnvelopeOrientation: undefined,
        dblWindowUvalue: undefined,
        dblWindowGvalue: undefined,
        dblWindowGlazingFraction: undefined,
      };
      let dblWindowQtos: DBL.dblWindowQtos = {
        dblWindowWidth: undefined,
        dblWindowHeight: undefined,
        dblWindowArea: undefined,
        dblWindowPerimeter: undefined,
      };
      //Floors
      let dblFloorProps: DBL.dblHorElementProps = {
        dblHorElementType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblIsThermalEnvelope:undefined,
        dblYearProduction:undefined,
        dblHorElementEnvelopeCode: undefined,
        dblHorElementUvalue: undefined,
        dblHorElementRvalue: undefined,
      };
      let dblFloorQtos: DBL.dblHorElementQtos = {
        dblHorElementWidth: undefined,
        dblHorElementPerimeter: undefined,
        dblHorElementNetArea: undefined,
        dblHorElementNetVolume: undefined,
      };
      //Roofs
      let dblRoofProps: DBL.dblHorElementProps = {
        dblHorElementType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblIsThermalEnvelope:undefined,
        dblYearProduction: undefined,
        dblHorElementEnvelopeCode: undefined,
        dblHorElementUvalue: undefined,
        dblHorElementRvalue: undefined,
      };
      let dblRoofQtos: DBL.dblHorElementQtos = {
        dblHorElementWidth: undefined,
        dblHorElementPerimeter: undefined,
        dblHorElementNetArea: undefined,
        dblHorElementNetVolume: undefined,
      };
      let dblStrLinealProps: DBL.dblStrLinealProps = {
        dblIsLoadBearing: undefined, 
        dblIsExternal: undefined
      }
      let dblStrLinealQtos: DBL.dblStrLinealQtos = {
        dblStrLength: undefined,
        dblStrCrossSectionArea :undefined,
        dblStrNetSurfaceArea: undefined,
        dblStrNetVolume: undefined
      }
      let dblCoveringProps: DBL.dblCoveringProps = {
        dblIsExternal:undefined
      }
      let dblCoveringQtos: DBL.dblCoveringQtos ={
        dblCoveringWidth: undefined,
        dblCoveringGrossArea: undefined,
        dblCoveringNetArea: undefined
      }
      const dblEntity: DBL.dblEntity = {
        expressId: parseFloat(expressID),
        fragmentId: fragmentIdArray,
        entityType: idType,
        globalId: idProps.GlobalId,
        fragmentMap:fragmentMap
      };
      //Type
      let elementTypeId: any = undefined;
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      //Element generic Properties
      let elementType: undefined | string = undefined;
      let elementIsLoadBearing: undefined | boolean = undefined;
      let elementIsExternal: undefined | boolean = undefined;
      let elementEnvelopeCode: undefined | string = undefined;
      let elementUvalue: undefined | number = undefined;
      let elementRvalue: undefined | number = undefined;
      let elementYearProduction: undefined|number =undefined;
      let elementIsThermalEnvelope:undefined|boolean = undefined
      //WallQtos
      let wallLenght: undefined | number = undefined;
      let wallWidth: undefined | number = undefined;
      let wallHeight: undefined | number = undefined;
      let wallNetSideArea: number | undefined = undefined;
      let wallGrossArea : number|undefined;
      let wallNetVolume: undefined | number = undefined;
      ///MaterialLayers
      let wallMaterialName = undefined;
      //FloorQtos
      let horElementPerimeter: undefined | number = undefined;
      let horElementWidth: undefined | number = undefined;
      let horElementNetArea: undefined | number = undefined;
      let horElementNetVolume: undefined | number;
      //WallProperties
      let elementEnvelopeOrientation: undefined | string = undefined;
      //WindowProperties
      let windowGlazingFraction: undefined | number = undefined;
      let WindowGvalue: undefined | number = undefined;
      //WindowQuantities
      let windowHeight: undefined | number = undefined;
      let windowWidth: undefined | number = undefined;
      let windowPerimeter: undefined | number = undefined;
      let windowArea: undefined | number = undefined;
      //Window Calculation variables
      let windowLiningDepth: undefined | number = undefined;
      let windowLiningThickness: undefined | number;
      let windowFrameDepth: undefined | number = undefined;
      let windowFrameThickness: undefined | number;
      let windowGlassLayers: undefined | number = undefined;
      let windowGlassThickness1: undefined | number = undefined;
      let windowGlassThickness2: undefined | number = undefined;
      let windowGlassThickness3: undefined | number = undefined;
      //Columns && Beams
      let strCrossSectionArea:number|undefined
      let strLength:number|undefined
      let strNetSurfaceArea:number|undefined
      let strNetVolume: number|undefined
      //Coverings
      let coveringWidth: number|undefined
      let coveringGrossArea: number|undefined
      let coveringNetArea: number|undefined
      //Materials
      let materialThermalConductivity: number | undefined = undefined;
      let materialMassDensity: number | undefined = undefined;
      let materialWeight: number | undefined = undefined;
      let materialNetVolume: number | undefined = undefined;
      //
      let materialCategoryMadaster: string|undefined = undefined
      let materialWasteCategory: string | undefined = undefined;
      let materialUniclassCode: string | undefined = undefined;
      let materialUniclassName: string | undefined = undefined;
      let productUniclassCode: string|undefined = undefined;
      let productUniclassName: string|undefined = undefined;
      let materialProductionYear: number | undefined = undefined;
      let materialLifeSpan: number | undefined = undefined;
      let materialConstituentName: string | undefined = undefined;
      let materialFraction: number | undefined = undefined;

      // Get the IFC element type
      OBC.IfcPropertiesUtils.getRelationMap(
        properties,
        WEBIFC.IFCRELDEFINESBYTYPE,
        (typeId, relatedId) => {
          const workingTypeId = relatedId.filter((id) => id == expressID);
          if (workingTypeId.length !== 0 && DBL.isDblCommonElement(idType)) {
            elementTypeId = typeId;
          }
        }
      );
      //
      const elementTypeProps = properties[elementTypeId]
      if (
        elementTypeId === undefined||null||
        !elementTypeProps.hasOwnProperty("HasPropertySets") ||
        elementTypeProps.HasPropertySets === null
      ) {
        continue;
      }
      if (
        elementTypeProps.hasOwnProperty("HasPropertySets") &&
        elementTypeProps.HasPropertySets.length !== 0
      ) {
        const elementTypePsetArray = elementTypeProps.HasPropertySets;
        for (const pset of elementTypePsetArray) {
          const psetId = pset.value;
          const elementTypePset = properties[psetId];
          if (
            !elementTypePset.hasOwnProperty("HasProperties") ||
            elementTypePset.HasProperties.length == 0 ||
            !elementTypePset.hasOwnProperty("Name") ||
            elementTypePset.Name.value == undefined
          ) {
            continue;
          }
          const elemementTypePsetName = elementTypePset.Name.value;
          const typePsetPropArray = elementTypePset.HasProperties;
          if (DBL.isDblCommonElement (idType))  {
            for (const p of typePsetPropArray) {
              const pId = p.value;
              const typeProp = properties[pId];
              const typePropName = typeProp.Name.value;
              const typePropValue = typeProp.NominalValue.value;
              const typePsetCommon = ["Common","DBL"];
              const conditionPsetCommon = typePsetCommon.some(
                (pset) => elemementTypePsetName.includes(pset)
              );
              const typePsetWindow = [
                "Common",
                "WindowLining",
                "WindowPanel",
                "DoorWindowGlazingType",
                "DBL"
              ];
              const conditionPsetWindow = typePsetWindow.some((pset) =>
                elemementTypePsetName.includes(pset)
              );
              if ((DBL.isDblWall(idType) || DBL.isDblFloor(idType) || DBL.isDblRoof(idType)) && conditionPsetCommon) {
                switch (typePropName) {
                  case "ThermalTransmittance":
                    elementUvalue = parseFloat(typePropValue.toFixed(3));
                    break;
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                  case "LoadBearing":
                    elementIsLoadBearing = typePropValue;
                    break;
                  case "DBL_IsThermalEnvelope":
                    elementIsThermalEnvelope = typePropValue;
                    break;
                  case "DBL_YearProduction":
                    elementYearProduction = typePropValue;
                    break;
                }
              } else if (DBL.isDblWindow(idType) && conditionPsetWindow) {
                switch (typePropName) {
                  case "ThermalTransmittance":
                    elementUvalue = parseFloat(typePropValue.toFixed(3));
                    break;
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                  case "SolarHeatGainTransmittance":
                    WindowGvalue = typePropValue;
                    break;
                  case "GlazingAreaFraction":
                    windowGlazingFraction = typePropValue;
                    break;
                  case "GlassLayers":
                    windowGlassLayers = typePropValue;
                    break;
                  case "GlassThickness1":
                    windowGlassThickness1 = typePropValue;
                    break;
                  case "GlassThickness2":
                    windowGlassThickness2 = typePropValue;
                    break;
                  case "GlassThickness3":
                    windowGlassThickness3 = typePropValue;
                    break;
                  case "LiningDepth":
                    windowLiningDepth = typePropValue;
                    break;
                  case "LiningThickness":
                    windowLiningThickness = typePropValue;
                    break;
                  case "FrameDepth":
                    windowFrameDepth = typePropValue;
                    break;
                  case "FrameThickness":
                    windowFrameThickness = typePropValue;
                    break;
                  case "DBL_IsThermalEnvelope":
                    elementIsThermalEnvelope = typePropValue;
                    break;
                  case "DBL_YearProduction":
                      elementYearProduction = typePropValue;
                      break;
                }
              }else if((DBL.isDblStructuralLinealElement(idType))&& conditionPsetCommon){
                switch (typePropName) {
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                  case "LoadBearing":
                    elementIsLoadBearing = typePropValue;
                    break;
                }
              } else if(DBL.isDblCovering(idType)){
                switch(typePropName){
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                }
              }
              if (elementUvalue !== undefined) {
                elementRvalue = parseFloat((1 / elementUvalue).toFixed(3));
              }
            }
          }
        }
      }
      //Get the element Psets and Properties
      OBC.IfcPropertiesUtils.getRelationMap(
        properties,
        WEBIFC.IFCRELDEFINESBYPROPERTIES,
        (setID, relatedID) => {
          const workingPsetId = relatedID.filter((id) => id == expressID);
          const set = properties[setID];
          const setName = set.Name.value;
          if (
            workingPsetId.length !== 0 && 
            (DBL.isDblCommonElement(idType)) &&
            (set.type == WEBIFC.IFCPROPERTYSET ||
              set.type == WEBIFC.IFCELEMENTQUANTITY) &&
            (setName.includes("Common") ||
              setName.includes("DBL") ||
              setName.includes("Quantities") ||
              setName.includes("Pset_Window"))
          ) {
            if (
              set.hasOwnProperty("HasProperties") &&
              set.type === WEBIFC.IFCPROPERTYSET
            ) {
              const propsArray = set.HasProperties;
              for (let p of propsArray) {
                const pID = p.value;
                const property = properties[pID];
                if (
                  !property.hasOwnProperty("Name") &&
                  !property.Name.hasOwnProperty("value") &&
                  !property.hasOwnProperty("NominalValue")
                ) {
                  continue;
                }
                const propertyName = property.Name.value;
                const elementPropValue = property.NominalValue.value;
                //
                switch (propertyName) {
                  case "Reference":
                    elementType = elementPropValue;
                    break;
                  case "DBL_EnvelopeCode":
                    elementEnvelopeCode = elementPropValue;
                    break;
                }
                if (DBL.isDblWall(idType)) {
                  switch (propertyName) {
                    case "DBL_EnvelopeOrientation":
                      elementEnvelopeOrientation = elementPropValue;
                      break;
                  }
                } else if (DBL.isDblWindow(idType)) {
                  switch (propertyName) {
                    case "DBL_EnvelopeOrientation":
                      elementEnvelopeOrientation = elementPropValue;
                      break;
                    case "ThermalTransmittance":
                      elementUvalue = elementPropValue;
                      break;
                  }
                }
              }
            } else if (
              set.hasOwnProperty("Quantities") &&
              set.type === WEBIFC.IFCELEMENTQUANTITY &&
              (DBL.isDblCommonElement(idType))
            ) {
              const quantArray = set.Quantities;
              for (let q of quantArray) {
                const qId = q.value;
                const quantity = properties[qId];
                const quantityName = quantity.Name.value;
                let quantityValue: any = undefined;
                for (const key in quantity) {
                  if (key.includes("Value")) {
                    quantityValue = quantity[key].value;
                  }
                }
                if (DBL.isDblWall(idType)) {
                  switch (quantityName) {
                    case "Length":
                      wallLenght = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "Width":
                      wallWidth = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "Height":
                      wallHeight = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "NetSideArea":
                      wallNetSideArea = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "NetVolume":
                      wallNetVolume = quantityValue;
                      break;
                  }
                } else if (DBL.isDblFloor(idType) || DBL.isDblRoof(idType)) {
                  switch (quantityName) {
                    case "Perimeter":
                      horElementPerimeter = parseFloat(
                        quantityValue.toFixed(3)
                      );
                      break;
                    case "Depth":
                      horElementWidth = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "NetArea":
                      horElementNetArea = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "NetVolume":
                      horElementNetVolume = quantityValue;
                      break;
                  }
                } else if (DBL.isDblWindow(idType)) {
                  switch (quantityName) {
                    case "Width":
                      windowWidth = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "Height":
                      windowHeight = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "Perimeter":
                      windowPerimeter = parseFloat(quantityValue.toFixed(3));
                      break;
                    case "Area":
                      windowArea = parseFloat(quantityValue.toFixed(3));
                      break;
                  }
                } else if (DBL.isDblStructuralLinealElement(idType)){
                  switch (quantityName){
                    case "Length":
                      strLength = parseFloat (quantityValue.toFixed(3));
                      break;
                    case "CrossSectionArea":
                      strCrossSectionArea = parseFloat (quantityValue.toFixed(3));
                      break;
                    case "NetSurfaceArea":
                      strNetSurfaceArea = parseFloat (quantityValue.toFixed(3));
                      break;
                    case "NetVolume":
                      strNetVolume = parseFloat (quantityValue.toFixed(3))
                    
                  }
                } else if(DBL.isDblCovering(idType)){
                  switch (quantityName){
                    case "Width":
                      coveringWidth = parseFloat (quantityValue.toFixed(3));
                      break;
                    case "GrossArea":
                      coveringGrossArea = parseFloat (quantityValue.toFixed(3));
                      break;
                    case "NetArea":
                      coveringNetArea = parseFloat (quantityValue.toFixed(3));
                      break;
                  }
                }
              }
            }
          }
        }
      );

      // Get the element Material
      OBC.IfcPropertiesUtils.getRelationMap(
        properties,
        WEBIFC.IFCRELASSOCIATESMATERIAL,
        (layMatSet, relatedID) => {
          const workingLayId = relatedID.filter((id) => id == expressID);
          const layMatProp = properties[layMatSet];
          // Case where the element is formed by a single material, therefore is not a constituentset
          if (
            workingLayId.length !== 0 &&
            layMatProp.type !== WEBIFC.IFCMATERIALCONSTITUENTSET &&
            (DBL.isDblCommonElement(idType))
          ) {
            const singleMaterialId = layMatProp.expressID;
            const singleMaterial = properties[singleMaterialId];

            let dblElementSingleMaterial: DBL.dblElementMaterial = {
              dblMaterialName: undefined,
              dblMaterialFraction: undefined,
              dblMaterialCategoryMadaster: undefined,
              dblMaterialUniclassCode: undefined,
              dblMaterialUniclassName: undefined,
              dblProductUniclassCode:undefined,
              dblProductUniclassName:undefined,
              dblCombinedUniclassName:undefined,
              dblMaterialWasteCategory: undefined,
              dblMaterialThermalConductivity: undefined,
              dblMaterialDensity: undefined,
              dblMaterialNetVolume: undefined,
              dblMaterialWeight: undefined,
            };
            
            let materialName: string | undefined = undefined;
            if (
              singleMaterial.hasOwnProperty("Name") &&
              singleMaterial.Name.value !== null
            ) {
              materialName = singleMaterial.Name.value;
            }
            const materialPsets = modelMatPsets.filter(
              (item) => item.Material.value === singleMaterialId
            );
            
            for (let pset in materialPsets) {
              const materialPset = materialPsets[pset];
              const materialPsetName = materialPset.Name.value;
              const materialPropsArray = materialPsets[pset].Properties;

              if (
                materialPsetName == "Pset_MaterialThermal" ||
                materialPsetName == "Pset_MaterialCommon" ||
                materialPsetName.includes("DBL")
              ) {

                for (const i in materialPropsArray) {
                  const materialPropertyId = materialPropsArray[i].value;
                  const materialProperty = properties[materialPropertyId];
                  const materialPropertyName = materialProperty.Name.value;
                  const materialPropertyValue =
                    materialProperty.NominalValue.value;

                  if (materialPsetName == "Pset_MaterialThermal") {
                    switch (materialPropertyName) {
                      case "ThermalConductivity":
                        materialThermalConductivity = parseFloat(
                          materialPropertyValue.toFixed(3)
                        );
                        break;
      
                    }
                  } else if (materialPsetName == "Pset_MaterialCommon") {
                    switch (materialPropertyName) {
                      case "MassDensity":
                        materialMassDensity = parseFloat(materialPropertyValue);
                        break;
                    }
                  } else if (materialPsetName == "DBL_PsetMaterial") {
                    switch (materialPropertyName) {
                      case "DBL_MaterialWasteCategory":
                        materialWasteCategory = materialPropertyValue;
                        break;
                      case "DBL_MaterialUniclassCode":
                        materialUniclassCode = materialPropertyValue;
                        break;
                      case "DBL_MaterialUniclassName":
                        materialUniclassName = materialPropertyValue;
                        break;
                      case "DBL_ProductUniclassCode":
                        productUniclassCode = materialPropertyValue;
                        break;
                      case "DBL_ProductUniclassName":
                        productUniclassName = materialPropertyValue;
                        break;
                      case "DBL_MaterialLifeSpan":
                        materialLifeSpan = materialPropertyValue;
                        break;
                      case "DBL_MaterialMadasterCategory":
                        materialCategoryMadaster = materialPropertyValue;
                        break;
                    }
                  }
                  
                }
              }
            }

            if (
              DBL.isDblWall(idType) &&
              wallNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = wallNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if (
              DBL.isDblFloor(idType) &&
              horElementNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = horElementNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if (
              DBL.isDblRoof(idType) &&
              horElementNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = horElementNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if(
              (DBL.isDblStructuralLinealElement(idType)) &&
              strLength !== undefined &&
              materialMassDensity !== undefined
            ){
              if(strNetVolume !== undefined){
              materialNetVolume = strNetVolume
              materialWeight = materialMassDensity * materialNetVolume
            } else if(strCrossSectionArea!==undefined){
              materialNetVolume = strCrossSectionArea * strLength
              materialWeight = materialMassDensity * materialNetVolume
            }
            } else if(DBL.isDblCovering(idType) &&
              materialMassDensity!== undefined &&
              coveringNetArea !== undefined &&
              coveringWidth !== undefined
            ){
              materialNetVolume = coveringNetArea * coveringWidth
              materialWeight = materialMassDensity * materialNetVolume
            }
            dblElementSingleMaterial = {
              dblMaterialName: materialName,
              dblMaterialFraction: 1,
              dblMaterialCategoryMadaster: materialCategoryMadaster,
              dblMaterialUniclassCode: materialUniclassCode,
              dblMaterialUniclassName: materialUniclassName,
              dblProductUniclassCode:productUniclassCode,
              dblProductUniclassName:productUniclassName,
              dblCombinedUniclassName: (materialUniclassName + "+" + productUniclassName ),
              dblMaterialWasteCategory: materialWasteCategory,
              dblMaterialThermalConductivity: materialThermalConductivity,
              dblMaterialDensity: materialMassDensity,
              dblMaterialNetVolume: materialNetVolume,
              dblMaterialWeight: materialWeight,
            };
            dblElementMaterialSet.push(dblElementSingleMaterial);
          }
          // Case where the elements is composed by a set of material constituents
          else if (
            workingLayId.length !== 0 &&
            layMatProp.type === WEBIFC.IFCMATERIALCONSTITUENTSET  &&
            DBL.isDblCommonElement(idType)
          ) {

            let materialConstituentArray: any[] = [];
            for (const key in layMatProp) {
              if (key.includes("Material")) {
                materialConstituentArray = layMatProp[key];
              }
            }
            if (
              materialConstituentArray.length != 0 &&
              materialConstituentArray !== undefined
            ) {
              for (const m of materialConstituentArray) {
                const materialConstituentId = m.value;
                const materialConstituent = properties[materialConstituentId];
                let materialId = undefined;
                if (
                  materialConstituent.hasOwnProperty("Material") &&
                  materialConstituent.Material !== null
                ) {
                  materialId = materialConstituent.Material.value;
                }
                if (materialId === undefined) {
                  continue;
                }
                const material = properties[materialId];
                //
                let dblElementMaterial: DBL.dblElementMaterial = {
                  dblMaterialName: undefined,
                  dblMaterialFraction: undefined,
                  dblMaterialCategoryMadaster: undefined,
                  dblMaterialUniclassCode: undefined,
                  dblMaterialUniclassName: undefined,
                  dblProductUniclassCode:undefined,
                  dblProductUniclassName:undefined,
                  dblCombinedUniclassName: undefined,
                  dblMaterialWasteCategory: undefined,
                  dblMaterialThermalConductivity: undefined,
                  dblMaterialDensity: undefined,
                  dblMaterialNetVolume: undefined,
                  dblMaterialWeight: undefined,
                };
                //MaterialName
                let materialName: string | undefined = undefined;
                if (
                  material.hasOwnProperty("Name") &&
                  material.Name.value !== null
                ) {
                  materialName = material.Name.value;
                }
                if (
                  materialConstituent.hasOwnProperty("Fraction") &&
                  materialConstituent.Fraction !== null
                ) {
                  materialFraction = materialConstituent.Fraction.value;
                }
                const materialPsets = modelMatPsets.filter(
                  (item) => item.Material.value === materialId
                );
                if (materialPsets.length === 0) {
                  continue;
                }
                if (
                  materialConstituent.hasOwnProperty("Name") &&
                  materialConstituent.Name.value !== (undefined || null)
                ) {
                  materialConstituentName = materialConstituent.Name.value;
                }
                if (DBL.isDblCommonElement(idType)) {
                  for (let pset in materialPsets) {
                    const materialPset = materialPsets[pset];
                    const materialPsetName = materialPset.Name.value;
                    const materialPropsArray = materialPsets[pset].Properties;
                    if (
                      materialPsetName == "Pset_MaterialThermal" ||
                      materialPsetName == "Pset_MaterialCommon" ||
                      materialPsetName.includes("DBL")
                    ) {
                      for (const i in materialPropsArray) {
                        const materialPropertyId = materialPropsArray[i].value;
                        const materialProperty = properties[materialPropertyId];
                        const materialPropertyName =
                          materialProperty.Name.value;
                        const materialPropertyValue =
                          materialProperty.NominalValue.value;
                        if (materialPsetName == "Pset_MaterialThermal") {
                          switch (materialPropertyName) {
                            case "ThermalConductivity":
                              materialThermalConductivity = parseFloat(
                                materialPropertyValue.toFixed(2)
                              );
                              break;
                          }
                        } else if (materialPsetName == "Pset_MaterialCommon") {
                          switch (materialPropertyName) {
                            case "MassDensity":
                              materialMassDensity = parseFloat(materialPropertyValue);
                              break;
                          }
                        } else if (materialPsetName == "DBL_PsetMaterial") {
                          switch (materialPropertyName) {
                            case "DBL_MaterialWasteCategory":
                              materialWasteCategory = materialPropertyValue;
                              break;
                            case "DBL_MaterialUniclassCode":
                              materialUniclassCode = materialPropertyValue;
                              break;
                            case "DBL_MaterialUniclassName":
                              materialUniclassName = materialPropertyValue;
                              break;
                            case "DBL_ProductUniclassCode":
                              productUniclassCode = materialPropertyValue;
                              break;
                            case "DBL_ProductUniclassName":
                              productUniclassName = materialPropertyValue;
                              break;
                            case "DBL_MaterialLifeSpan":
                              materialLifeSpan = materialPropertyValue;
                              break;
                            case "DBL_MaterialMadasterCategory":
                              materialCategoryMadaster = materialPropertyValue;
                              break;
                          }
                        }
                      }
                    }
                  }
                }
                if (
                  DBL.isDblWall(idType) &&
                  materialFraction !== undefined &&
                  wallNetVolume !== undefined &&
                  materialMassDensity !== undefined
                ) {
                  materialNetVolume = wallNetVolume * materialFraction;
                  materialWeight = materialMassDensity * materialNetVolume;
                } else if (
                  (DBL.isDblFloor(idType) || DBL.isDblRoof(idType)) &&
                  materialFraction !== undefined &&
                  horElementNetVolume !== undefined &&
                  materialMassDensity !== undefined
                ) {
                  materialNetVolume = horElementNetVolume * materialFraction;
                  materialWeight = materialMassDensity * materialNetVolume;
                } else if (
                  DBL.isDblWindow(idType) &&
                  materialConstituentName !== undefined &&
                  windowArea !== undefined &&
                  windowGlazingFraction !== undefined
                ) {
                  let windowFrameVolume: number | undefined = undefined;
                  let windowLiningVolume: number | undefined = undefined;
                  if (
                    materialConstituentName.includes("Frame") ||
                    materialConstituentName.includes("Mullion")
                  ) {
                    // FixedWindow Pannel
                    if (
                      windowLiningDepth !== undefined &&
                      windowLiningThickness !== undefined &&
                      windowPerimeter !== undefined &&
                      materialMassDensity !== undefined
                    ) {
                      materialNetVolume = 0.001 *(windowLiningDepth * windowLiningThickness) * windowPerimeter - (4 *((0.001 *windowLiningDepth )*(0.001 * windowLiningThickness ** 2)));
                      materialWeight = materialMassDensity * materialNetVolume;
                    }
                    // Opening Window 1 Pane
                    else if (
                      windowLiningDepth !== undefined &&
                      windowLiningThickness !== undefined &&
                      windowFrameDepth !== undefined &&
                      windowFrameThickness !== undefined &&
                      windowPerimeter !== undefined &&
                      materialMassDensity !== undefined
                    ) {
                      windowLiningVolume = (windowLiningDepth * windowLiningThickness) * windowPerimeter - 4 *(windowLiningThickness * ( windowLiningDepth ** 2));
                      windowFrameVolume = (windowFrameDepth * windowFrameThickness) * windowPerimeter -(4 *(windowFrameThickness *( windowFrameDepth ** 2)));
                      materialNetVolume =windowFrameVolume + windowLiningVolume;
                      materialWeight = materialMassDensity * materialNetVolume;
                    }
                    // Opening Window 2 Pane
                    else if (windowFrameDepth) {
                    }
                  } else if (materialConstituentName.includes("Glass")) {
                    if (
                      windowGlassLayers !== undefined &&
                      materialMassDensity !== undefined
                    ) {
                      if (
                        windowGlassLayers == 1 &&
                        windowGlassThickness1 !== undefined
                      ) {
                        materialNetVolume = (0.001 * windowGlassThickness1) * (windowArea * windowGlazingFraction);
                          
                        materialWeight =
                          materialMassDensity * materialNetVolume;
                      } else if (
                        windowGlassLayers == 2 &&
                        windowGlassThickness1 !== undefined &&
                        windowGlassThickness2 !== undefined
                      ) {
                        materialNetVolume = (0.001 * (windowGlassThickness1 + windowGlassThickness2)) * (windowArea * windowGlazingFraction);
                        materialWeight = materialMassDensity * materialNetVolume
                      } else if (
                        windowGlassLayers == 3 &&
                        windowGlassThickness1 !== undefined &&
                        windowGlassThickness2 !== undefined &&
                        windowGlassThickness3 !== undefined
                      ) {
                        materialNetVolume = 0.001 * (windowGlassThickness1 + windowGlassThickness2 + windowGlassThickness3) * (windowArea * windowGlazingFraction);
                        materialWeight = materialMassDensity * materialNetVolume;
                      }
                    }
                  } else if (materialConstituentName.includes("Sill")) {
                    materialNetVolume = undefined;
                    materialWeight = undefined;
                  }
                } else if ((DBL.isDblStructuralLinealElement(idType)) &&
                  materialFraction !== undefined &&
                  materialMassDensity !== undefined){
                    if(strNetVolume !== undefined){
                      materialNetVolume = strNetVolume * materialFraction
                      materialWeight = materialMassDensity * materialNetVolume
                    } else if (strCrossSectionArea!== undefined && strLength!== undefined){
                      materialNetVolume = (strCrossSectionArea*strLength) * materialFraction
                      materialWeight = materialNetVolume * materialMassDensity
                    }
                  } else if (DBL.isDblCovering(idType) && 
                    materialFraction!== undefined &&
                    materialMassDensity !== undefined &&
                    coveringWidth!== undefined &&
                    coveringNetArea !== undefined
                  ){
                      materialNetVolume = coveringWidth * coveringNetArea * materialFraction
                      materialWeight = materialNetVolume * materialMassDensity
                    }
                
                if(materialNetVolume!== undefined && materialWeight!== undefined){
                  materialNetVolume = materialNetVolume
                  materialWeight = materialWeight
                } 
                dblElementMaterial = {
                  dblMaterialName: materialName,
                  dblMaterialFraction: materialFraction,
                  dblMaterialCategoryMadaster: materialCategoryMadaster,
                  dblMaterialUniclassCode: materialUniclassCode,
                  dblMaterialUniclassName: materialUniclassName,
                  dblProductUniclassCode:productUniclassCode,
                  dblProductUniclassName:productUniclassName,
                  dblCombinedUniclassName: (materialUniclassName+ "+" + productUniclassName),
                  dblMaterialWasteCategory: materialWasteCategory,
                  dblMaterialThermalConductivity: materialThermalConductivity,
                  dblMaterialDensity: materialMassDensity,
                  dblMaterialNetVolume: materialNetVolume,
                  dblMaterialWeight: materialWeight,
                };
                dblElementMaterialSet.push(dblElementMaterial);
              }
            }
          }
        }
      );
      if (DBL.isDblWall(idType)) {
        dblWallProps  = {
          dblWallType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
          dblIsThermalEnvelope: elementIsThermalEnvelope,
          dblYearProduction: elementYearProduction,
          dblWallEnvelopeCode: elementEnvelopeCode,
          dblWallEnvelopeOrientation: elementEnvelopeOrientation,
          dblWallUvalue: elementUvalue,
          dblWallRvalue: elementRvalue,
        };
        if(wallHeight !== undefined && wallLenght !== undefined){
          wallGrossArea = (wallHeight)*(wallLenght)
        }
        dblWallQtos = {
          dblWallLenght: wallLenght,
          dblWallWidth: wallWidth,
          dblWallHeight: wallHeight,
          dblWallNetArea: wallNetSideArea,
          dblWallGrossArea: wallGrossArea,
          dblWallNetVolume: wallNetVolume,
        };
        const dblWall = {
          entity: dblEntity,
          props: dblWallProps,
          qtos: dblWallQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsThermalEnvelope == true) {
          dblExternalWallsLevelArray.push(dblWall);
          dblModelWallsLevelArray.push(dblWall);
        } else {
          dblModelWallsLevelArray.push(dblWall);
        }
      }
      if (DBL.isDblWindow(idType)) {
        dblWindowProps = {
          dblWindowType: elementType,
          dblIsExternal: elementIsExternal,
          dblIsThermalEnvelope: elementIsThermalEnvelope,
          dblYearProduction: elementYearProduction,
          dblWindowEnvelopeCode: elementEnvelopeCode,
          dblWindowEnvelopeOrientation: elementEnvelopeOrientation,
          dblWindowUvalue: elementUvalue,
          dblWindowGvalue: WindowGvalue,
          dblWindowGlazingFraction: windowGlazingFraction,
        };
        dblWindowQtos = {
          dblWindowWidth: windowWidth,
          dblWindowHeight: windowHeight,
          dblWindowArea: windowPerimeter,
          dblWindowPerimeter: windowArea,
        };
        const dblWindow = {
          entity: dblEntity,
          props: dblWindowProps,
          qtos: dblWindowQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsThermalEnvelope === true) {
          dblExternalWindowsLevelArray.push(dblWindow);
          dblModelWindowsLevelArray.push(dblWindow);
        } else {
          dblModelWindowsLevelArray.push(dblWindow);
        }
      }
      if (DBL.isDblFloor(idType)) {
        dblFloorProps = {
          dblHorElementType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
          dblIsThermalEnvelope:elementIsThermalEnvelope,
          dblYearProduction: elementYearProduction,
          dblHorElementEnvelopeCode: elementEnvelopeCode,
          dblHorElementUvalue: elementUvalue,
          dblHorElementRvalue: elementRvalue,
        };
        dblFloorQtos = {
          dblHorElementWidth: horElementWidth,
          dblHorElementPerimeter: horElementPerimeter,
          dblHorElementNetArea: horElementNetArea,
          dblHorElementNetVolume: horElementNetVolume,
        };
        const dblFloor = {
          entity: dblEntity,
          props: dblFloorProps,
          qtos: dblFloorQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsThermalEnvelope == true) {
          dblExternalFloorsLevelArray.push(dblFloor);
          dblModelFloorsLevelArray.push(dblFloor);
        } else dblModelFloorsLevelArray.push(dblFloor);

      } else if (DBL.isDblRoof(idType)) {
        dblRoofProps = {
          dblHorElementType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
          dblIsThermalEnvelope: elementIsThermalEnvelope,
          dblYearProduction: elementYearProduction,
          dblHorElementEnvelopeCode: elementEnvelopeCode,
          dblHorElementUvalue: elementUvalue,
          dblHorElementRvalue: elementRvalue,
        };
        dblRoofQtos = {
          dblHorElementWidth: horElementWidth,
          dblHorElementPerimeter: horElementPerimeter,
          dblHorElementNetArea: horElementNetArea,
          dblHorElementNetVolume: horElementNetVolume,
        };
  
        const dblRoof = {
          entity: dblEntity,
          props: dblRoofProps,
          qtos: dblRoofQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsThermalEnvelope == true) {
          dblExternalRoofsLevelArray.push(dblRoof);
          dblModelRoofsLevelArray.push(dblRoof);
        } else {
          dblModelRoofsLevelArray.push(dblRoof);
        }

      } else if (DBL.isDblStructuralLinealElement(idType)){
        dblStrLinealProps={
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal
        }
        dblStrLinealQtos={
          dblStrCrossSectionArea: strCrossSectionArea,
          dblStrLength: strLength,
          dblStrNetSurfaceArea: strNetSurfaceArea,
          dblStrNetVolume: strNetSurfaceArea
        }
        const dblStrLineal={
          entity: dblEntity,
          props: dblStrLinealProps,
          qtos: dblStrLinealQtos,
          materials: dblElementMaterialSet
        };
        dblModelStrLinealLevelArray.push(dblStrLineal)
        
      } else if (DBL.isDblCovering(idType)){
        const dblCovering={
          entity: dblEntity,
          props: dblCoveringProps,
          qtos: dblCoveringQtos,
          materials: dblElementMaterialSet
        }
        dblCoveringProps ={
          dblIsExternal: elementIsExternal,
        }
        dblCoveringQtos = {
          dblCoveringWidth: coveringWidth,
          dblCoveringGrossArea: coveringGrossArea,
          dblCoveringNetArea: coveringNetArea
        }
        dblModelCoveringLevelArray.push(dblCovering)
      }
    }
    const elementsMapping = [
      { array: dblModelWallsLevelArray, elements: dblWallElements },
      { array: dblExternalWallsLevelArray, elements: dblEnvelopeWallElements },
      { array: dblModelWindowsLevelArray, elements: dblWindowElements },
      { array: dblExternalWindowsLevelArray, elements: dblEnvelopeWindowElements },
      { array: dblModelFloorsLevelArray, elements: dblFloorElements },
      { array: dblExternalFloorsLevelArray, elements: dblEnvelopeFloorElements },
      { array: dblModelRoofsLevelArray, elements: dblRoofElements },
      { array: dblExternalRoofsLevelArray, elements: dblEnvelopeRoofElements },
      { array: dblModelStrLinealLevelArray, elements: dblStrLinealElements},
      { array: dblModelCoveringLevelArray, elements: dblCoveringElements}
    ];
    
    elementsMapping.forEach(mapping => {
      if (mapping.array.length !== 0) {
        mapping.elements[level] = mapping.array;
      }
    });
  }
}
