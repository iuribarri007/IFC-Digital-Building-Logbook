import * as OBC from "openbim-components";
export interface dblEntity{
    expressId:number;
    fragmentId:[any];
    entityType:number;
    globalId:string
    fragmentMap:OBC.FragmentIdMap
    }
  export interface dblElementMaterial{
    dblMaterialName: string|undefined;
    dblMaterialFraction: number|undefined;
    dblMaterialUniclassCode: string|number|undefined;
    dblMaterialUniclassName: string|undefined;
    dblMaterialWasteCategory:string|undefined;
    dblMaterialLifeSpan:number|undefined;
    dblMaterialProductionYear: number|undefined;
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
    dblWallNetVolume:number|undefined;
    }
  //Window interface
 
  export interface dblWindowProps{
    dblWindowType:string|undefined;
    dblIsExternal:boolean|undefined;
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
  // Combine Interfaces create type
  export type dblWallEntity <X, Y> = dblEntity & X & Y
  export type dblWindowEntity <X,Y> = dblEntity & X & Y
  export type dblFloorEntity <X,Y> = dblEntity & X & Y
  export type dblRoofEntity <X,Y> = dblEntity & X & Y