import * as OBC from "openbim-components";
import * as WEBIFC from "web-ifc";

const ifcDblWall = [WEBIFC.IFCWALL,WEBIFC.IFCWALLSTANDARDCASE,WEBIFC.IFCWALLELEMENTEDCASE]
export function isDblWall(ifcEntityType:number):boolean{
  return ifcDblWall.includes(ifcEntityType)
}

const ifcDblWindow = [WEBIFC.IFCWINDOW]
export function isDblWindow (ifcEntityType:number):boolean {
  return ifcDblWindow.includes(ifcEntityType)
}

const ifcDblFloor = [WEBIFC.IFCSLAB,WEBIFC.IFCSLABSTANDARDCASE,WEBIFC.IFCSLABELEMENTEDCASE]
export function isDblFloor (ifcEntityType:number):boolean{
  return ifcDblFloor.includes(ifcEntityType)
}

const ifcDblCovering = [WEBIFC.IFCCOVERING]
export function isDblCovering (ifcEntityType:number):boolean{
  return ifcDblCovering.includes(ifcEntityType)
}

const ifcDblRoof = [WEBIFC.IFCROOF]
export function isDblRoof (ifcEntityType:number):boolean{
  return ifcDblRoof.includes(ifcEntityType)
}

const ifcDblStair = [WEBIFC.IFCSTAIR , WEBIFC.IFCSTAIRFLIGHT]
export function isDblStair (ifcEntityType:number):boolean{
  return ifcDblStair.includes(ifcEntityType)
}

const ifcDblRamp = [WEBIFC.IFCRAMP, WEBIFC.IFCRAMPFLIGHT]
export function isDblRamp (ifcEntityType:number):boolean{
  return ifcDblRamp.includes(ifcEntityType)
}

const ifcDblColumn = [WEBIFC.IFCCOLUMN, WEBIFC.IFCCOLUMNSTANDARDCASE]
export function isDblColumn (ifcEntityType:number):boolean{
  return ifcDblColumn.includes(ifcEntityType)
}

const ifcDblRailing = [WEBIFC.IFCRAILING]
export function isDblRailing (ifcEntityType:number):boolean{
  return ifcDblRailing.includes(ifcEntityType)
}

const ifcDblCurtainWall = [WEBIFC.IFCCURTAINWALL]
export function isDblCurtainWall (ifcEntityType:number):boolean{
  return ifcDblCurtainWall.includes(ifcEntityType)
}

const ifcDblMember = [WEBIFC.IFCMEMBER, WEBIFC.IFCMEMBERSTANDARDCASE]
export function isDblMember (ifcEntityType:number):boolean {
  return ifcDblMember.includes(ifcEntityType)
}

const ifcDblPlate = [WEBIFC.IFCPLATE , WEBIFC.IFCPLATESTANDARDCASE]
export function isDblPlate (ifcEntityType:number):boolean {
  return ifcDblPlate.includes(ifcEntityType)
}

const ifcDblStrLinealElement = [WEBIFC.IFCBEAM,WEBIFC.IFCBEAMSTANDARDCASE,WEBIFC.IFCCOLUMN,WEBIFC.IFCCOLUMNSTANDARDCASE]
export function isDblStructuralLinealElement (ifcEntityType:number):boolean{
  return ifcDblStrLinealElement.includes(ifcEntityType)
}

const ifcDblFooting =[WEBIFC.IFCFOOTING]
export function isDblFooting (ifcEntityType:number):boolean{
  return ifcDblFooting.includes(ifcEntityType)
}

const ifcDblProxy = [WEBIFC.IFCBUILDINGELEMENTPROXY,WEBIFC.IFCPROXY]
export function isDblProxy (ifcEntityType:number):boolean{
  return ifcDblProxy.includes(ifcEntityType)
}

const ifcDblCommonElement = [...ifcDblWall,...ifcDblWindow,...ifcDblFloor,...ifcDblRoof,...ifcDblStair,...ifcDblRamp,
  ...ifcDblStrLinealElement,...ifcDblCurtainWall,...ifcDblPlate,...ifcDblFooting,...ifcDblProxy]
export function isDblCommonElement (ifcEntityType:number):boolean{
  return ifcDblCommonElement.includes(ifcEntityType)
}
export interface dblEntity{
    expressId:number;
    fragmentId:[any];
    entityType:number;
    globalId:string
    fragmentMap:OBC.FragmentIdMap
  }
