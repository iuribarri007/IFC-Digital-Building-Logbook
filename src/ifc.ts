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
import { UndefinedDblEpc } from "./components/epcComponents/epcInterface.js"

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

let fragments = new OBC.FragmentManager(viewer)
const ifcLoader = new OBC.FragmentIfcLoader(viewer)

ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
//Camera
const grid = new OBC.SimpleGrid(viewer);
grid.visible = false

//Clipper
const clipper = new OBC.EdgesClipper(viewer);
clipper.material.opacity = 0.01;
const styler = new OBC.FragmentClipStyler(viewer);

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

//ToolBar
const toolbar = new OBC.Toolbar(viewer);
toolbar.name = "Main toolbar";
viewer.ui.addToolbar(toolbar);
toolbar.addChild(
  classificationsBtn,
  propertiesProcessor.uiElement.get("main"),
  cameraComponent.uiElement.get("main"),
  
)
const hider = new OBC.FragmentHider(viewer);
//
//Styler
postproduction.customEffects.outlineEnabled = true;
toolbar.addChild(styler.uiElement.get("mainButton"))
await styler.setup();
const sectionMaterial = new THREE.LineBasicMaterial({ color: 'black', linewidth: 400 });
const fillMaterial = new THREE.MeshBasicMaterial({ color: 'gray', side: 2 });
const fillOutline = new THREE.MeshBasicMaterial({ color: 'black', side: 1, opacity: 0.5, transparent: true })
clipper.styles.create("filled", new Set(), sectionMaterial, fillMaterial, fillOutline);
clipper.styles.create("projected", new Set(), sectionMaterial);
const styles = clipper.styles.get();
clipper.enabled = true;

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
      console.log(highlighter)
       highlighter.dispose()
       highlighter.update()

       if (clipper.enabled) {
        clipper.delete()
      }
    }
    if(child.type === "Mesh"){
      scene.remove(child)
    }
  })

  //Getting rid of previous tree if any
  let tree
  if(tree!==undefined){
    classificationWindow.removeChild(tree)    
    tree.dispose()
  }
  // Highlighter
  highlighter.zoomToSelection = false
  highlighter.outlineEnabled = false
  //Changing the colour to the highlighter

  highlighter.setup()
  const highlightMat = new THREE.MeshBasicMaterial({
    depthTest: false,
    color: 0xBCF124,
    transparent: true,
    opacity: 0.3
  });
  highlighter.add("default", [highlightMat]);
  highlighter.add("dblSelection", [new THREE.MeshStandardMaterial({ color: "rgb(178,178,108)",side:2,depthTest:true,depthWrite: false,roughness:0,flatShading:true})])
  highlighter.add("transparentMaterial" , [new THREE.MeshStandardMaterial({ color:0x8b9eb4, transparent:true,opacity:0.05, depthTest: false,depthWrite: false})])

  
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
  highlighterActive = false;
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
  await styler.update()
  classificationWindow.addChild(tree)

  //Proccess and organize data from the IFC model

  await getEntityFragmentsByLevel(model, objProp)
  await getDblEntitiesByLevel(model, modelFragmentIdByLevel)
  await classifyEnvelope(dblEnvelopeWallElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements, dblEnvelopeWindowElements)
  await classifyMaterials(dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements)
  await summarizeEnvelope(dblEnvelopeWalls, dblEnvelopeWindows, dblEnvelopeFloors, dblEnvelopeRoofs)

  getAllFragments(model)

}

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
}
let allFragmentsExceptSelected
async function getAllFragmentExceptSelected (highlightedFragments, allModelFragments){
  allFragmentsExceptSelected = structuredClone(allModelFragments)
  if(allModelFragments!==undefined){
    for (let key in highlightedFragments){
      const substractingExpressId:any = []
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
          delete allFragmentsExceptSelected.originalExpressId
          allFragmentsExceptSelected[key] = newFragmentMap[key];}
      }
    }
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
    console.log("No envelope Data found")
    return null; 
    
  }
  const composedEntity = envelopeData.dblComposedEntity;
  if (composedEntity && composedEntity.dblEnvelopeFragmentMap) {
    return composedEntity.dblEnvelopeFragmentMap; 
  }
  return null; 
}
let highlighterActive 

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
            highlighterActive = true;
            getAllFragmentExceptSelected(envelopeFragmentMap,allModelFragments)
            console.log("Envelope",envelopeFragmentMap)
            highlighter.fillEnabled = true
            highlighter.highlightByID("transparentMaterial",allFragmentsExceptSelected,false)
            highlighter.highlightByID("dblSelection", envelopeFragmentMap,true)
            highlighter.update()
            hider.isolate(envelopeFragmentMap)
          }
        } else {
          highlighterActive = false
          highlighter.clear("dblSelection")
          highlighter.clear("transparentMaterial")
          highlighter.update()
          hider.set(true)
        }
      }
    })
  })
}

export function clearHighlighterOnOutsideClick() {
  if (highlighterActive = true) {
    viewerContainer.addEventListener('click', function () {
      highlighter.clear("dblSelection");
      highlighter.clear("transparentMaterial")
      highlighterActive = false;
      highlighter.zoomToSelection = false
      hider.set(true)
    });
  }
}

export let dblEpcPhaseData: UndefinedDblEpc = {}
export function findEpcPhaseData(epcStartDate) {
  return dblEpcData.find(certificate => {
    return certificate.dblEpcDynamic !== undefined && certificate.dblEpcDynamic.startDate === epcStartDate;
  });
}




