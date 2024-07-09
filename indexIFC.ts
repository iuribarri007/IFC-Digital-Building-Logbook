import * as THREE from "three"
import * as OBC from "openbim-components"
import * as WEBIFC from "web-ifc"
import { FragmentsGroup } from "bim-fragment"
import { Fragment } from "bim-fragment"
import { color, exp, or, viewportResolution } from "three/examples/jsm/nodes/Nodes.js"
import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper.js"
//Local imports
//Local logic
import { wallEntitiesByLevel, dblEnvelopeWallElements, dblEnvelopeWindowElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements } from "./src/components/getIfcData.js"
import { floorEntitiesByLevel,windowEntitiesByLevel,roofEntitiesByLevel, } from "./src/components/getIfcData.js"
import {modelFragmentIdByLevel} from "./src/components/getIfcData.js"
//Import logic
import { getEntityFragmentsByLevel,getDblEntitiesByLevel,classifyEnvelope, classifyMaterials } from "./src/components/getIfcData.js"
import { dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements } from "./src/components/getIfcData.js"
import { dblEnvelopeWalls,dblEnvelopeFloors, dblEnvelopeRoofs, dblEnvelopeWindows } from "./src/components/getIfcData.js"
import { dblSkinMaterialInventory, dblStructuralMaterialInventory, dblServiceMaterialInventory, dblSpaceMaterialInventory, dblStuffMaterialInventory} from "./src/components/getIfcData.js"
import { projectPhasesArray} from "./src/static/modelPhases"
//Alpine
import Alpine from 'alpinejs';

import { dblEnvData, thermalEnvelopeTemplate } from './src/template.js';
import {dblMaterialData,materialInventoryTemplate } from './src/template.js';
//
import { getCertificates } from "./src/api/openDataCEE.js"

const viewer = new OBC.Components()
const sceneComponent = new OBC.SimpleScene(viewer)
viewer.scene = sceneComponent
const scene = sceneComponent.get()
sceneComponent.setup()
scene.background = null
//Creating the Renderer
const viewerContainer = document.getElementById("viewer-container") as HTMLDivElement
const rendererComponent = new OBC.PostproductionRenderer(viewer, viewerContainer)
viewer.renderer = rendererComponent
//Creating the camera
const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
viewer.camera = cameraComponent

const raycasterComponent = new OBC.SimpleRaycaster(viewer)
viewer.raycaster= raycasterComponent
//Creating the highlighter
const highlighter = new OBC.FragmentHighlighter(viewer)
highlighter.zoomToSelection = false
//Changing the colour to the highlighter

highlighter.setup()
viewer.init()
cameraComponent.updateAspect()
rendererComponent.postproduction.enabled= true
//Setting the fragment manager in order to be able to download the fragment file 
const threeColor= new THREE.Color("rgb(255,50,40)")
highlighter.add("amazing",[new THREE.MeshStandardMaterial({color: "rgb(255,50,40)"})] )
highlighter.add("amazing2",[new THREE.MeshStandardMaterial({color: "rgb(255,255,0)"})] )
//



const fragmentManager = new OBC.FragmentManager(viewer)

let fragments = new OBC.FragmentManager(viewer)
const ifcLoader= new OBC.FragmentIfcLoader(viewer)
ifcLoader.settings.wasm = {
  path: "https://unpkg.com/web-ifc@0.0.44/",
  absolute: true
  }
ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
//Plans


//Clipper
const clipper = new OBC.EdgesClipper(viewer);
const sectionMaterial = new THREE.LineBasicMaterial({color: 'black',linewidth:30});
const fillMaterial = new THREE.MeshBasicMaterial({color: 'gray', side: 2});
const fillOutline = new THREE.MeshBasicMaterial({color: 'black', side: 1, opacity: 0.5, transparent: true})
clipper.styles.create("filled", new Set(), sectionMaterial, fillMaterial, fillOutline);
clipper.styles.create("projected", new Set(), sectionMaterial);
const styles = clipper.styles.get();
//
clipper.enabled = true;
const styler = new OBC.FragmentClipStyler(viewer);
await styler.setup();

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Adding properties proccessor
const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
highlighter.events.select.onClear.add(()=>{
  propertiesProcessor.cleanPropertiesList()
})
//Adding Classifies
export const classifier = new OBC.FragmentClassifier(viewer)
export const classificationWindow = new OBC.FloatingWindow(viewer)
classificationWindow.visible=false
viewer.ui.add(classificationWindow)
classificationWindow.title="Model Tree"
const classificationsBtn = new OBC.Button(viewer)
classificationsBtn.materialIcon ="account_tree"
//Logic
classificationsBtn.onClick.add(() => {
  classificationWindow.visible =!classificationWindow.visible
  classificationWindow.active = classificationWindow.visible
})
//::::::::::::::::::::::::
const colorBtn = new OBC.Button(viewer)
colorBtn.materialIcon = "format_color_fill"