export interface ModelEntity {
  key: number; 
  entityType: number;
  Attributes: {
    GlobalId: string;
    Name: string;
    Tag: string;
  };
  [key: string]: any;
}
export interface ModelEntityIdFragment {
  expressId: number|undefined,
  fragmentIds: [any],
  fragmentMap:{}
}
export interface dblElementMaterial{
  dblMaterialName: string|undefined;
  dblMaterialFraction: number|undefined;
  dblMaterialCategoryMadaster :string|undefined;
  dblMaterialUniclassCode: string|undefined;
  dblMaterialUniclassName: string|undefined;
  dblProductUniclassCode:string|undefined;
  dblProductUniclassName: string|undefined;
  dblCombinedUniclassName: string|undefined;
  dblMaterialWasteCategory:string|undefined;
  dblMaterialThermalConductivity: number|undefined;
  dblMaterialDensity: number|undefined;
  dblMaterialNetVolume:number|undefined;//= NetArea * LayerThickness
  dblMaterialWeight: number|undefined;// = (dblLayerMaterialDensity)/(dblLayerNetVolume)
}

//Wall interface
export interface dblStrLinealProps{
  dblIsLoadBearing:boolean|undefined,
  dblIsExternal:boolean|undefined
}
export interface dblStrLinealQtos{
  dblStrLength:number|undefined;
  dblStrCrossSectionArea: number|undefined;
  dblStrNetSurfaceArea: number|undefined;
  dblStrNetVolume:number|undefined;
}
export interface dblCoveringProps {
  dblIsExternal:boolean|undefined
}
export interface dblCoveringQtos {
  dblCoveringWidth:number|undefined;
  dblCoveringGrossArea :number|undefined;
  dblCoveringNetArea: number|undefined;
}
 
export interface dblWallProps{
  dblWallType:string|undefined;
  dblIsLoadBearing:boolean|undefined;
  dblIsExternal:boolean|undefined;
  dblIsThermalEnvelope:boolean|undefined;
  dblYearProduction: number|undefined;
  dblWallEnvelopeCode:any|undefined;
  dblWallEnvelopeOrientation: string|undefined;
  dblWallUvalue:number|undefined;
  dblWallRvalue:number|undefined;
  }
export interface dblWallQtos{
  dblWallLenght:number |undefined;
  dblWallWidth:number|undefined;
  dblWallHeight:number|undefined;
  dblWallNetArea:number|undefined;
  dblWallGrossArea: number| undefined;
  dblWallNetVolume:number|undefined;
  }
//Window interface
export interface dblWindowProps{
  dblWindowType:string|undefined;
  dblIsExternal:boolean|undefined;
  dblIsThermalEnvelope: boolean|undefined;
  dblYearProduction: number|undefined;
  dblWindowEnvelopeCode:any|undefined;
  dblWindowEnvelopeOrientation:string|undefined;
  dblWindowUvalue:number|undefined;
  dblWindowGvalue:number|undefined;
  dblWindowGlazingFraction:number|undefined;
  }
export interface dblWindowQtos{
  dblWindowWidth:number| undefined;
  dblWindowHeight:number| undefined;
  dblWindowPerimeter:number| undefined;
  dblWindowArea:number| undefined;
}
//Floor interfaces
export interface dblHorElementProps{
  dblHorElementType: string|undefined;
  dblIsLoadBearing: boolean|undefined;
  dblIsExternal: boolean|undefined;
  dblIsThermalEnvelope: boolean|undefined;
  dblYearProduction: number|undefined;
  dblHorElementEnvelopeCode: any|undefined;
  dblHorElementUvalue: number|undefined;
  dblHorElementRvalue
}
export interface dblHorElementQtos{
  dblHorElementPerimeter:number|undefined;
  dblHorElementWidth:number|undefined;
  dblHorElementNetArea:number|undefined;
  dblHorElementNetVolume:number|undefined;
}
export interface dblHorElementLayer{
  dblHorElementLayerMaterial:string;
  dblHorElementLayerWidth:number;
  dblHorElementLayerDensity:any
  dblHorElementLayerConductivity:any;
}
////////////
export interface dblFloorLayer{
  dblFloorLayerMaterial:string|undefined;
  dblFloorLayerWidth:number|undefined;
  dblFloorLayerDensity:any|undefined;
  dblFloorLayerConductivity:any|undefined;
}

