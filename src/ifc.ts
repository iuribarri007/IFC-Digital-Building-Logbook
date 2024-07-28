import * as THREE from "three"
import * as OBC from "openbim-components"
import * as WEBIFC from "web-ifc"
import { FragmentMap, FragmentsGroup, IfcProperties } from "bim-fragment"
import { Fragment } from "bim-fragment"

import { modelFragmentIdByLevel } from "./components/ifcComponents/getIfcEntities.js"
import { getEntityFragmentsByLevel, getDblEntitiesByLevel} from "./components/ifcComponents/getIfcEntities.js"
import { dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements } from "./components/ifcComponents/getIfcEntities.js"
import { dblEnvelopeWallElements, dblEnvelopeWindowElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements } from "./components/ifcComponents/getIfcEntities.js"
// Imports from getIfcMaterialInventoryData
import { classifyMaterials } from "./components/ifcComponents/getIfcMaterialInventoryData.js"
// Imports from getIfcThermalEnvelopeData
import { classifyEnvelope, summarizeEnvelope } from "./components/ifcComponents/getIfcThermalEnvelopeData.js"
import { dblEnvelopeWalls,dblEnvelopeFloors,dblEnvelopeRoofs,dblEnvelopeWindows } from "./components/ifcComponents/getIfcThermalEnvelopeData.js"
import { dblEpcData } from "./components/epcComponents/getEpcData.js"
import { UndefinedDblEpc } from "./components/epcComponents/interfaceEpc.js"

const viewerContainer = document.getElementById("viewer-container") as HTMLDivElement

const viewer = new OBC.Components()
const sceneComponent = new OBC.SimpleScene(viewer)
viewer.scene = sceneComponent

const rendererComponent = new OBC.PostproductionRenderer(viewer, viewerContainer)
viewer.renderer = rendererComponent

//Creating the camera
const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
viewer.camera = cameraComponent
cameraComponent.setProjection("Orthographic");
cameraComponent.updateAspect()
const raycasterComponent = new OBC.SimpleRaycaster(viewer)

viewer.init()

const {postproduction} = rendererComponent;
postproduction.enabled = true;


const scene = sceneComponent.get()
sceneComponent.setup()

scene.background = null
//Creating the Renderer

rendererComponent.postproduction.enabled = true

//Creating the camera
viewer.raycaster = raycasterComponent
//Creating the highlighter
const highlighter = new OBC.FragmentHighlighter(viewer)
highlighter.zoomToSelection = false
highlighter.outlineEnabled = true
highlighter.outlineMaterial = new THREE.MeshBasicMaterial ({color:"rgb(178,178,108)",wireframeLinewidth:0.2}) 
//Changing the colour to the highlighter

highlighter.setup()

//Setting the fragment manager in order to be able to download the fragment file 
const threeColor = new THREE.Color("rgb(255,50,40)")
highlighter.add("dblSelection", [new THREE.MeshStandardMaterial({ color: 0xa33a3a,side:2,depthTest:true,depthWrite: false,roughness:0,flatShading:true})])
highlighter.add("transparentMaterial" , [new THREE.MeshStandardMaterial({ color:0x8b9eb4, transparent:true,opacity:0.1, depthTest: false,depthWrite: false})])
let fragments = new OBC.FragmentManager(viewer)
const ifcLoader = new OBC.FragmentIfcLoader(viewer)

ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
//Camera
const grid = new OBC.SimpleGrid(viewer);
grid.visible = false

//Clipper
const styler = new OBC.FragmentClipStyler(viewer);

const clipper = new OBC.EdgesClipper(viewer);
const sectionMaterial = new THREE.LineBasicMaterial({ color: 'black', linewidth: 400 });
const fillMaterial = new THREE.MeshBasicMaterial({ color: 'gray', side: 2 });
const fillOutline = new THREE.MeshBasicMaterial({ color: 'black', side: 1, opacity: 0.5, transparent: true })

clipper.styles.create("filled", new Set(), sectionMaterial, fillMaterial, fillOutline);
clipper.styles.create("projected", new Set(), sectionMaterial);
const styles = clipper.styles.get();
//
clipper.enabled = true;