//::::::::::::
const plans = new OBC.FragmentPlans(viewer)
//ToolBar
const toolbar = new OBC.Toolbar(viewer);
toolbar.addChild(
  classificationsBtn,
  propertiesProcessor.uiElement.get("main"),
  colorBtn,
  plans.uiElement.get('main')
)
toolbar.name = "Main toolbar";
viewer.ui.addToolbar(toolbar);
//
const stylerButton = styler.uiElement.get("mainButton");
//Logic to clipper
window.ondblclick = () => {
  if(clipper.enabled){
    clipper.create();
  }
}
window.onkeydown = (event) =>{
  if(event.code === "Delete" || event.code ==="Backspace"){
    if(clipper.enabled){
      clipper.delete()
    }
  }
}

//Create model tree
async function createModelTree(){
  const fragmentTree= new OBC.FragmentTree(viewer)
  await fragmentTree.init()
  await fragmentTree.update(["storeys","entities"])
  const tree = fragmentTree.get().uiElement.get("tree")
  //Hover and Select elements in tree 
  fragmentTree.onHovered.add((fragmentMap)=>{
    highlighter.highlightByID("hover",fragmentMap)
  })
  fragmentTree.onSelected.add((fragmentMap)=>{
    highlighter.highlightByID("select",fragmentMap)
  })
 return tree 
}
//Load fragments
async function disposeFragments(model:FragmentsGroup){
  fragmentManager.disposeGroup(model)
}

