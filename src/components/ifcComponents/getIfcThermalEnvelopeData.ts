import * as DBL from "./dblInterface"

function checkEnvelopeValue(envelopeValue: string, array: any[]) {
  return array.findIndex(
    (dblElement) => dblElement.dblEnvelopeCode === envelopeValue
  );
}
//
export let dblEnvelopeWalls: {}
export let dblEnvelopeFloors: {} 
export let dblEnvelopeWindows: {} 
export let dblEnvelopeRoofs: {} 

// Classify the and group the elements of the thermal envelope based on the envelopeCode
export async function classifyEnvelope(...obj) {
  dblEnvelopeWalls = {};
  dblEnvelopeFloors = {};
  dblEnvelopeWindows = {};
  dblEnvelopeRoofs = {};
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
        const dblEntity:DBL.dblEntity = dblElement.entity
        const idType = dblElement.entity.entityType;
        const componentExpressId = dblElement.entity.expressId;
        const componentFragmentMap= dblEntity.fragmentMap
        //
        let dblComposedEntity:DBL.dblComposedEntity ={
          dblIfcType:undefined,
          dblEnvelopeExpressIdArray:[],
          dblEnvelopeFragmentMap:{}
        }
        //Thermal Envelope walls
        if (DBL.isDblWall(idType)) {
          const envelopeCode = dblElement.props.dblWallEnvelopeCode;
          const componentType = dblElement.props.dblWallType;
          const componentEnvelopeCode = dblElement.props.dblWallEnvelopeCode;
          const componentRvalue = dblElement.props.dblWallRvalue;
          const componentWidth = dblElement.qtos.dblWallWidth;
          const componentNetArea = dblElement.qtos.dblWallNetArea;
          const componentGrossArea = dblElement.qtos.dblWallGrossArea
          const componentOrientation = dblElement.props.dblWallEnvelopeOrientation;
          const componentYearProduction = dblElement.props.dblYearProduction 
          
          const dblEnvelopeComponent: DBL.dblEnvelopeVerticalComponent = {
            dblComponentExpressId: componentExpressId,
            dblComponentEntityType: idType,
            dblComponentEnvelopeCode: componentEnvelopeCode,
            dblComponentType: componentType,
            dblComponentRvalue: componentRvalue,
            dblComponentOrientation: componentOrientation,
            dblComponentWidth: componentWidth,
            dblComponentNetArea: componentNetArea,
            dblComponentGrossArea:componentGrossArea,
            dblComponentYearProduction:componentYearProduction,
            dblEntity:dblEntity
          };
          const dblEnvelopeWall: DBL.dblEnvelopeVerticalLayered = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeType: undefined,
            dblEnvelopeUvalue: undefined,
            dblEnvelopeWidth: undefined,
            dblEnvelopeNetArea: undefined,
            dblEnvelopeGrossArea: undefined,
            dblEnvelopeOrientation: componentOrientation,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          dblEnvelopeWall.dblComposedEntity.dblIfcType = dblElement.entity.entityType

          const envelopeIndex = checkEnvelopeValue(envelopeCode,dblEnvelopeWallLevelArray);
          const targetElement = dblEnvelopeWallLevelArray[envelopeIndex];
          if (envelopeIndex !== -1 && targetElement !== undefined) {

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
                dblEnvelopeWall.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set (componentFragmentMap[fragmentId])
              }
            }
          }
        } 
        //Thermal Envelope horizontal elements
        else if (DBL.isDblFloor(idType) || DBL.isDblRoof(idType)) {
          const envelopeCode = dblElement.props.dblHorElementEnvelopeCode;
          const componentType = dblElement.props.dblHorElementType;
          const componentEnvelopeCode = dblElement.props.dblHorElementEnvelopeCode;
          const componentRvalue = dblElement.props.dbHorElementrRvalue;
          const componentYearProduction = dblElement.props.dblYearProduction
          const componentWidth = dblElement.qtos.dblHorElementWidth;
          const componentNetArea = dblElement.qtos.dblHorElementNetArea;

          const dblEnvelopeHorizontalComponent: DBL.dblEnvelopeHorizontalComponent = {
              dblComponentExpressId: componentExpressId,
              dblComponentEntityType: idType,
              dblComponentEnvelopeCode: componentEnvelopeCode,
              dblComponentType: componentType,
              dblComponentRvalue: componentRvalue,
              dblComponenYearProduction:componentYearProduction,
              dblComponentWidth: componentWidth,
              dblComponentNetArea: componentNetArea,
              dblEntity:dblEntity
            };
          const dblEnvelopeHorizontal: DBL.dblEnvelopeHorizontalLayered = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeType: undefined,
            dblEnvelopeUvalue: undefined,
            dblEnvelopeWidth: undefined,
            dblEnvelopeNetArea: undefined,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          if(dblElement.entity.entityType!== undefined){
            dblEnvelopeHorizontal.dblComposedEntity.dblIfcType = dblElement.entity.entityType
          }
          // Horizontal elements floors
          if (DBL.isDblFloor(idType)) {
            const envelopeIndex = checkEnvelopeValue(envelopeCode,dblEnvelopeFloorLevelArray);
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
          } 
          // Horizontal elements roofs
          else if (DBL.isDblRoof(idType)) {
            const envelopeIndex = checkEnvelopeValue(envelopeCode, dblEnvelopeRoofLevelArray);
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
                  dblEnvelopeHorizontal.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set (componentFragmentMap[fragmentId])
                }
              }
            }
          }
        } 
        // Thermal Envelope windows
        else if (DBL.isDblWindow(idType)) {
          const envelopeWindowOrientation = dblElement.props.dblWindowEnvelopeOrientation
          const envelopeWindowType = dblElement.props.dblWindowType;
          const envelopeYearProduction = dblElement.props.dblYearProduction
          const envelopeCode = dblElement.props.dblWindowEnvelopeCode;
          const envelopeWindowUvalue = dblElement.props.dblWindowUvalue;
          const envelopeWindowGvalue = dblElement.props.dblWindowGvalue;
          const envelopeWindowWidth = dblElement.qtos.dblWindowWidth;
          const envelopeWindowHeight = dblElement.qtos.dblWindowHeight;
          const dblWindowEnvelopeComponent: DBL.dblEnvelopeWindowComponent = {
            dblEnvelopeExpressId: componentExpressId,
          };
          const dblEnvelopeWindow: DBL.dblEnvelopeWindow = {
            dblEnvelopeCode: envelopeCode,
            dblEnvelopeOrientation: envelopeWindowOrientation,
            dblEnvelopeNetArea: (envelopeWindowWidth * envelopeWindowHeight),
            dblEnvelopeWindowType: envelopeWindowType,
            dblEnvelopeWindowYearProduction: envelopeYearProduction,
            dblEnvelopeWindowWidth: envelopeWindowWidth,
            dblEnvelopeWindowHeight: envelopeWindowHeight,
            dblEnvelopeWindowUvalue: envelopeWindowUvalue,
            dblEnvelopeWindowgValue: envelopeWindowGvalue,
            dblEnvelopeComponents: [],
            dblComposedEntity:dblComposedEntity
          };
          
          if(dblElement.hasOwnProperty("entity")&& dblElement.entity.hasOwnProperty("entityType")){
            dblEnvelopeWindow.dblComposedEntity.dblIfcType = dblElement.entity.entityType
          }

          const envelopeIndex = checkEnvelopeValue(envelopeCode,dblEnvelopeWindowLevelArray);
          const targetElement = dblEnvelopeWindowLevelArray[envelopeIndex];
          if (envelopeIndex !== -1 && targetElement != undefined) {
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
          const envelopeGrossArea: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentGrossArea,0);

          envelopeWall.dblEnvelopeType = concatenatedTypes;
          envelopeWall.dblEnvelopeWidth = envelopeWidth;
          envelopeWall.dblEnvelopeUvalue = parseFloat((1 / envelopeRvalue).toFixed(2));
          envelopeWall.dblEnvelopeNetArea = envelopeNetArea / componentArray.length;
          envelopeWall.dblEnvelopeGrossArea = envelopeGrossArea/ componentArray.length; //OJO CUIDADAO
        }
      }
      if (dblEnvelopeFloorLevelArray.length !== 0) {
        dblEnvelopeFloors[level] = dblEnvelopeFloorLevelArray;
        for (const envelopeFloor of dblEnvelopeFloorLevelArray) {
          const componentArray = envelopeFloor.dblEnvelopeComponents;
          const concatenatedTypes = componentArray
            .map((component) => component.dblComponentType).join("+");
          const envelopeWidth: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentWidth,0);
          const envelopeRvalue: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentRvalue,0);
          const envelopeNetArea: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentNetArea,0);

          envelopeFloor.dblEnvelopeType = concatenatedTypes;
          envelopeFloor.dblEnvelopeWidth = parseFloat(envelopeWidth.toFixed(2));
          envelopeFloor.dblEnvelopeUvalue = parseFloat((1 / envelopeRvalue).toFixed(2));
          envelopeFloor.dblEnvelopeNetArea =envelopeNetArea / componentArray.length;
        }
      }
      if (dblEnvelopeRoofLevelArray.length !== 0) {
        dblEnvelopeRoofs[level] = dblEnvelopeRoofLevelArray;
        for (const envelopeRoof of dblEnvelopeRoofLevelArray) {
          const componentArray = envelopeRoof.dblEnvelopeComponents;
          const concatenatedTypes = componentArray.map((component) => component.dblComponentType).join("+");
          const envelopeWidth: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentWidth,0);
          const envelopeRvalue: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentRvalue,0);
          const envelopeNetArea: number = componentArray.reduce((sum: number, component) => sum + component.dblComponentNetArea,0);

          envelopeRoof.dblEnvelopeType = concatenatedTypes;
          envelopeRoof.dblEnvelopeWidth = parseFloat(envelopeWidth.toFixed(2));
          envelopeRoof.dblEnvelopeUvalue = parseFloat((1 / envelopeRvalue).toFixed(2));
          envelopeRoof.dblEnvelopeNetArea = envelopeNetArea / componentArray.length;
        }
      }
      if (dblEnvelopeWindowLevelArray.length !== 0) {
        dblEnvelopeWindows[level] = dblEnvelopeWindowLevelArray;
      }
    }
  });
}
//

