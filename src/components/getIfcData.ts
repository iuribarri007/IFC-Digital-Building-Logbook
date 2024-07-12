import * as OBC from "openbim-components";
import * as WEBIFC from "web-ifc";
import { Fragment, FragmentsGroup } from "bim-fragment";
//Import dblEntityinterfaces
import { dblCoveringProps, dblCoveringQtos, dblElementMaterial, dblEntity } from "./interfaceIFC";
//Import Wall interfaces
import { dblWallProps, dblWallQtos } from "./interfaceIFC";
//Import Window interfaces
import { dblWindowProps, dblWindowQtos } from "./interfaceIFC";
//Import Horizontal elements interfaces
import { dblHorElementProps, dblHorElementQtos } from "./interfaceIFC";
//Import Structural elements interfaces
import { dblStrLinealProps,dblStrLinealQtos } from "./interfaceIFC";

import {
  expression,
  element,
  property,
} from "three/examples/jsm/nodes/Nodes.js";
import { WebGLNodeBuilder } from "three/examples/jsm/renderers/webgl/nodes/WebGLNodeBuilder.js";
import { NodeData } from "three/examples/jsm/nodes/core/NodeBuilder.js";

interface ModelEntityIdFragment {
  expressId: number|undefined,
  fragmentIds: [any],
  fragmentMap:{}
}
//
function checkPresentExpressIdIndex(
  expressId: number,
  fragments: ModelEntityIdFragment[]
): number {
  return fragments.findIndex((fragment) => fragment.expressId === expressId);
}
//
export const modelFragmentIdByLevel: any = {};
// Defining a function to check if a value is already present
export async function getEntityFragmentsByLevel(
  model: FragmentsGroup,
  obj: any
) {
  const properties = model.properties;
  if (properties === undefined || null) {
    return;
  }
  console.log(obj)
  const storeys = obj.storeys;
  let classifiedIdProps: any = null;
  let classifiedIdType: any = null;
  //console.log(storeys)
  for (const level in storeys) {
    const modelEntityFragmentLevelArray: any = [];

    modelFragmentIdByLevel[level] = modelEntityFragmentLevelArray;
    const storeysObject = storeys[level];
    for (const e in storeysObject) {
      const set = storeysObject[e];

      //console.log(e,set)
      const fragmentId = e;
      const setArray = Array.from(set);

      let modelEntityIdFragment: ModelEntityIdFragment = {
        expressId: undefined,
        fragmentIds: [fragmentId],
        fragmentMap: {}
      };

      for (let id in setArray) {
        const classifiedId: number = setArray[id] as number;
        //console.log(classifiedId)
         modelEntityIdFragment = {
          expressId: classifiedId,
          fragmentIds: [fragmentId],
          fragmentMap: {}
        };
        const fragmentArray= modelEntityIdFragment.fragmentIds

        classifiedIdProps = properties[classifiedId];
        classifiedIdType = classifiedIdProps.type;
        //
        //console.log(modelEntityIdFragment)
        if (
          classifiedIdType === WEBIFC.IFCWALL ||
          classifiedIdType === WEBIFC.IFCWALLSTANDARDCASE ||
          classifiedIdType === WEBIFC.IFCWALLELEMENTEDCASE ||
          classifiedIdType === WEBIFC.IFCCURTAINWALL || //Ifc Wall classes
          classifiedIdType === WEBIFC.IFCWINDOW ||
          classifiedIdType === WEBIFC.IFCPLATE ||
          classifiedIdType === WEBIFC.IFCRAILING ||
          classifiedIdType === WEBIFC.IFCMEMBER ||
          classifiedIdType === WEBIFC.IFCDOOR || //IfcWindow or Curtain pannel
          classifiedIdType === WEBIFC.IFCSLAB ||
          classifiedIdType === WEBIFC.IFCSLABSTANDARDCASE ||
          classifiedIdType === WEBIFC.IFCSLABELEMENTEDCASE ||
          classifiedIdType === WEBIFC.IFCCOVERING || // Ifc floors and related
          classifiedIdType === WEBIFC.IFCROOF ||
          classifiedIdType === WEBIFC.IFCBUILDINGELEMENTPROXY ||
          classifiedIdType === WEBIFC.IFCBUILDINGELEMENT || //Ifc
          classifiedIdType === WEBIFC.IFCCOLUMN ||
          classifiedIdType === WEBIFC.IFCCOLUMNSTANDARDCASE ||
          classifiedIdType === WEBIFC.IFCBEAM ||
          classifiedIdType === WEBIFC.IFCFOOTING ||
          classifiedIdType === WEBIFC.IFCPILE ||
          classifiedIdType === WEBIFC.IFCSTAIR ||
          classifiedIdType === WEBIFC.IFCSTAIRFLIGHT ||
          classifiedIdType === WEBIFC.IFCRAMP ||
          classifiedIdType === WEBIFC.IFCRAMPFLIGHT
        ) {
          const index = checkPresentExpressIdIndex(
            classifiedId,
            modelEntityFragmentLevelArray
          );
          if (index !== -1) {
            modelEntityFragmentLevelArray[index].fragmentIds.push(fragmentId);
            //console.log("Is already in",fragmentId,modelEntityFragmentLevelArray[index])
          } else {
            modelEntityFragmentLevelArray.push(modelEntityIdFragment);
            //console.log("New Index")
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
      //console.log(element, fragmentArray)
      //console.log("Array",expressTemporaryArray)
      fragmentArray.forEach(fragmentId =>{
        fragmentMap[fragmentId] = expressSet
      })
    }
  }
  console.log("This is the thing",modelFragmentIdByLevel)
}

//model entitiesObjectbyLevel
interface ModelEntity {
  key: number; // or string if expressID is string
  entityType: number;
  Attributes: {
    GlobalId: string;
    Name: string;
    Tag: string;
    // PredefinedType?: string; // Uncomment if needed
  };
  [key: string]: any; // To accommodate dynamically added properties
}
interface ModelEntityPset {
  [key: string]: any; // Adjust this type based on the actual structure of the properties
}
//Defining a new interface
interface ModelElement {
  expressId: number;
  fragmentId: Fragment;
  entityType: number;
  globalId: string;
  fragmentMap:OBC.FragmentIdMap
}
interface WallEntity {}
// Define and export Entities
export const wallEntitiesByLevel: { [key: string]: ModelEntity[] } = {};
export const windowEntitiesByLevel: { [key: string]: ModelEntity[] } = {};
export const floorEntitiesByLevel: { [key: string]: ModelEntity[] } = {};
export const roofEntitiesByLevel: { [key: string]: ModelEntity[] } = {};

//Define and export ExternalEntities
export const dblEnvelopeWallElements: any = {};
export const dblEnvelopeWindowElements: any = {};
export const dblEnvelopeFloorElements: any = {};
export const dblEnvelopeRoofElements: any = {};

//Interface ExternalEntities
interface externalWallEntity {
  key: number;
  entityType: number;
  dbl: {
    dblWallType: string;
    dblWallOrientation: string;
    dblWallUvalue: number;
    dblWallRvalue: number;
    dblWallSurface: number;
    dblWallThickness: number;
  };
}
interface externalWindowEntity {
  key: number;
  entityType: number;
  dbl: {
    dblWindowType: any;
    dblWindowOrientation: string;
    dblWindowUvalue: number;
    dblWindowGvalue: number;
    dblWindowSurface: number;
    dblSunProtection: string;
  };
}
//
export const dblWallElements: any = {};
export const dblWindowElements: any = {};
export const dblFloorElements: any = {};
export const dblRoofElements: any = {};
//
export const dblStrLinealElements: any ={}
export const dblCoveringElements: any={}
//

//
//Function
export async function getDblEntitiesByLevel(model: FragmentsGroup, obj: any) {
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

  //
  OBC.IfcPropertiesUtils.getPsetRel;
  //
  for (const level in obj) {
    //
    let levelArray = obj[level];
    console.log(level);
    //const mPsets = OBC.IfcPropertiesUtils.getAllItemsOfType(properties,WEBIFC.IFCMATERIALPROPERTIES)
    //console.log(mPsets)
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
    //ExternalLevel Arrays
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
      
      let dblWallProps: dblWallProps = {
        dblWallType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblWallEnvelopeCode: undefined,
        dblWallEnvelopeOrientation: undefined,
        dblWallUvalue: undefined,
        dblWallRvalue: undefined,
      };
      let dblWallQtos: dblWallQtos = {
        dblWallLenght: undefined,
        dblWallWidth: undefined,
        dblWallHeight: undefined,
        dblWallNetArea: undefined,
        dblWallNetVolume: undefined,
      };
      //Windows
      let dblWindowProps: dblWindowProps = {
        dblWindowType: undefined,
        dblIsExternal: undefined,
        dblWindowEnvelopeCode: undefined,
        dblWindowEnvelopeOrientation: undefined,
        dblWindowUvalue: undefined,
        dblWindowGvalue: undefined,
        dblWindowGlazingFraction: undefined,
      };
      let dblWindowQtos: dblWindowQtos = {
        dblWindowWidth: undefined,
        dblWindowHeight: undefined,
        dblWindowArea: undefined,
        dblWindowPerimeter: undefined,
      };
      //Floors
      let dblFloorProps: dblHorElementProps = {
        dblHorElementType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblHorElementEnvelopeCode: undefined,
        dblHorElementUvalue: undefined,
        dblHorElementRvalue: undefined,
      };
      let dblFloorQtos: dblHorElementQtos = {
        dblHorElementWidth: undefined,
        dblHorElementPerimeter: undefined,
        dblHorElementNetArea: undefined,
        dblHorElementNetVolume: undefined,
      };
      //Roofs
      let dblRoofProps: dblHorElementProps = {
        dblHorElementType: undefined,
        dblIsLoadBearing: undefined,
        dblIsExternal: undefined,
        dblHorElementEnvelopeCode: undefined,
        dblHorElementUvalue: undefined,
        dblHorElementRvalue: undefined,
      };
      let dblRoofQtos: dblHorElementQtos = {
        dblHorElementWidth: undefined,
        dblHorElementPerimeter: undefined,
        dblHorElementNetArea: undefined,
        dblHorElementNetVolume: undefined,
      };
      let dblStrLinealProps :dblStrLinealProps ={
        dblIsLoadBearing: undefined, 
        dblIsExternal: undefined
      }
      let dblStrLinealQtos: dblStrLinealQtos = {
        dblStrLength: undefined,
        dblStrCrossSectionArea :undefined,
        dblStrNetSurfaceArea: undefined,
        dblStrNetVolume: undefined
      }
      let dblCoveringProps: dblCoveringProps = {
        dblIsExternal:undefined
      }
      let dblCoveringQtos: dblCoveringQtos ={
        dblCoveringWidth: undefined,
        dblCoveringGrossArea: undefined,
        dblCoveringNetArea: undefined
      }

      //console.log(expressID,idProps)
      //
      const dblEntity: dblEntity = {
        expressId: parseFloat(expressID),
        fragmentId: fragmentIdArray,
        entityType: idType,
        globalId: idProps.GlobalId,
        fragmentMap:fragmentMap
      };
      const isWall =
        idType === WEBIFC.IFCWALL ||
        idType === WEBIFC.IFCWALLSTANDARDCASE ||
        idType === WEBIFC.IFCWALLELEMENTEDCASE;
      const isFloor =
        idType === WEBIFC.IFCSLAB ||
        idType === WEBIFC.IFCSLABSTANDARDCASE ||
        idType === WEBIFC.IFCSLABELEMENTEDCASE;
      const isWindow = idType === WEBIFC.IFCWINDOW;
      const isRoof =
        idType === WEBIFC.IFCROOF /*/|| (idType===WEBIFC.IFCSLAB )/*/;
      const isCovering= 
        idType === WEBIFC.IFCCOVERING 
      const isColumn =
        idType === WEBIFC.IFCCOLUMN ||
        idType === WEBIFC.IFCCOLUMNSTANDARDCASE 
      const isBeam =
        idType === WEBIFC.IFCBEAM ||
        idType === WEBIFC.IFCBEAMSTANDARDCASE
      const isDblElement = 
        (isWall || isWindow ||isFloor || isRoof || isBeam || isCovering || isBeam ||isColumn)
      //
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
      //WallQtos
      let wallLenght: undefined | number = undefined;
      let wallWidth: undefined | number = undefined;
      let wallHeight: undefined | number = undefined;
      let wallNetSideArea: any | undefined = undefined;
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
      //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      //Columns && Beams
      let strCrossSectionArea:number|undefined
      let strLength:number|undefined
      let strNetSurfaceArea:number|undefined
      let strNetVolume: number|undefined
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      //Coverings
      let coveringWidth: number|undefined
      let coveringGrossArea: number|undefined
      let coveringNetArea: number|undefined
      //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      //LayerSetMaterials
      let layerMaterialName: undefined | string = undefined;
      let layerMaterialThickness: undefined | number;
      let layerMaterialThermalConductivity: undefined | number = undefined;
      let layerMaterialDensity: undefined | number;
      let layerNetVolume: undefined | number = undefined;
      let layerWeight: undefined | number = undefined;
      //Materials
      let materialThermalConductivity: number | undefined = undefined;
      let materialSpecificHeat: number | undefined = undefined;
      let materialMassDensity: number | undefined = undefined;
      let materialWeight: number | undefined = undefined;
      let materialNetVolume: number | undefined = undefined;
      //
      let materialWasteCategory: string | undefined = undefined;
      let materialUniclassCode: string | undefined = undefined;
      let materialUniclassName: string | undefined = undefined;
      let materialProductionYear: number | undefined = undefined;
      let materialLifeSpan: number | undefined = undefined;
      let materialConstituentName: string | undefined = undefined;
      let materialFraction: number | undefined = undefined;
      // getting the type
      OBC.IfcPropertiesUtils.getRelationMap(
        properties,
        WEBIFC.IFCRELDEFINESBYTYPE,
        (typeId, relatedId) => {
          const workingTypeId = relatedId.filter((id) => id == expressID);
          if (workingTypeId.length !== 0 && isDblElement) {
            elementTypeId = typeId;
          }
        }
      );
      //
      const elementTypeProps = properties[elementTypeId]
      // Get the type Psets and Properties
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
          if (isDblElement)  {
            for (const p of typePsetPropArray) {
              const pId = p.value;
              const typeProp = properties[pId];
              const typePropName = typeProp.Name.value;
              const typePropValue = typeProp.NominalValue.value;
              const typePsetCommon = ["Common"];
              const conditionPsetCommon = typePsetCommon.some(
                (pset) => elemementTypePsetName.includes(pset)
              );
              const typePsetWindow = [
                "Common",
                "WindowLining",
                "WindowPanel",
                "DoorWindowGlazingType",
              ];
              const conditionPsetWindow = typePsetWindow.some((pset) =>
                elemementTypePsetName.includes(pset)
              );
              if ((isWall || isFloor || isRoof) && conditionPsetCommon) {
                switch (typePropName) {
                  case "ThermalTransmittance":
                    elementUvalue = parseFloat(typePropValue.toFixed(2));
                    break;
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                  case "LoadBearing":
                    elementIsLoadBearing = typePropValue;
                    break;
                }
              } else if (isWindow && conditionPsetWindow) {
                //console.log(expressID,elementTypePset)
                switch (typePropName) {
                  case "ThermalTransmittance":
                    elementUvalue = parseFloat(typePropValue.toFixed(2));
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
                }
              }else if((isColumn||isBeam)&& conditionPsetCommon){
                switch (typePropName) {
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                  case "LoadBearing":
                    elementIsLoadBearing = typePropValue;
                    break;
                }
              } else if(isCovering){
                switch(typePropName){
                  case "IsExternal":
                    elementIsExternal = typePropValue;
                    break;
                }
              }
              if (elementUvalue !== undefined) {
                elementRvalue = parseFloat((1 / elementUvalue).toFixed(2));
              }
            }
          }
        }
      }
      //Get the elementPsets and properties
      OBC.IfcPropertiesUtils.getRelationMap(
        properties,
        WEBIFC.IFCRELDEFINESBYPROPERTIES,
        (setID, relatedID) => {
          const workingPsetId = relatedID.filter((id) => id == expressID);
          const set = properties[setID];
          const setName = set.Name.value;
          if (
            workingPsetId.length !== 0 && 
            (isDblElement) &&
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
              //console.log("Pset",expressID,setID,set)
              for (let p of propsArray) {
                const pID = p.value;
                const property = properties[pID];
                //console.log(expressID,setID,pID,property)
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
                if (isWall) {
                  switch (propertyName) {
                    case "DBL_EnvelopeOrientation":
                      elementEnvelopeOrientation = elementPropValue;
                      break;
                  }
                } else if (isWindow) {
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
              (isDblElement)
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
                if (isWall) {
                  switch (quantityName) {
                    case "Length":
                      wallLenght = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "Width":
                      wallWidth = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "Height":
                      wallHeight = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "NetSideArea":
                      wallNetSideArea = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "NetVolume":
                      wallNetVolume = parseFloat(quantityValue.toFixed(2));
                      break;
                  }
                } else if (isFloor || isRoof) {
                  switch (quantityName) {
                    case "Perimeter":
                      horElementPerimeter = parseFloat(
                        quantityValue.toFixed(2)
                      );
                      break;
                    case "Depth":
                      horElementWidth = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "NetArea":
                      horElementNetArea = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "NetVolume":
                      horElementNetVolume = parseFloat(
                        quantityValue.toFixed(2)
                      );
                      break;
                  }
                } else if (isWindow) {
                  switch (quantityName) {
                    case "Width":
                      windowWidth = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "Height":
                      windowHeight = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "Perimeter":
                      windowPerimeter = parseFloat(quantityValue.toFixed(2));
                      break;
                    case "Area":
                      windowArea = parseFloat(quantityValue.toFixed(2));
                      break;
                  }
                } else if (isBeam || isColumn){
                  switch (quantityName){
                    case "Length":
                      strLength = parseFloat (quantityValue.toFixed(2));
                      break;
                    case "CrossSectionArea":
                      strCrossSectionArea = parseFloat (quantityValue.toFixed(2));
                      break;
                    case "NetSurfaceArea":
                      strNetSurfaceArea = parseFloat (quantityValue.toFixed(2));
                      break;
                    case "NetVolume":
                      strNetVolume = parseFloat (quantityValue.toFixed(2))
                    
                  }
                } else if(isCovering){
                  switch (quantityName){
                    case "Width":
                      coveringWidth = parseFloat (quantityValue.toFixed(2));
                      break;
                    case "GrossArea":
                      coveringGrossArea = parseFloat (quantityValue.toFixed(2));
                      break;
                    case "NetArea":
                      coveringNetArea = parseFloat (quantityValue.toFixed(2));
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
          //console.log(expressID,layMatProp.type,relatedID)
          //console.log(expressID,layMatProp.type,layMatProp)
          // MaterialLayerSet
          if (
            workingLayId.length !== 0 &&
            layMatProp.type !== WEBIFC.IFCMATERIALCONSTITUENTSET &&
            (isDblElement)
          ) {
            const singleMaterialId = layMatProp.expressID;
            const singleMaterial = properties[singleMaterialId];

            let dblElementSingleMaterial: dblElementMaterial = {
              dblMaterialName: undefined,
              dblMaterialFraction: undefined,
              dblMaterialUniclassCode: undefined,
              dblMaterialUniclassName: undefined,
              dblMaterialWasteCategory: undefined,
              dblMaterialLifeSpan: undefined,
              dblMaterialProductionYear: undefined,
              dblMaterialThermalConductivity: undefined,
              dblMaterialDensity: undefined,
              dblMaterialNetVolume: undefined,
              dblMaterialWeight: undefined,
            };
            //
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

            //
            for (let pset in materialPsets) {
              const materialPset = materialPsets[pset];
              const materialPsetName = materialPset.Name.value;
              const materialPropsArray = materialPsets[pset].Properties;
              //console.log(expressID,singleMaterial,materialPsetName)
              if (
                materialPsetName == "Pset_MaterialThermal" ||
                materialPsetName == "Pset_MaterialCommon" ||
                materialPsetName.includes("DBL")
              ) {
                //console.log("I am a materialPset",materialPsetName,materialPset)
                for (const i in materialPropsArray) {
                  const materialPropertyId = materialPropsArray[i].value;
                  const materialProperty = properties[materialPropertyId];
                  const materialPropertyName = materialProperty.Name.value;
                  const materialPropertyValue =
                    materialProperty.NominalValue.value;
                  //console.log(idType,materialPsetName,materialPropertyName,materialPropertyValue)
                  if (materialPsetName == "Pset_MaterialThermal") {
                    switch (materialPropertyName) {
                      case "ThermalConductivity":
                        materialThermalConductivity = parseFloat(
                          materialPropertyValue.toFixed(2)
                        );
                        break;
                      case "SpecificHeatCapacity":
                        materialSpecificHeat = parseFloat(
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
                      case "DBL_MaterialLifeSpan":
                        materialLifeSpan = materialPropertyValue;
                        break;
                      case "DBL_MaterialProductionYear":
                        materialProductionYear = materialPropertyValue;
                        break;
                    }
                  }
                }
              }
            }
            if (
              isWall &&
              wallNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = wallNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if (
              isFloor &&
              horElementNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = horElementNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if (
              isRoof &&
              horElementNetVolume !== undefined &&
              materialMassDensity !== undefined
            ) {
              materialNetVolume = horElementNetVolume;
              materialWeight = materialMassDensity * materialNetVolume;
            } else if(
              (isBeam ||isColumn) &&
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
            } else if(isCovering &&
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
              dblMaterialUniclassCode: materialUniclassCode,
              dblMaterialUniclassName: materialUniclassName,
              dblMaterialWasteCategory: materialWasteCategory,
              dblMaterialLifeSpan: undefined,
              dblMaterialProductionYear: undefined,
              dblMaterialThermalConductivity: materialThermalConductivity,
              dblMaterialDensity: materialMassDensity,
              dblMaterialNetVolume: materialNetVolume,
              dblMaterialWeight: materialWeight,
            };
            //console.log(expressID,dblElementSingleMaterial)
            dblElementMaterialSet.push(dblElementSingleMaterial);
            //console.log("Material succesfully pushed", dblElementSingleMaterial,expressID)
          }
          //
          else if (
            workingLayId.length !== 0 &&
            layMatProp.type === WEBIFC.IFCMATERIALCONSTITUENTSET  &&
            isDblElement
          ) {
            //console.log("Materials",expressID,"constituentSet",layMatProp)
            let materialConstituentArray: any[] = [];
            for (const key in layMatProp) {
              if (key.includes("Material")) {
                //console.log(layMatProp[key])
                materialConstituentArray = layMatProp[key];
              }
            }
            //console.log(materialConstituentArray)
            if (
              materialConstituentArray.length != 0 &&
              materialConstituentArray !== undefined
            ) {
              for (const m of materialConstituentArray) {
                const materialConstituentId = m.value;
                const materialConstituent = properties[materialConstituentId];
                //console.log("Material", materialConstituent)
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
                let dblElementMaterial: dblElementMaterial = {
                  dblMaterialName: undefined,
                  dblMaterialFraction: undefined,
                  dblMaterialUniclassCode: undefined,
                  dblMaterialUniclassName: undefined,
                  dblMaterialWasteCategory: undefined,
                  dblMaterialLifeSpan: undefined,
                  dblMaterialProductionYear: undefined,
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
                if (isDblElement) {
                  for (let pset in materialPsets) {
                    const materialPset = materialPsets[pset];
                    const materialPsetName = materialPset.Name.value;
                    const materialPropsArray = materialPsets[pset].Properties;
                    if (
                      materialPsetName == "Pset_MaterialThermal" ||
                      materialPsetName == "Pset_MaterialCommon" ||
                      materialPsetName.includes("DBL")
                    ) {
                      //console.log("I am a materialPset",materialPsetName,materialPset)
                      for (const i in materialPropsArray) {
                        const materialPropertyId = materialPropsArray[i].value;
                        const materialProperty = properties[materialPropertyId];
                        const materialPropertyName =
                          materialProperty.Name.value;
                        const materialPropertyValue =
                          materialProperty.NominalValue.value;
                        //console.log(idType,materialPsetName,materialPropertyName,materialPropertyValue)
                        if (materialPsetName == "Pset_MaterialThermal") {
                          switch (materialPropertyName) {
                            case "ThermalConductivity":
                              materialThermalConductivity = parseFloat(
                                materialPropertyValue.toFixed(2)
                              );
                              break;
                            case "SpecificHeatCapacity":
                              materialSpecificHeat = parseFloat(
                                materialPropertyValue.toFixed(2)
                              );
                              break;
                          }
                        } else if (materialPsetName == "Pset_MaterialCommon") {
                          switch (materialPropertyName) {
                            case "MassDensity":
                              materialMassDensity = parseFloat(
                                materialPropertyValue
                              );
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
                            case "DBL_MaterialLifeSpan":
                              materialLifeSpan = materialPropertyValue;
                              break;
                            case "DBL_MaterialProductionYear":
                              materialProductionYear = materialPropertyValue;
                              break;
                          }
                        }
                      }
                    }
                  }
                }

                if (
                  isWall &&
                  materialFraction !== undefined &&
                  wallNetVolume !== undefined &&
                  materialMassDensity !== undefined
                ) {
                  materialNetVolume = wallNetVolume * materialFraction;
                  materialWeight = materialMassDensity * materialNetVolume;
                } else if (
                  (isFloor || isRoof) &&
                  materialFraction !== undefined &&
                  horElementNetVolume !== undefined &&
                  materialMassDensity !== undefined
                ) {
                  materialNetVolume = horElementNetVolume * materialFraction;
                  materialWeight = materialMassDensity * materialNetVolume;
                } else if (
                  isWindow &&
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
                      materialNetVolume =
                        0.001 *
                          (windowLiningDepth * windowLiningThickness) *
                          windowPerimeter -
                        4 *
                          (0.001 *
                            windowLiningDepth *
                            (0.001 * windowLiningThickness ** 2));
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
                      windowLiningVolume =
                        
                          (windowLiningDepth * windowLiningThickness) *
                          windowPerimeter -
                        4 *
                          (
                            windowLiningThickness *
                            ( windowLiningDepth ** 2));
                      windowFrameVolume =
                        
                          (windowFrameDepth * windowFrameThickness) *
                          windowPerimeter -(4 *
                            (
                              windowFrameThickness *
                              ( windowFrameDepth ** 2)))
                        ;
                      materialNetVolume =
                        windowFrameVolume + windowLiningVolume;
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
                      //TAMOS AQUI
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
                        materialNetVolume =
                          0.001 *
                          (windowGlassThickness1 +
                            windowGlassThickness2 +
                            windowGlassThickness3) *
                          (windowArea * windowGlazingFraction);
                        materialWeight =
                          materialMassDensity * materialNetVolume;
                      }
                    }
                  } else if (materialConstituentName.includes("Sill")) {
                    materialNetVolume = undefined;
                    materialWeight = undefined;
                  }
                  //MaterialConstituent Sill is missing
                } else if ((isColumn || isBeam) &&
                  materialFraction !== undefined &&
                  materialMassDensity !== undefined){
                    if(strNetVolume !== undefined){
                      materialNetVolume = strNetVolume * materialFraction
                      materialWeight = materialMassDensity * materialNetVolume
                    } else if (strCrossSectionArea!== undefined && strLength!== undefined){
                      materialNetVolume = (strCrossSectionArea*strLength) * materialFraction
                      materialWeight = materialNetVolume * materialMassDensity
                    }
                  } else if (isCovering && 
                    materialFraction!== undefined &&
                    materialMassDensity !== undefined &&
                    coveringWidth!== undefined &&
                    coveringNetArea !== undefined
                  ){
                      materialNetVolume = coveringWidth * coveringNetArea * materialFraction
                      materialWeight = materialNetVolume * materialMassDensity
                    }
                
                if(materialNetVolume!== undefined && materialWeight!== undefined){
                  materialNetVolume = parseInt(materialNetVolume.toFixed(6))
                  materialWeight = parseInt(materialWeight.toFixed(6))
                } 
                dblElementMaterial: dblElementMaterial = {
                  dblMaterialName: materialName,
                  dblMaterialFraction: materialFraction,
                  dblMaterialUniclassCode: materialUniclassCode,
                  dblMaterialUniclassName: materialUniclassName,
                  dblMaterialWasteCategory: materialWasteCategory,
                  dblMaterialLifeSpan: undefined,
                  dblMaterialProductionYear: undefined,
                  dblMaterialThermalConductivity: materialThermalConductivity,
                  dblMaterialDensity: materialMassDensity,
                  dblMaterialNetVolume: materialNetVolume,
                  dblMaterialWeight: materialWeight,
                };
                dblElementMaterialSet.push(dblElementMaterial);
              }
            }
          }
          //AQUI
        }
      );
      //console.log(idType,expressID,"ElementMaterialSet",dblElementMaterialSet)
      if (isWall) {
        dblWallProps: dblWallProps = {
          dblWallType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
          dblWallEnvelopeCode: elementEnvelopeCode,
          dblWallEnvelopeOrientation: elementEnvelopeOrientation,
          dblWallUvalue: elementUvalue,
          dblWallRvalue: elementRvalue,
        };
        dblWallQtos: dblWallQtos = {
          dblWallLenght: wallLenght,
          dblWallWidth: wallWidth,
          dblWallHeight: wallHeight,
          dblWallNetArea: wallNetSideArea,
          dblWallNetVolume: wallNetVolume,
        };
        //console.log("DBL_Wall",dblWallProps,dblWallQtos,dblElementMaterialLayerSet)
        const dblWall = {
          entity: dblEntity,
          props: dblWallProps,
          qtos: dblWallQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsExternal == true) {
          dblExternalWallsLevelArray.push(dblWall);
          dblModelWallsLevelArray.push(dblWall);
        } else {
          dblModelWallsLevelArray.push(dblWall);
        }
        //console.log(expressID,dblWall)
      }
      if (isWindow) {
        dblWindowProps: dblWindowProps = {
          dblWindowType: elementType,
          dblIsExternal: elementIsExternal,
          dblWindowEnvelopeCode: elementEnvelopeCode,
          dblWindowEnvelopeOrientation: elementEnvelopeOrientation,
          dblWindowUvalue: elementUvalue,
          dblWindowGvalue: WindowGvalue,
          dblWindowGlazingFraction: windowGlazingFraction,
        };
        dblWindowQtos: dblWindowQtos = {
          dblWindowWidth: windowWidth,
          dblWindowHeight: windowHeight,
          dblWindowArea: windowPerimeter,
          dblWindowPerimeter: windowArea,
        };

        //console.log("DBL_Window",dblWindowProps, dblWindowQtos)
        const dblWindow = {
          entity: dblEntity,
          props: dblWindowProps,
          qtos: dblWindowQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsExternal === true) {
          dblExternalWindowsLevelArray.push(dblWindow);
          dblModelWindowsLevelArray.push(dblWindow);
        } else {
          dblModelWindowsLevelArray.push(dblWindow);
        }
        //console.log(expressID,dblWindow)
      }
      if (isFloor) {
        dblFloorProps = {
          dblHorElementType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
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
        //console.log("DBL_Floor",dblFloorProps,dblFloorQtos,dblElementMaterialLayerSet)
        const dblFloor = {
          entity: dblEntity,
          props: dblFloorProps,
          qtos: dblFloorQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsExternal == true) {
          dblExternalFloorsLevelArray.push(dblFloor);
          dblModelFloorsLevelArray.push(dblFloor);
        } else dblModelFloorsLevelArray.push(dblFloor);
        //console.log("Floor",expressID,dblFloor)
      } else if (isRoof) {
        dblRoofProps = {
          dblHorElementType: elementType,
          dblIsLoadBearing: elementIsLoadBearing,
          dblIsExternal: elementIsExternal,
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
        //console.log("DBL_Roof",dblRoofProps,dblRoofQtos,dblElementMaterialLayerSet)
        const dblRoof = {
          entity: dblEntity,
          props: dblRoofProps,
          qtos: dblRoofQtos,
          materials: dblElementMaterialSet,
        };
        if (elementIsExternal == true) {
          dblExternalRoofsLevelArray.push(dblRoof);
          dblModelRoofsLevelArray.push(dblRoof);
        } else {
          dblModelRoofsLevelArray.push(dblRoof);
        }

        //console.log(expressID,dblRoof)
      } else if (isColumn || isBeam){
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
        
      } else if (isCovering){
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
  console.log("All Walls", dblWallElements);
  console.log("All Windows", dblWindowElements);
  console.log("All Floors", dblFloorElements);
  console.log("All Roofs", dblRoofElements);
  console.log ("AllStrLineal", dblStrLinealElements)
  console.log ("All Coverings", dblCoveringElements)
  //console.log("DBLExternalWalls",dblEnvelopeWallElements)
  //console.log("DBLExternalWindow",dblEnvelopeWindowElements)
  //console.log("DBLExternalFloors",dblEnvelopeFloorElements)
  //console.log("DBLExternalRoofs",dblEnvelopeRoofElements)
}
export const dblEnvelopeWalls: any = {};
export const dblEnvelopeFloors: any = {};
export const dblEnvelopeWindows: any = {};
export const dblEnvelopeRoofs: any = {};

interface dblComposedEntity{
  dblEnvelopeExpressIdArray:any[],
  dblEnvelopeFragmentMap:{}
}
interface dblVerticalEnvelopeComponent {
  dblComponentExpressId: string | undefined;
  dblComponentEntityType: number | undefined;
  dblComponentEnvelopeCode: string | undefined;
  dblComponentType: string | undefined;
  dblComponentRvalue: number | undefined;
  dblComponentOrientation: string | undefined;
  dblComponentWidth: number | undefined;
  dblComponentNetArea: number | undefined;
  dblEntity:dblEntity

}
interface dblVerticalLayeredEnvelope {
  dblEnvelopeCode: string | undefined;
  dblEnvelopeType: string | undefined;
  dblEnvelopeUvalue: number | undefined;
  dblEnvelopeWidth: number | undefined;
  dblEnvelopeArea: number | undefined;
  dblEnvelopeOrientation: string | undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
interface dblHorizontalEnvelopeComponent {
  dblComponentExpressId: string | undefined;
  dblComponentEntityType: number | undefined;
  dblComponentEnvelopeCode: string | undefined;
  dblComponentType: string | undefined;
  dblComponentRvalue: number | undefined;
  dblComponentWidth: number | undefined;
  dblComponentNetArea: number | undefined;
  dblEntity:dblEntity
}
interface dblHorizontalLayeredEnvelope {
  dblEnvelopeCode: string | undefined;
  dblEnvelopeType: string | undefined;
  dblEnvelopeUvalue: number | undefined;
  dblEnvelopeWidth: number | undefined;
  dblEnvelopeArea: number | undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
interface dblWindowEnvelopeComponent {
  dblEnvelopeExpressId: string | undefined;
}
interface dblWindowEnvelope {
  dblEnvelopeCode: string | undefined;
  dblEnvelopeOrientation: string | undefined;
  dblEnvelopeWindowType: string | undefined;
  dblEnvelopeWindowWidth: number | undefined;
  dblEnvelopeWindowHeight: number | undefined;
  dblEnvelopeWindowUvalue: number | undefined;
  dblEnvelopeWindowgValue: number | undefined;
  dblEnvelopeWindowCount: number | undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
interface dblMaterialCategory {
  dblMaterialCategoryUniclassName: string|undefined
  dblMaterialCategoryUniclassCode:string|undefined
  dblMaterialCategoryWasteCategory: string|undefined
  dblMaterialCategoryMassDensity: number|undefined
  dblMaterialNetVolumeSum: number|undefined
  dblMaterialWeightSum:number|undefined
  dblMaterialArray:{}[]
}
const dblMaterial = {};
//
function checkEnvelopeValue(envelopeValue: string, array: any[]) {
  return array.findIndex(
    (dblElement) => dblElement.dblEnvelopeCode === envelopeValue
  );
}
function classifyMaterialBuildingLayer(materialArray, dblBuildingLayer): void {
  materialArray.forEach((material) => {
    
    const materialCategoryName = material.dblMaterialUniclassName;
    const materialCategoryUniclassCode = material.dblMaterialUniclassCode;
    const materialCategoryWasteCategory = material.dblMaterialWasteCategory;
    const materialCategoryMassDensity = material.dblMaterialDensity

    // Buscar si ya existe una categoría con el mismo nombre
    let existingCategory = dblBuildingLayer.find(category => category.dblMaterialCategoryUniclassName === materialCategoryName);

    if (!existingCategory) {
      // Si no existe, crear un nuevo objeto de categoría
      const newMaterialCategory: dblMaterialCategory = {
        dblMaterialCategoryUniclassName: materialCategoryName,
        dblMaterialCategoryUniclassCode: materialCategoryUniclassCode,
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
  });
}
function sumMaterialArrays(...arrays: any): void {
  arrays.forEach((array) => {
    array.forEach(obj => {
      let weightSum = obj.dblMaterialWeightSum || 0;
      let netVolumeSum = obj.dblMaterialNetVolumeSum || 0;
      obj.dblMaterialArray.forEach((material) => {
        if(material.dblMaterialWeight!==undefined){
          weightSum += material.dblMaterialWeight || 0;
        }
        if(material.dblMaterialNetVolume!==undefined){
          netVolumeSum += material.dblMaterialNetVolume || 0;
        }
      });
      if (weightSum !== obj.dblMaterialWeightSum) {
        obj.dblMaterialWeightSum = weightSum.toFixed(6);
      }
      if (netVolumeSum !== obj.dblMaterialNetVolumeSum) {
        obj.dblMaterialNetVolumeSum = netVolumeSum.toFixed(6);
      }
    });
  });
}


export const dblSkinMaterialInventory: any = [];
export const dblStructuralMaterialInventory: any = [];
export const dblServiceMaterialInventory: any = [];
export const dblSpaceMaterialInventory: any = [];
export const dblStuffMaterialInventory: any = [];

export async function classifyMaterials(...obj) {  
  

  obj.forEach((obj) => {
    for (const level in obj) {
      const dblLevel = obj[level]; 
      for (const e in dblLevel) {
        const dblElement = dblLevel[e];
        const elementEntityType = dblElement.entity.entityType;
        const elementExpressId = dblElement.entity.expressId;
        const isWall =
          elementEntityType === WEBIFC.IFCWALL ||
          elementEntityType === WEBIFC.IFCWALLSTANDARDCASE ||
          elementEntityType === WEBIFC.IFCCURTAINWALL ||
          elementEntityType === WEBIFC.IFCWALLELEMENTEDCASE;
        const isWindow = elementEntityType === WEBIFC.IFCWINDOW;
        const isFloor =
          elementEntityType === WEBIFC.IFCSLAB ||
          elementEntityType === WEBIFC.IFCSLABSTANDARDCASE;
        const isRoof = elementEntityType === WEBIFC.IFCROOF;
        //
        const isColumn =
          elementEntityType === WEBIFC.IFCCOLUMN ||
          elementEntityType === WEBIFC.IFCCOLUMNSTANDARDCASE 
        const isBeam =
          elementEntityType === WEBIFC.IFCBEAM ||
          elementEntityType === WEBIFC.IFCBEAMSTANDARDCASE
        //
        const isCovering= 
          elementEntityType === WEBIFC.IFCCOVERING 
        const isLoadBearing = dblElement.props.dblIsLoadBearing;
        const IsExternal = dblElement.props.dblIsExternal;
        const materialArray = dblElement.materials

        if(materialArray===undefined){console.log(dblElement)}
        if (isWall || isFloor || isRoof) {
          if(isLoadBearing){
            classifyMaterialBuildingLayer(materialArray,dblStructuralMaterialInventory)
          }else if(IsExternal){
            classifyMaterialBuildingLayer(materialArray,dblSkinMaterialInventory)
          }
          else {
            classifyMaterialBuildingLayer(materialArray,dblSpaceMaterialInventory)
          }
        } else if(isWindow){
          if(IsExternal){
            classifyMaterialBuildingLayer(materialArray,dblSkinMaterialInventory)
          }else{
            classifyMaterialBuildingLayer(materialArray,dblServiceMaterialInventory)
          }
        } else if(isBeam||isColumn){
          if(isLoadBearing){
            classifyMaterialBuildingLayer(materialArray,dblStructuralMaterialInventory)
          } else{
            classifyMaterialBuildingLayer(materialArray,dblServiceMaterialInventory)
          }
        } else if(isCovering){
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
  console.log("SkinMaterialInventory",dblSkinMaterialInventory)
  console.log("StructuralMaterialInventory",dblStructuralMaterialInventory)
  console.log("ServiceMaterialInventory",dblServiceMaterialInventory)
  console.log("SpaceMaterialInventory",dblSpaceMaterialInventory)
  console.log("StuffMaterialInventory",dblStuffMaterialInventory)
}
export async function classifyEnvelope(...obj) {
  obj.forEach((obj) => {
    for (const level in obj) {
      const dblLevel = obj[level];
      const dblEnvelopeWallLevelArray: any = [];
      const dblEnvelopeWindowLevelArray: any = [];
      const dblEnvelopeFloorLevelArray: any = [];
      const dblEnvelopeRoofLevelArray: any = [];
      //
      for (const e in dblLevel) {
        const dblElement = dblLevel[e];
        const dblEntity:dblEntity = dblElement.entity
        const componentEntityType = dblElement.entity.entityType;
        const componentExpressId = dblElement.entity.expressId;
        const componentFragmentMap= dblEntity.fragmentMap
        //
        let dblComposedEntity:dblComposedEntity ={
          dblEnvelopeExpressIdArray:[],
          dblEnvelopeFragmentMap:{}
        }
        

        //console.log(componentExpressId,"Here some Maps",componentFragmentMap)
        const isWall =
          componentEntityType === WEBIFC.IFCWALL ||
          componentEntityType === WEBIFC.IFCWALLSTANDARDCASE ||
          componentEntityType === WEBIFC.IFCCURTAINWALL ||
          componentEntityType === WEBIFC.IFCWALLELEMENTEDCASE;
        const isWindow = componentEntityType === WEBIFC.IFCWINDOW;
        const isFloor =
          componentEntityType === WEBIFC.IFCSLAB ||
          componentEntityType === WEBIFC.IFCSLABSTANDARDCASE;
        const isRoof = componentEntityType === WEBIFC.IFCROOF;
        //
        if (isWall) {
          const envelopeCode = dblElement.props.dblWallEnvelopeCode;
          const componentType = dblElement.props.dblWallType;
          const componentEnvelopeCode = dblElement.props.dblWallEnvelopeCode;
          const componentRvalue = dblElement.props.dblWallRvalue;
          const componentWidth = dblElement.qtos.dblWallWidth;
          const componentNetArea = dblElement.qtos.dblWallNetArea;
          const componentOrientation = dblElement.props.dblWallEnvelopeOrientation;
           
          //
          const dblEnvelopeComponent: dblVerticalEnvelopeComponent = {
            dblComponentExpressId: componentExpressId,
            dblComponentEntityType: componentEntityType,
            dblComponentEnvelopeCode: componentEnvelopeCode,
            dblComponentType: componentType,
            dblComponentRvalue: componentRvalue,
            dblComponentOrientation: componentOrientation,
            dblComponentWidth: componentWidth,
            dblComponentNetArea: componentNetArea,
            dblEntity:dblEntity
          };
          const dblEnvelopeWall: dblVerticalLayeredEnvelope = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeType: undefined,
            dblEnvelopeUvalue: undefined,
            dblEnvelopeWidth: undefined,
            dblEnvelopeArea: undefined,
            dblEnvelopeOrientation: componentOrientation,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          //console.log(dblElement)
          const envelopeIndex = checkEnvelopeValue(
            envelopeCode,
            dblEnvelopeWallLevelArray
          );
          const targetElement = dblEnvelopeWallLevelArray[envelopeIndex];
          if (envelopeIndex !== -1 && targetElement !== undefined) {
            //console.log("si está", envelopeIndex,dblEnvelopeWallLevelArray[envelopeIndex])
            targetElement.dblEnvelopeComponents.push(dblEnvelopeComponent);
            for (let fragmentId in componentFragmentMap){
              if(componentFragmentMap.hasOwnProperty(fragmentId)){
                targetElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(componentFragmentMap[fragmentId])
              }
            }  
          } else {
            dblEnvelopeWallLevelArray.push(dblEnvelopeWall);
            dblEnvelopeWall.dblEnvelopeComponents.push(dblEnvelopeComponent);
            for (let fragmentId in componentFragmentMap){
              if(componentFragmentMap.hasOwnProperty(fragmentId)){
                dblEnvelopeWall.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]= new Set (componentFragmentMap[fragmentId])
              }
            }
          }
        } else if (isFloor || isRoof) {
          const envelopeCode = dblElement.props.dblHorElementEnvelopeCode;
          const componentType = dblElement.props.dblHorElementType;
          const componentEnvelopeCode =
            dblElement.props.dblHorElementEnvelopeCode;
          const componentRvalue = dblElement.props.dbHorElementrRvalue;
          const componentWidth = dblElement.qtos.dblHorElementWidth;
          const componentNetArea = dblElement.qtos.dblHorElementNetArea;

          const dblEnvelopeHorizontalComponent: dblHorizontalEnvelopeComponent =
            {
              dblComponentExpressId: componentExpressId,
              dblComponentEntityType: componentEntityType,
              dblComponentEnvelopeCode: componentEnvelopeCode,
              dblComponentType: componentType,
              dblComponentRvalue: componentRvalue,
              dblComponentWidth: componentWidth,
              dblComponentNetArea: componentNetArea,
              dblEntity:dblEntity
            };
          const dblEnvelopeHorizontal: dblHorizontalLayeredEnvelope = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeType: undefined,
            dblEnvelopeUvalue: undefined,
            dblEnvelopeWidth: undefined,
            dblEnvelopeArea: undefined,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          if (isFloor) {
            const envelopeIndex = checkEnvelopeValue(
              envelopeCode,
              dblEnvelopeFloorLevelArray
            );
            const targetElement = dblEnvelopeFloorLevelArray[envelopeIndex];
            if (envelopeIndex !== -1 && targetElement !== undefined) {
              targetElement.dblEnvelopeComponents.push(dblEnvelopeHorizontalComponent);
              for (let fragmentId in componentFragmentMap){
                if(componentFragmentMap.hasOwnProperty(fragmentId)){
                  targetElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(componentFragmentMap[fragmentId])
                }}
            } else {
              dblEnvelopeFloorLevelArray.push(dblEnvelopeHorizontal);
              dblEnvelopeHorizontal.dblEnvelopeComponents.push(dblEnvelopeHorizontalComponent);
              for (let fragmentId in componentFragmentMap){
                if(componentFragmentMap.hasOwnProperty(fragmentId)){
                  dblEnvelopeHorizontal.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]= new Set (componentFragmentMap[fragmentId])
                }
              }
              
            }
          } else if (isRoof) {
            const envelopeIndex = checkEnvelopeValue(
              envelopeCode,
              dblEnvelopeRoofLevelArray
            );
            const targetElement = dblEnvelopeRoofLevelArray[envelopeIndex];
            if (envelopeIndex !== -1 && targetElement !== undefined) {
              targetElement.dblEnvelopeComponents.push(dblEnvelopeHorizontalComponent);
              for (let fragmentId in componentFragmentMap){
                if(componentFragmentMap.hasOwnProperty(fragmentId)){
                  targetElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(componentFragmentMap[fragmentId])
                }}
            } else {
              dblEnvelopeRoofLevelArray.push(dblEnvelopeHorizontal);
              dblEnvelopeHorizontal.dblEnvelopeComponents.push(dblEnvelopeHorizontalComponent);
              for (let fragmentId in componentFragmentMap){
                if(componentFragmentMap.hasOwnProperty(fragmentId)){
                  dblEnvelopeHorizontal.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]= new Set (componentFragmentMap[fragmentId])
                }
              }
            }
          }
        } else if (isWindow) {
          const envelopeCode = dblElement.props.dblWindowEnvelopeCode;
          const envelopeOrientation = dblElement.props.dblWindowEnvelopeOrientation;
          const envelopeWindowType = dblElement.props.dblWindowType;
          const envelopeWindowWidth = dblElement.qtos.dblWindowWidth;
          const envelopeWindowHeight = dblElement.qtos.dblWindowHeight;
          const envelopeWindowUvalue = dblElement.qtos.dblWindowUvalue;
          const envelopeWindowgValue = dblElement.qtos.dblWindowGvalue;
          const envelopeWindowCount = undefined;

          const dblWindowEnvelopeComponent: dblWindowEnvelopeComponent = {
            dblEnvelopeExpressId: componentExpressId,
          };
          const dblEnvelopeWindow: dblWindowEnvelope = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeOrientation: undefined,
            dblEnvelopeWindowType: undefined,
            dblEnvelopeWindowWidth: undefined,
            dblEnvelopeWindowHeight: undefined,
            dblEnvelopeWindowUvalue: undefined,
            dblEnvelopeWindowgValue: undefined,
            dblEnvelopeWindowCount: undefined,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          //console.log(dblEnvelopeWindow)
          const envelopeIndex = checkEnvelopeValue(
            envelopeCode,
            dblEnvelopeWindowLevelArray
          );
          const targetElement = dblEnvelopeWindowLevelArray[envelopeIndex];
          if (envelopeIndex !== -1 && targetElement != undefined) {
            //TAMOS AQUI
            targetElement.dblEnvelopeComponents.push(dblWindowEnvelopeComponent);
            for (let fragmentId in componentFragmentMap){
              if(componentFragmentMap.hasOwnProperty(fragmentId)){
                targetElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(componentFragmentMap[fragmentId])
              }}
            
          } else {
            dblEnvelopeWindowLevelArray.push(dblEnvelopeWindow);
            dblEnvelopeWindow.dblEnvelopeComponents.push(dblWindowEnvelopeComponent);
            for (let fragmentId in componentFragmentMap){
              if(componentFragmentMap.hasOwnProperty(fragmentId)){
                dblEnvelopeWindow.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]= new Set (componentFragmentMap[fragmentId])
              }
            }
          }
        }
      }
      if (dblEnvelopeWallLevelArray.length !== 0) {
        dblEnvelopeWalls[level] = dblEnvelopeWallLevelArray;
        for (const envelopeWall of dblEnvelopeWallLevelArray) {
          const componentArray = envelopeWall.dblEnvelopeComponents;
          const concatenatedTypes = componentArray.map((component) => component.dblComponentType).join("+");
          const envelopeWidth: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentWidth,0);
          const envelopeRvalue: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentRvalue,0);
          const envelopeNetArea: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentNetArea,0);

          envelopeWall.dblEnvelopeType = concatenatedTypes;
          envelopeWall.dblEnvelopeWidth = parseFloat(envelopeWidth.toFixed(2));
          envelopeWall.dblEnvelopeUvalue = parseFloat(
            (1 / envelopeRvalue).toFixed(2)
          );
          envelopeWall.dblEnvelopeArea = envelopeNetArea / componentArray.length;
        }
      }
      if (dblEnvelopeFloorLevelArray.length !== 0) {
        dblEnvelopeFloors[level] = dblEnvelopeFloorLevelArray;
        for (const envelopeFloor of dblEnvelopeFloorLevelArray) {
          const componentArray = envelopeFloor.dblEnvelopeComponents;
          const concatenatedTypes = componentArray
            .map((component) => component.dblComponentType)
            .join("+");
          const envelopeWidth: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentWidth,0);
          const envelopeRvalue: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentRvalue,0);
          const envelopeNetArea: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentNetArea,0);

          envelopeFloor.dblEnvelopeType = concatenatedTypes;
          envelopeFloor.dblEnvelopeWidth = parseFloat(envelopeWidth.toFixed(2));
          envelopeFloor.dblEnvelopeUvalue = parseFloat((1 / envelopeRvalue).toFixed(2));
          envelopeFloor.dblEnvelopeArea =envelopeNetArea / componentArray.length;
        }
      }
      if (dblEnvelopeRoofLevelArray.length !== 0) {
        dblEnvelopeRoofs[level] = dblEnvelopeRoofLevelArray;
        for (const envelopeRoof of dblEnvelopeRoofLevelArray) {
          const componentArray = envelopeRoof.dblEnvelopeComponents;
          const concatenatedTypes = componentArray
            .map((component) => component.dblComponentType)
            .join("+");
          const envelopeWidth: number = componentArray.reduce(
            (sum: number, component) => sum + component.dblComponentWidth,
            0
          );
          const envelopeRvalue: number = componentArray.reduce(
            (sum: number, component) => sum + component.dblComponentRvalue,
            0
          );
          const envelopeNetArea: number = componentArray.reduce(
            (sum: number, component) => sum + component.dblComponentNetArea,
            0
          );

          envelopeRoof.dblEnvelopeType = concatenatedTypes;
          envelopeRoof.dblEnvelopeWidth = parseFloat(envelopeWidth.toFixed(2));
          envelopeRoof.dblEnvelopeUvalue = parseFloat(
            (1 / envelopeRvalue).toFixed(2)
          );
          envelopeRoof.dblEnvelopeArea =
            envelopeNetArea / componentArray.length;
        }
      }
      if (dblEnvelopeWindowLevelArray.length !== 0) {
        dblEnvelopeWindows[level] = dblEnvelopeWindowLevelArray;
        //for (const envelopeWindow of dblEnvelopeWindowLevelArray){
        //
        //}
      }
    }
  });
  console.log(dblEnvelopeWalls);
  console.log(dblEnvelopeFloors);
  console.log(dblEnvelopeRoofs);
  console.log(dblEnvelopeWindows);
}