export interface dblFloorProps{
  dblFloorType:string|undefined;
  dblFloorLoadBearing: boolean|undefined;
  dblFloorIsExternal:boolean|undefined;
  dblFloorEnvelopeCode:any|undefined;
  dblFloorUvalue:number|undefined;
  dblFloorRvalue:number|undefined;
}
export interface dblFloorQtos{
  dblFloorPerimeter:number|undefined;
  dblFloorWidth:number|undefined;
  dblFloorNetArea:number|undefined;
  dblFloorNetVolume:number|undefined;
}
//Roof interfaces
export interface dblRoofLayer{
  dblFloorLayerMaterial:string;
  dblFloorLayerWidth:number;
  dblFloorLayerDensity:any
  dblFloorLayerConductivity:any;
}
export interface dblRoofProps{
  dblRoofType:string|undefined;
  dblRoofLoadBearing: boolean|undefined;
  dblRoofIsExternal:boolean|undefined;
  dblRoofEnvelopeCode:any|undefined;
  dblRoofUvalue:number|undefined;
  dblRoofRvalue:number|undefined;
}
export interface dblRoofQtos{
  dblRoofPerimeter:number|undefined;
  dblRoofWidth:number|undefined;
  dblRoofNetArea:number|undefined;
  dblRoofNetVolume:number|undefined;
}
//
export interface dblComposedEntity{
  dblIfcType: number|undefined,
  dblEnvelopeExpressIdArray:any[],
  dblEnvelopeFragmentMap:{}
}
export interface dblEnvelopeVerticalComponent {
  dblComponentExpressId: string | undefined;
  dblComponentEntityType: number | undefined;
  dblComponentEnvelopeCode: string | undefined;
  dblComponentType: string | undefined;
  dblComponentRvalue: number | undefined;
  dblComponentOrientation: string | undefined;
  dblComponentWidth: number | undefined;
  dblComponentNetArea: number | undefined;
  dblComponentGrossArea: number| undefined;
  dblComponentYearProduction: number|undefined;
  dblEntity:dblEntity

}
export interface dblEnvelopeVerticalLayered{
  dblEnvelopeCode: string | undefined;
  dblEnvelopeType: string | undefined;
  dblEnvelopeUvalue: number | undefined;
  dblEnvelopeWidth: number | undefined;
  dblEnvelopeNetArea: number | undefined;
  dblEnvelopeGrossArea: number| undefined;
  dblEnvelopeOrientation: string | undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
export interface dblEnvelopeHorizontalComponent {
  dblComponentExpressId: string | undefined;
  dblComponentEntityType: number | undefined;
  dblComponentEnvelopeCode: string | undefined;
  dblComponentType: string | undefined;
  dblComponentRvalue: number | undefined;
  dblComponentWidth: number | undefined;
  dblComponentNetArea: number | undefined;
  dblComponenYearProduction: number|undefined;
  dblEntity:dblEntity
}
export interface dblEnvelopeHorizontalLayered {
  dblEnvelopeCode: string | undefined;
  dblEnvelopeType: string | undefined;
  dblEnvelopeUvalue: number | undefined;
  dblEnvelopeWidth: number | undefined;
  dblEnvelopeNetArea: number | undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
export interface dblEnvelopeWindowComponent {
  dblEnvelopeExpressId: string | undefined;
}
export interface dblEnvelopeWindow {
  dblEnvelopeCode: string | undefined;
  dblEnvelopeOrientation: string | undefined;
  dblEnvelopeNetArea: number|undefined
  dblEnvelopeWindowType: string | undefined;
  dblEnvelopeWindowWidth: number | undefined;
  dblEnvelopeWindowHeight: number | undefined;
  dblEnvelopeWindowUvalue: number | undefined;
  dblEnvelopeWindowgValue: number | undefined;
  dblEnvelopeWindowYearProduction: number|undefined;
  dblEnvelopeComponents: any[];
  dblComposedEntity:dblComposedEntity;
}
export interface dblMaterialCategory {
  dblMaterialCategoryMadaster: string|undefined,
  dblMaterialCategoryUniclassName: string|undefined
  dblMaterialCategoryUniclassCode:string|undefined
  dblProductCategoryUniclassCode: string|undefined,
  dblProductCategoryUniclassName: string|undefined,
  dblCombinedUniclassName:string|undefined,
  dblMaterialCategoryWasteCategory: string|undefined
  dblMaterialCategoryMassDensity: number|undefined
  dblMaterialNetVolumeSum: number|undefined
  dblMaterialWeightSum:number|undefined
  dblMaterialArray:{}[]
}
export interface dblMaterialCategoryMadaster {
  dblMaterialCategoryMadaster:string,
  dblMaterialNetVolumeSummary:number,
  dblMaterialWeightSummary: number,
}
  // EnvelopeSummary
export interface dblEnvelopeSummary{
  dblEnvelopeVolume: number;
  dblEnvelopeSurfaceSum: number;
  dblEnvelopeFormFactor: number;
}
export interface dblEnvelopeSummaryOrientationVertical{
  dblVerticalEnvelopeSummaryOrientation:string|undefined ;
  dblWallEnvelopeSummaryNetAreaSum: number|undefined;
  dblWallEnvelopeSummaryGrossAreaSum: number|undefined;
  dblWindowEnvelopeSummaryNetAreaSum: number|undefined; 
  dblWindowToWallRatio: number | undefined;
  dblEnvelopePercentageOverTotal: number | undefined;
  dblComposedEntity:dblComposedEntity|undefined;
}
export interface dblFloorEnvelopeSummary{
  dblFloorEnvelopeSummaryAreaSum: number; 
}
export interface dblRoofEnvelopeSummary{
  dblRoofEnvelopeSummaryAreaSum: number;
}