await styler.setup();



postproduction.customEffects.outlineEnabled = true;

//Adding properties proccessor
const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)

//Adding Classifies
export const classifier = new OBC.FragmentClassifier(viewer)
export const classificationWindow = new OBC.FloatingWindow(viewer)
classificationWindow.visible = false
viewer.ui.add(classificationWindow)
classificationWindow.title = "Model Tree"

const classificationsBtn = new OBC.Button(viewer)
classificationsBtn.materialIcon = "account_tree"
//Logic
classificationsBtn.onClick.add(() => {
  classificationWindow.visible = !classificationWindow.visible
  classificationWindow.active = classificationWindow.visible
})

//::::::::::::
const plans = new OBC.FragmentPlans(viewer)

//ToolBar
const toolbar = new OBC.Toolbar(viewer);
toolbar.name = "Main toolbar";
viewer.ui.addToolbar(toolbar);
toolbar.addChild(
  classificationsBtn,
  propertiesProcessor.uiElement.get("main"),
  plans.uiElement.get('main'),
  plans.uiElement.get('main'),
  cameraComponent.uiElement.get("main")
)
const hider = new OBC.FragmentHider(viewer);
//
const stylerButton = styler.uiElement.get("mainButton");
//Logic to clipper

//Create IFC tree function 
async function createModelTree() {
  const fragmentTree = new OBC.FragmentTree(viewer)
  await fragmentTree.init()
  await fragmentTree.update(["storeys", "entities"])
  //Hover and Select elements in tree 
  fragmentTree.onHovered.add ((fragmenMap)=>{
    highlighter.highlightByID("hover",fragmenMap)
  })
  fragmentTree.onSelected.add((fragmentMap)=>{
    highlighter.highlightByID("select", fragmentMap)
  })
  let tree = fragmentTree.get().uiElement.get("tree")
  return tree
}

// //Load fragments
// function disposeFragments(model) {
//   fragments.disposeGroup(model);
// }

const highlightMat = new THREE.MeshBasicMaterial({
  depthTest: false,
  color: 0xBCF124,
  transparent: true,
  opacity: 0.3
});
highlighter.add("default", [highlightMat]);
//