export let dblEnvelopeSummaryVertical: { [key: string]: DBL.dblEnvelopeSummaryOrientationVertical }
export let dblEnvelopeSummaryFloors:DBL.dblFloorEnvelopeSummary 
export let dblEnvelopeSummaryRoofs:DBL.dblRoofEnvelopeSummary

// Summarize th thermal envelope depending on the orientation, gross area and window area and window to wall ratio
export async function summarizeEnvelope (...env){
  dblEnvelopeSummaryVertical ={};
  dblEnvelopeSummaryRoofs = {
    dblRoofEnvelopeSummaryAreaSum:0
  };
  dblEnvelopeSummaryFloors = {
    dblFloorEnvelopeSummaryAreaSum:0
  };
  //
  env.forEach((env)=>{
    for (let l in env){
      const level= env[l]
      for (const element of level){
        const ifcEntityType = element.dblComposedEntity.dblIfcType
        const envelopeVerticalSummaryOrientation = element.dblEnvelopeOrientation
        const envelopeSummaryNetArea = element.dblEnvelopeNetArea
        //
        const envelopeFragmentMap =  element.dblComposedEntity.dblEnvelopeFragmentMap
        const targetSummaryElement = dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation]
        //
        if(DBL.isDblWall(ifcEntityType) && element.hasOwnProperty("dblEnvelopeGrossArea") && element.hasOwnProperty("dblEnvelopeOrientation")&& element.hasOwnProperty("dblComposedEntity")){
          const envelopeSummaryGrossArea = element.dblEnvelopeGrossArea
          
          const dblComposedEntity:DBL.dblComposedEntity = {
            dblIfcType:ifcEntityType,
            dblEnvelopeExpressIdArray: [],
            dblEnvelopeFragmentMap:{}
          }
          if(!dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation]){
            
            const dblEnvelopeSummaryElement: DBL.dblEnvelopeSummaryOrientationVertical = {
              dblVerticalEnvelopeSummaryOrientation: envelopeVerticalSummaryOrientation,
              dblWallEnvelopeSummaryNetAreaSum: 0,
              dblWallEnvelopeSummaryGrossAreaSum: parseFloat(envelopeSummaryGrossArea.toFixed(2)),
              dblWindowToWallRatio: 0,
              dblWindowEnvelopeSummaryNetAreaSum:0,
              dblEnvelopePercentageOverTotal:0,
              dblComposedEntity: dblComposedEntity
            }
            for (let fragmentId in envelopeFragmentMap){
              if(!dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]){
                dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(envelopeFragmentMap[fragmentId]) 
              } 
            }
            dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation]= dblEnvelopeSummaryElement 
          }
          else if(targetSummaryElement.dblWallEnvelopeSummaryNetAreaSum !== undefined && targetSummaryElement.dblComposedEntity!== undefined && targetSummaryElement.dblWallEnvelopeSummaryGrossAreaSum!== undefined  ){
            
            targetSummaryElement.dblWallEnvelopeSummaryNetAreaSum += parseFloat(envelopeSummaryGrossArea.toFixed(2))
            targetSummaryElement.dblWallEnvelopeSummaryGrossAreaSum += parseFloat(envelopeSummaryGrossArea.toFixed(2))
            for (let fragmentId in envelopeFragmentMap){
              if(!targetSummaryElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId]){
                targetSummaryElement.dblComposedEntity.dblEnvelopeFragmentMap[fragmentId] = new Set(envelopeFragmentMap[fragmentId])
              } else{
                envelopeFragmentMap[fragmentId].forEach(value => targetSummaryElement.dblComposedEntity?.dblEnvelopeFragmentMap[fragmentId].add(value))
              }
            }
          }
        }
        else if(DBL.isDblWindow(ifcEntityType)){
          if(!dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation]){
            const dblEnvelopeVerticalSummaryElement: DBL.dblEnvelopeSummaryOrientationVertical = {
              dblVerticalEnvelopeSummaryOrientation: envelopeVerticalSummaryOrientation,
              dblWallEnvelopeSummaryNetAreaSum: 0,
              dblWallEnvelopeSummaryGrossAreaSum: 0,
              dblWindowToWallRatio: 0,
              dblWindowEnvelopeSummaryNetAreaSum:envelopeSummaryNetArea,
              dblEnvelopePercentageOverTotal:0,
              dblComposedEntity:undefined
            }
            dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation] = dblEnvelopeVerticalSummaryElement

          } else if( dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation].dblWindowEnvelopeSummaryNetAreaSum !== undefined){
            dblEnvelopeSummaryVertical[envelopeVerticalSummaryOrientation].dblWindowEnvelopeSummaryNetAreaSum += envelopeSummaryNetArea
          }
        }
        else if (DBL.isDblFloor(ifcEntityType) && envelopeSummaryNetArea!== undefined){
          dblEnvelopeSummaryFloors.dblFloorEnvelopeSummaryAreaSum += envelopeSummaryNetArea
        }
        else if (DBL.isDblRoof(ifcEntityType) && envelopeSummaryNetArea!== undefined){
          dblEnvelopeSummaryRoofs.dblRoofEnvelopeSummaryAreaSum += envelopeSummaryNetArea
        }
      }
    }
  })
  for (let key in dblEnvelopeSummaryVertical){
    const element = dblEnvelopeSummaryVertical[key]
    if(element.dblWallEnvelopeSummaryGrossAreaSum!== undefined  && element.dblWindowEnvelopeSummaryNetAreaSum){
      const dblWindowToWallRatio = ((element.dblWindowEnvelopeSummaryNetAreaSum)/(element.dblWallEnvelopeSummaryGrossAreaSum))
      element.dblWallEnvelopeSummaryGrossAreaSum = parseFloat(element.dblWallEnvelopeSummaryGrossAreaSum.toFixed(2))//
      element.dblWindowToWallRatio = parseFloat(dblWindowToWallRatio.toFixed(2))
      element.dblWallEnvelopeSummaryNetAreaSum = element.dblWallEnvelopeSummaryGrossAreaSum - element.dblWindowEnvelopeSummaryNetAreaSum
      //
      element.dblWindowEnvelopeSummaryNetAreaSum = parseFloat(element.dblWindowEnvelopeSummaryNetAreaSum.toFixed(2))
    }
  }
}