async function loadIfcAsFragments(ifcModelFile) {
  
  for (let e in scene.children ){
    const element= scene.children[e]
    if(element.type ==="Group"){
      const existingModel:FragmentsGroup = element[e]
      disposeFragments(existingModel)
    }
  }
  let file = await fetch(ifcModelFile);
  let data = await file.arrayBuffer();
  let buffer = new Uint8Array(data);
  let model = await ifcLoader.load(buffer, file.url);

  scene.add(model);
  const properties= model.properties 
  if(properties===undefined){return}
  
  //PropertiesProcessor
  propertiesProcessor.process(model)
  highlighter.events.select.onHighlight.add((fragmentMap)=>{
    const expressID= [...Object.values(fragmentMap)[0]][0]
    propertiesProcessor.renderProperties(model,Number(expressID))
  })
  //Try to create plans
  const meshes:any = [];
  for (const fragment of model.items) {
      const {mesh} = fragment;
      meshes.push(mesh);
      styles.projected.meshes.add(mesh);
  }
  //
  const found = classifier.find({entities: ["IFCWALLSTANDARDCASE", "IFCWALL"]});
  for (const fragID in found) {
    const {mesh} = fragments.list[fragID];
    styles.filled.fragments[fragID] = new Set(found[fragID]);
    styles.filled.meshes.add(mesh);
  }
  //
  const whiteColor = new THREE.Color("white");
  const whiteMaterial = new THREE.MeshBasicMaterial({color: whiteColor});
  const materialManager = new OBC.MaterialManager(viewer);
  materialManager.addMaterial("white", whiteMaterial);
  materialManager.addMeshes("white", meshes);
  //

  await plans.computeAllPlanViews(model)
  //
  const hider = new OBC.FragmentHider(viewer);
  const highlightMat =  new THREE.MeshBasicMaterial({
    depthTest: false,
    color: 0xBCF124,
    transparent: true,
    opacity: 0.3
  });
  highlighter.add("default", [highlightMat]);
  const canvas = rendererComponent.get().domElement;
  canvas.addEventListener("click", () => highlighter.clear("default"))
  highlighter.update()
  
  plans.commands = {
    
    "Select": async (plan) => {
      if(plan !== undefined){
        const found = await classifier.find({storeys: [plan.name]});
        highlighter.highlightByID("default", found);
      }
    },
    "Show": async (plan) => {
      if(plan!==undefined){
        const found = await classifier.find({storeys: [plan.name]});
        hider.set(true, found);
      }
    },
    "Hide": async (plan) => {
      if(plan!==undefined){
        const found = await classifier.find({storeys: [plan.name]});
        hider.set(false, found);
      }
    },
  }
  plans.updatePlansList();
  toolbar.addChild(plans.uiElement.get('main'));
  plans.onNavigated.add(() => {

    materialManager.setBackgroundColor(whiteColor);
    materialManager.set(true, ["white"]);
 
  });

  plans.onExited.add(() => {

    materialManager.resetBackgroundColor();
    materialManager.set(false, ["white"]);

  });

  
 

  //
  //Classify the entities manually
  classifier.byStorey(model)
  const objProp = classifier.get()
  classifier.byStorey(model)
  classifier.byEntity(model)
 //Adding Classification Tree
  const tree = await createModelTree()
  await classificationWindow.slots.content.dispose(true)
  classificationWindow.addChild(tree)
  //Get the fragmentIds and ExpressIds
  await getEntityFragmentsByLevel(model,objProp)
  //:::::::::::::::::::::::::::::::::::::: prueba
  const [firstSetKey, firstSetValues] = Object.entries((objProp.entities.IFCWALL))[1]
  console.log(firstSetValues)
  const entries = Array.from(firstSetValues.values())
  const slicedEntriesFirst = entries.slice(0,12)
  const slicedEntriesSecond = entries.slice(13,20)

  const slicedNewSetFirst = new Set(slicedEntriesFirst)
  const slicedNewSetSecond = new Set(slicedEntriesSecond)

 
  
  const map = {
    [firstSetKey]: slicedNewSetFirst
  };
  const mapSecond ={
    [firstSetKey]:slicedNewSetSecond
  };
  console.log("map",map)
  colorBtn.onClick.add(()=>{
    colorBtn.active= !colorBtn.active
    if(colorBtn.active){
      highlighter.highlightByID("amazing",map)
    }
    else{
      highlighter.clear("amazing")
    }
  })

  await getDblEntitiesByLevel(model,modelFragmentIdByLevel)
  //
  await classifyEnvelope(dblEnvelopeWallElements,dblEnvelopeFloorElements,dblEnvelopeRoofElements,dblEnvelopeWindowElements)
 
  await classifyMaterials (dblWallElements,dblFloorElements,dblWindowElements,dblRoofElements,dblStrLinealElements,dblCoveringElements)
  
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const phasesBtns = document.querySelectorAll('.project-phase')
phasesBtns.forEach(button=>{
  button.addEventListener("click",ifcLoadEvent)
});

function findFragmentMap(envelopeCode, dataSetName, levelKey) {
  let baseObject;
  switch (dataSetName) {
    case 'dblEnvelopeWalls':
      baseObject = dblEnvelopeWalls[levelKey];break;
    case 'dblEnvelopeFloors':baseObject = dblEnvelopeFloors[levelKey];break;
    case 'dblEnvelopeRoofs':baseObject = dblEnvelopeRoofs[levelKey];break;
    default: return null; // Retorna null si no se encuentra el dataSetName
  }
  // Busca el objeto con el envelopeCode dentro de baseObject
  const envelopeData = baseObject.find(obj => obj.dblEnvelopeCode === envelopeCode);
  if (!envelopeData) {return null; // Retorna null si no se encuentra el envelopeCode
}
  const composedEntity = envelopeData.dblComposedEntity;
  if (composedEntity && composedEntity.dblEnvelopeFragmentMap) {
    return composedEntity.dblEnvelopeFragmentMap; // Retorna el valor de dblEnvelopeFragmentMap
  }
  return null; // Retorna null si no se encuentra dblFragmentMap
}
let highlighterActive = false;//
function getFragmentMapInfo() {
  document.querySelectorAll('.dbl-fragment-map-button').forEach(button =>{
    button.addEventListener('click',function(){
      const envelopeCode = this.getAttribute('data-envelope-code')
      const dataSetName = this.getAttribute('data-dataset-name');
      const levelKey= this.getAttribute('data-level-key')
      let envelopeFragmentMap = undefined
      console.log(envelopeCode)
      console.log(dataSetName)
      if(envelopeCode!== undefined && dataSetName!== undefined && levelKey!== undefined){
        envelopeFragmentMap= findFragmentMap(envelopeCode,dataSetName,levelKey)
      }
      if(envelopeFragmentMap!== undefined){
        if(!highlighterActive){
          const fragmentMapLenght = Object.keys(envelopeFragmentMap).length
          highlighter.zoomToSelection = true
          highlighter.highlightByID("amazing",envelopeFragmentMap)
          highlighterActive = true;
        } else{
          highlighter.clear("amazing")
          highlighter.zoomToSelection = false
          highlighterActive= false
          
        }
      }
    })
  })
}

function clearHighlighterOnOutsideClick() {
  
  if(highlighterActive = true){
    
    viewerContainer.addEventListener('click', function() {
      highlighter.clear("amazing"); 
      highlighterActive = false;
      highlighter.zoomToSelection = false
    });
  }
}   
//ALPINE:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
let alpineInitialized = false;


document.addEventListener('alpine:init', () => {
  Alpine.data('dblEnvData1', () => dblEnvData({ dataSets: { dblEnvelopeWalls }, title: 'Aramotz Facades' }));
  Alpine.data('dblEnvData2', () => dblEnvData({ dataSets: { dblEnvelopeFloors }, title: 'Aramotz Floors' }));
  Alpine.data('dblEnvData3', () => dblEnvData({ dataSets: { dblEnvelopeRoofs }, title: 'Aramotz Roof' }));
  Alpine.data('dblSkinMaterial', () => dblMaterialData({ categories: dblSkinMaterialInventory, mainTitle: 'Skin Material' }));
  Alpine.data('dblStructuralMaterial', () => dblMaterialData({ categories: dblStructuralMaterialInventory, mainTitle: 'Structural Material' }));

  
});

function initializeAlpine() {
  if (!alpineInitialized) {
    const container1 = document.getElementById('alpine-template-container');
    if (container1) {
      container1.setAttribute('x-data', 'dblEnvData1()');
      container1.innerHTML = thermalEnvelopeTemplate;
    }

    const container2 = document.getElementById('alpine-template-container2');
    if (container2) {
      container2.setAttribute('x-data', 'dblEnvData2()');
      container2.innerHTML = thermalEnvelopeTemplate;
    }
    const container3 = document.getElementById('alpine-template-container3');
    if (container3) {
      container3.setAttribute('x-data', 'dblEnvData3()');
      container3.innerHTML = thermalEnvelopeTemplate;
    }
    const skinMaterialContainer = document.getElementById('alpine-SkinMaterialInventory');
    if (skinMaterialContainer) {
      skinMaterialContainer.setAttribute('x-data', 'dblSkinMaterial()');
      skinMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    const structuraMaterialContainer =  document.getElementById('alpine-StructuralMaterialInventory')
    if (structuraMaterialContainer) {
      structuraMaterialContainer.setAttribute('x-data', 'dblStructuralMaterial()');
      structuraMaterialContainer.innerHTML = materialInventoryTemplate;
    }

    Alpine.start();
    alpineInitialized = true; // Marca Alpine.js como iniciado
    getFragmentMapInfo()
    clearHighlighterOnOutsideClick()
  }
}
//Events:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function ifcLoadEvent(event) {
  let buttonId = event.target.id;
  let phase = projectPhasesArray.find(phase => phase.id === parseInt(buttonId));
  if (phase) {
    let ifcModel = phase.ifcModel;
    console.log(phase);
    loadIfcAsFragments(ifcModel)
      .then(() => {
        console.log("IFC successfully loaded", phase);
        // Inicializa Alpine.js después de que el modelo IFC se haya cargado
        getCertificates("48","27","Aramotz","1",1,10)
          .then(certificate =>{
            initializeAlpine();
          })
      })
      .catch(error => {
        console.log("Error loading IFC", error);
      });
  } else {
    console.log("Not found");
  }
}