export async function loadIfcAsFragments(ifcModelFile) {
  
  
  //IfcLoaderConfiguration
  ifcLoader.settings.wasm = {
    path: "https://unpkg.com/web-ifc@0.0.44/",
    absolute: true
  }
  fragments.dispose(true)
  //Getting rid of the previous Properties
  if(classifier.hasOwnProperty("_groupSystems")){
    classifier.dispose()
  }
  let previousModel
  scene.children.forEach ((child)=>{
    if(child.type === "Group"){
      previousModel = child
      console.log("Previous model",previousModel)
      console.log(fragments.groups)
    }
    if (previousModel!== undefined){
      scene.remove(previousModel)
    }
    if(child.type === "Mesh"){
      scene.remove(child)
    }
  })
  if(plans){
    plans.updatePlansList()
    
  }
  
  // plans.dispose()//Esto es un problema
  //Getting rid of previous tree if any
  let tree
  if(tree!==undefined){
    classificationWindow.removeChild(tree)    
    tree.dispose()
  }

 
  let properties:IfcProperties | undefined = undefined;
  let model:FragmentsGroup |undefined =undefined;

  let file = await fetch(ifcModelFile);
  let data = await file.arrayBuffer();
  let buffer = new Uint8Array(data);
  model = await ifcLoader.load(buffer, file.url);
  scene.add(model);

   

  properties = model.properties
  if (properties === undefined) { return }

  //PropertiesProcessor
  propertiesProcessor.process(model)
  highlighter.events.select.onHighlight.add((fragmentMap) => {
    const expressID = [...Object.values(fragmentMap)[0]][0]
    propertiesProcessor.renderProperties(model, Number(expressID))
  })
  highlighter.events.select.onClear.add(() => {
    propertiesProcessor.cleanPropertiesList()
  })
  //Plans
  let meshes: any = [];//COMENTADO
  await plans.computeAllPlanViews(model);
  console.log(plans)
   for (const fragment of model.items) {
     const { mesh } = fragment;
     meshes.push(mesh);
     styles.projected.meshes.add(mesh);
   }
  plans.commands = {

    "Select": async (plan) => {
      if (plan !== undefined) {
        const found = await classifier.find({ storeys: [plan.name] });
        highlighter.highlightByID("default", found);
      }
    },
    "Show": async (plan) => {
      if (plan !== undefined) {
        const found = await classifier.find({ storeys: [plan.name] });
        hider.set(true, found);
      }
    },
    "Hide": async (plan) => {
      if (plan !== undefined) {
        const found = await classifier.find({ storeys: [plan.name] });
        hider.set(false, found);
      }
    },
  }
  plans.updatePlansList();

  plans.onNavigated.add(() => {
    materialManager.setBackgroundColor(whiteColor);
    materialManager.set(true, ["white"]);

  });
  plans.onExited.add(() => {
    materialManager.resetBackgroundColor();
    materialManager.set(false, ["white"]);

  });


  //Cube 
  const navCube = new OBC.CubeMap(viewer);
  navCube.offset = 1;
  navCube.setPosition("top-right");
  //Camera
  function toggleProjection() {
    cameraComponent.toggleProjection();
  }
  cameraComponent.projectionChanged.add(() => {
    const projection = cameraComponent.getProjection();
    grid.fade = projection === 'Perspective';
  });
  function setNavigationMode(navMode) {
    cameraComponent.setNavigationMode(navMode);
  }
  //clip logic
  window.ondblclick = () => {
    if (clipper.enabled) {
      clipper.create();
    }
  }
  window.onkeydown = (event) => {
    if (event.code === "Delete" || event.code === "Backspace") {
      if (clipper.enabled) {
        clipper.delete()
        console.log(scene)
      }
    }
  }

  const found = classifier.find({ entities: ["IFCWALLSTANDARDCASE", "IFCWALL"] });
  for (const fragID in found) {
    const { mesh } = fragments.list[fragID];
    styles.filled.fragments[fragID] = new Set(found[fragID]);
    styles.filled.meshes.add(mesh);
  }
  //
  const whiteColor = new THREE.Color("white");
  const whiteMaterial = new THREE.MeshBasicMaterial({ color: whiteColor });
  const materialManager = new OBC.MaterialManager(viewer);
  materialManager.addMaterial("white", whiteMaterial);
  materialManager.addMeshes("white", meshes);
  //

 
  //Highligter logic once the model is loaded
  

  const canvas = rendererComponent.get().domElement;

  canvas.addEventListener("click", () => highlighter.clear("default"))
  highlighter.update();

  
  
  //Classify the entities to proccess the DBL properties
  let objProp = {}
  classifier.byStorey(model)
  objProp = classifier.get()

  //Adding Classification Tree

  classifier.byStorey(model)
  classifier.byEntity(model) 
  tree = await createModelTree()
  await classificationWindow.slots.content.dispose(true)
  classificationWindow.addChild(tree)


  //Obtain data from ifc
  await getEntityFragmentsByLevel(model, objProp)
  await getDblEntitiesByLevel(model, modelFragmentIdByLevel)
  await classifyEnvelope(dblEnvelopeWallElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements, dblEnvelopeWindowElements)
  await classifyMaterials(dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements)
  await summarizeEnvelope(dblEnvelopeWalls, dblEnvelopeWindows, dblEnvelopeFloors, dblEnvelopeRoofs)


  console.log("This is the model",model)
   getAllFragments(model)
}
export let dblEpcPhaseData: UndefinedDblEpc = {}
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let allModelFragments

async function getAllFragments (model){
  allModelFragments={}
  await model
  let items = model.items
  items.forEach( (item) =>{
    if(item.hasOwnProperty("id")&& item.hasOwnProperty("items")){
      let fragmentId = item.id
      let expressIdArray = item.items
      allModelFragments[fragmentId] = new Set(expressIdArray)
    }
  })
  //console.log("Aver",allModelFragments)
}
let allFragmentsExceptSelected
async function getAllFragmentExceptSelected (highlightedFragments, allModelFragments){
  allFragmentsExceptSelected = structuredClone(allModelFragments)
  if(allModelFragments!==undefined){
    for (let key in highlightedFragments){
      const substractingExpressId:any = []
      const substractedExpressId:any = []
      const intersectionFragmentKey = highlightedFragments[key]
      intersectionFragmentKey.forEach(value=>{
        substractingExpressId.push(value)
      })
      if(allFragmentsExceptSelected[key]){
        const originalExpressId = allFragmentsExceptSelected[key]
        const originalArray = Array.from(originalExpressId)
        if(substractingExpressId.length !== 0){
          let modifiedArray = originalArray.filter(valor=> !substractingExpressId.includes(valor) )
          let modifiedSet = new Set(modifiedArray.map(Number))
          let newFragmentMap:FragmentMap = {[key]:modifiedSet}
          console.log(newFragmentMap)
          delete allFragmentsExceptSelected.originalExpressId
          allFragmentsExceptSelected[key] = newFragmentMap[key];}
      }
    }
    console.log(allModelFragments,allFragmentsExceptSelected)
  }
}
function findFragmentMap(envelopeCode, dataSetName, levelKey) {
  let baseObject;
  switch (dataSetName) {
    case 'dblEnvelopeWalls':
      baseObject = dblEnvelopeWalls[levelKey]; break;
    case 'dblEnvelopeFloors': baseObject = dblEnvelopeFloors[levelKey]; break;
    case 'dblEnvelopeRoofs': baseObject = dblEnvelopeRoofs[levelKey]; break;
    default: return null; 
  }
  // Find objetct which matches dblEnvelopeCode in object
  const envelopeData = baseObject.find(obj => obj.dblEnvelopeCode === envelopeCode);
  if (!envelopeData) {
    return null; 
  }
  const composedEntity = envelopeData.dblComposedEntity;
  if (composedEntity && composedEntity.dblEnvelopeFragmentMap) {
    return composedEntity.dblEnvelopeFragmentMap; 
  }
  return null; 
}
let highlighterActive = false;//

export function getFragmentMapInfo() {
  document.querySelectorAll('.dbl-fragment-map-button').forEach(button => {
    button.addEventListener('click', function () {
      const envelopeCode = this.getAttribute('data-envelope-code')
      const dataSetName = this.getAttribute('data-dataset-name');
      const levelKey = this.getAttribute('data-level-key')
      let envelopeFragmentMap 
      console.log(envelopeCode)
      console.log(dataSetName)
      if (envelopeCode !== undefined && dataSetName !== undefined && levelKey !== undefined) {
        envelopeFragmentMap = findFragmentMap(envelopeCode, dataSetName, levelKey)
      }
      if (envelopeFragmentMap !== undefined) {
        if (!highlighterActive) {
          const fragmentMapLenght = Object.keys(envelopeFragmentMap).length
          if (fragmentMapLenght > 0) {
            getAllFragmentExceptSelected(envelopeFragmentMap,allModelFragments)
            console.log("Envelope",envelopeFragmentMap)
            highlighterActive = true;
            highlighter.outlineMaterial = new THREE.MeshBasicMaterial ({color:"rgb(178,178,108)",wireframeLinewidth:0.1}) 
            highlighter.fillEnabled = true
            // highlighter.highlightByID("transparentMaterial",allFragmentsExceptSelected,false)
            hider.isolate(envelopeFragmentMap)
            // highlighter.highlightByID("dblSelection", envelopeFragmentMap,true)
            
            
          }
        } else {
          highlighterActive = false
          // highlighter.clear("dblSelection")
          // highlighter.clear("transparentMaterial")
          hider.set(true)
        }
      }
    })
  })
}

export function clearHighlighterOnOutsideClick() {
  if (highlighterActive = true) {
    viewerContainer.addEventListener('click', function () {
      // highlighter.clear("dblSelection");
      // highlighter.clear("transparentMaterial")
      highlighterActive = false;
      highlighter.zoomToSelection = false
      hider.set(true)
    });
  }
}

export function findEpcPhaseData(epcStartDate) {
  return dblEpcData.find(certificate => {
    return certificate.dblEpcDynamic !== undefined && certificate.dblEpcDynamic.startDate === epcStartDate;
  });
}




