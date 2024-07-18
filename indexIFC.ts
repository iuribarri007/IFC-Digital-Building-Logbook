import * as THREE from "three"
import * as OBC from "openbim-components"
import * as WEBIFC from "web-ifc"
import { FragmentMap, FragmentsGroup, IfcProperties } from "bim-fragment"
import { Fragment } from "bim-fragment"
import { color, exp, or, viewportResolution } from "three/examples/jsm/nodes/Nodes.js"
import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper.js"
//Local imports
//Local logic
import { wallEntitiesByLevel, dblEnvelopeWallElements, dblEnvelopeWindowElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements } from "./src/components/getIfcData.js"
import { floorEntitiesByLevel, windowEntitiesByLevel, roofEntitiesByLevel, } from "./src/components/getIfcData.js"
import { modelFragmentIdByLevel } from "./src/components/getIfcData.js"
//Import logic
import { getEntityFragmentsByLevel, getDblEntitiesByLevel, classifyEnvelope, classifyMaterials, summarizeEnvelope } from "./src/components/getIfcData.js"
import { dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements } from "./src/components/getIfcData.js"
import { dblEnvelopeWalls, dblEnvelopeFloors, dblEnvelopeRoofs, dblEnvelopeWindows } from "./src/components/getIfcData.js"
import { dblEnvelopeSummaryVertical } from "./src/components/getIfcData.js"
import { dblSkinMaterialInventory, dblStructuralMaterialInventory, dblServiceMaterialInventory, dblSpaceMaterialInventory, dblStuffMaterialInventory } from "./src/components/getIfcData.js"
import { projectPhasesArray } from "./src/static/modelPhases"
//Alpine
import Alpine, { remove } from 'alpinejs';

import { dblEnvData, thermalEnvelopeTemplate, dblEnvelopeVerticalSummarize, envelopeVerticalSummaryTemplate } from './src/template.js';

import { dblMaterialData, materialInventoryTemplate } from './src/template.js';
import { epcDataTemplate, initializeEpcData } from "./src/template.js"
//
import { getCertificates } from "./src/api/openDataCEE.js"
import { dblEpcData } from "./src/components/getEpcData.js"
import { dblEpc, dblEpcDynamic, dblEpcStatic, dblEpcEmissionsCO2, dblEpcEnergyDemand, dblEpcNonRenEnergyConsumption, UndefinedDblEpc } from "./src/components/interfaceEpc.js"
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js"



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
viewer.raycaster = raycasterComponent
//Creating the highlighter
const highlighter = new OBC.FragmentHighlighter(viewer)
highlighter.zoomToSelection = false
//Changing the colour to the highlighter

highlighter.setup()
viewer.init()
cameraComponent.setProjection("Orthographic");
cameraComponent.updateAspect()
rendererComponent.postproduction.enabled = true
//Setting the fragment manager in order to be able to download the fragment file 
const threeColor = new THREE.Color("rgb(255,50,40)")
highlighter.add("amazing", [new THREE.MeshStandardMaterial({ color: 0x1c71c6,side:2,depthTest:true,depthWrite: false,roughness:0,flatShading:true})])
highlighter.add("transparentMaterial" , [new THREE.MeshStandardMaterial({ color:"rgb(180,180,200)",wireframe:true,side:1,transparent:true,opacity:0.1,depthWrite: false,depthTest:false})])
highlighter.add("transparentMaterial2",[new THREE.LineBasicMaterial({color: 0x1c71c6,linewidth: 1,transparent:true,opacity:0.1})])
highlighter.add("lines",[new THREE.LineBasicMaterial({color: 0x1c71c6,linewidth: 2,})])

//Grid and cube

const navCube = new OBC.CubeMap(viewer);
navCube.offset = 1;
navCube.setPosition("top-right");
//
const fragmentManager = new OBC.FragmentManager(viewer)

let fragments = new OBC.FragmentManager(viewer)
const ifcLoader = new OBC.FragmentIfcLoader(viewer)
ifcLoader.settings.wasm = {
  path: "https://unpkg.com/web-ifc@0.0.44/",
  absolute: true
}
ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
//Camera
const grid = new OBC.SimpleGrid(viewer);
grid.visible = false
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

//Clipper
const clipper = new OBC.EdgesClipper(viewer);
const sectionMaterial = new THREE.LineBasicMaterial({ color: 'black', linewidth: 200 });
const fillMaterial = new THREE.MeshBasicMaterial({ color: 'gray', side: 2 });
const fillOutline = new THREE.MeshBasicMaterial({ color: 'black', side: 1, opacity: 0.5, transparent: true })
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
highlighter.events.select.onClear.add(() => {
  propertiesProcessor.cleanPropertiesList()
})
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
  plans.uiElement.get('main'),
  cameraComponent.uiElement.get("main")
)
toolbar.name = "Main toolbar";
viewer.ui.addToolbar(toolbar);
//
const stylerButton = styler.uiElement.get("mainButton");
//Logic to clipper
window.ondblclick = () => {
  if (clipper.enabled) {
    clipper.create();
  }
}
window.onkeydown = (event) => {
  if (event.code === "Delete" || event.code === "Backspace") {
    if (clipper.enabled) {
      clipper.delete()
    }
  }
}
//Create model tree
async function createModelTree() {
  const fragmentTree = new OBC.FragmentTree(viewer)
  await fragmentTree.init()
  await fragmentTree.update(["storeys", "entities"])
  const tree = fragmentTree.get().uiElement.get("tree")
  //Hover and Select elements in tree 
  fragmentTree.onHovered.add((fragmentMap) => {
    highlighter.highlightByID("hover", fragmentMap)
  })
  fragmentTree.onSelected.add((fragmentMap) => {
    highlighter.highlightByID("select", fragmentMap)
  })
  return tree
}
//Load fragments
async function disposeFragments(model: FragmentsGroup) {
  fragments.dispose()
}
const highlightMat = new THREE.MeshBasicMaterial({
  depthTest: false,
  color: 0xBCF124,
  transparent: true,
  opacity: 0.3
});
highlighter.add("default", [highlightMat]);
//

async function loadIfcAsFragments(ifcModelFile) {
  console.log(1,fragments.groups)
  if(classifier.hasOwnProperty("_groupSystems")){
    //console.log(1,classifier)
    classifier.dispose()
  }
  
  let elementsToErase: any[] = [];
  scene.children.forEach((chld, index) => {
    if (index >2)
      elementsToErase.push(chld);
  });
  scene.remove(...elementsToErase);

  let properties:IfcProperties | undefined = undefined;
  let model:FragmentsGroup |undefined =undefined;

  let file = await fetch(ifcModelFile);
  let data = await file.arrayBuffer();
  let buffer = new Uint8Array(data);
   model = await ifcLoader.load(buffer, file.url);

  scene.add(model);
  
  //console.log(2,classifier)
  properties = model.properties
  if (properties === undefined) { return }

  //PropertiesProcessor
  propertiesProcessor.process(model)
  highlighter.events.select.onHighlight.add((fragmentMap) => {
    const expressID = [...Object.values(fragmentMap)[0]][0]
    propertiesProcessor.renderProperties(model, Number(expressID))
  })
  //Try to create plans
  const meshes: any = [];
  for (const fragment of model.items) {
    const { mesh } = fragment;
    meshes.push(mesh);
    styles.projected.meshes.add(mesh);
  }
  //
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

//  await plans.computeAllPlanViews(model)
 
  //
  const hider = new OBC.FragmentHider(viewer);
  const canvas = rendererComponent.get().domElement;
  canvas.addEventListener("click", () => highlighter.clear("default"))
  highlighter.update()

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
  toolbar.addChild(plans.uiElement.get('main'));
  plans.onNavigated.add(() => {
    materialManager.setBackgroundColor(whiteColor);
    materialManager.set(true, ["white"]);

  });

  plans.onExited.add(() => {
    materialManager.resetBackgroundColor();
    materialManager.set(false, ["white"]);

  });
  const dxfExporter = new OBC.DXFExporter(viewer);

  plans.commands = {
    "Export to DXF": async (plan) => {
      if (plan != undefined) {
        const link = document.createElement("a");
        const result = await dxfExporter.export(plan.name);
        const fileName = `${plan.name}.dxf`;
        const file = new File([new Blob([result])], fileName);
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
        link.remove();
      }
    },
  }

  //
  //Classify the entities manually
  let objProp = {}
  classifier.byStorey(model)
  objProp = classifier.get()
  classifier.byStorey(model)
  classifier.byEntity(model)
  //Adding Classification Tree
  const tree = await createModelTree()
  await classificationWindow.slots.content.dispose(true)
  classificationWindow.addChild(tree)
  //Get the fragmentIds and ExpressIds
    //:::::::::::::::::::::::::::::::::::::: prueba
  await getEntityFragmentsByLevel(model, objProp)

  await getDblEntitiesByLevel(model, modelFragmentIdByLevel)
  //
  await classifyEnvelope(dblEnvelopeWallElements, dblEnvelopeFloorElements, dblEnvelopeRoofElements, dblEnvelopeWindowElements)

  await classifyMaterials(dblWallElements, dblFloorElements, dblWindowElements, dblRoofElements, dblStrLinealElements, dblCoveringElements)

  await summarizeEnvelope(dblEnvelopeWalls, dblEnvelopeWindows, dblEnvelopeFloors, dblEnvelopeRoofs)
  await console.log("Summaryyy", dblEnvelopeSummaryVertical)
  console.log(model)
  getAllFragments(model)
  //console.log("los planooos",plans)
  //console.log(scene.children)
  //console.log(3 ,classifier)
  console.log(2,fragments.groups[0])
}
let dblEpcPhaseData: UndefinedDblEpc = {}
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const phasesBtns = document.querySelectorAll('.project-phase')
phasesBtns.forEach(button => {
  button.addEventListener("click", ifcLoadEvent)
});

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
  console.log("Aver",allModelFragments)
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
    default: return null; // Retorna null si no se encuentra el dataSetName
  }
  // Busca el objeto con el envelopeCode dentro de baseObject
  const envelopeData = baseObject.find(obj => obj.dblEnvelopeCode === envelopeCode);
  if (!envelopeData) {
    return null; // Retorna null si no se encuentra el envelopeCode
  }
  const composedEntity = envelopeData.dblComposedEntity;
  if (composedEntity && composedEntity.dblEnvelopeFragmentMap) {
    return composedEntity.dblEnvelopeFragmentMap; // Retorna el valor de dblEnvelopeFragmentMap
  }
  return null; // Retorna null si no se encuentra dblFragmentMap
}
let highlighterActive = false;//

function getFragmentMapInfo() {
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
            highlighter.outlineEnabled = true
            highlighter.fillEnabled = true
            
            highlighter.highlightByID("amazing", envelopeFragmentMap)
            highlighter.highlightByID("lines",envelopeFragmentMap)
            highlighter.highlightByID("transparentMaterial",allFragmentsExceptSelected)
            
            
            //
            
          }
        } else {
          highlighterActive = false
          highlighter.clear("amazing")
          highlighter.clear("transparentMaterial")
        }
      }
    })
  })
}

function clearHighlighterOnOutsideClick() {
  if (highlighterActive = true) {
    viewerContainer.addEventListener('click', function () {
      highlighter.clear("amazing");
      highlighter.clear("transparentMaterial")
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
  //
  Alpine.data('dblEnvelopeVerticalSummarize', () => dblEnvelopeVerticalSummarize({ envelopeData: dblEnvelopeSummaryVertical, title: 'Facade data summary' }));

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  Alpine.data('dblSkinMaterial', () => dblMaterialData({ categories: dblSkinMaterialInventory, mainTitle: 'Skin Material' }));
  Alpine.data('dblStructuralMaterial', () => dblMaterialData({ categories: dblStructuralMaterialInventory, mainTitle: 'Structural Material' }));
  //::::::::::::::::::::::::::::::::
  Alpine.data('epcData', () => initializeEpcData({ data: dblEpcPhaseData, mainTitle: 'EPC Infooo' }));
});
interface AlpineElement extends HTMLElement {
  __x?: {
    $destroy: () => void;
  };
}
function clearAlpineComponents() {
  const containers = [
    'alpine-template-container',
    'alpine-template-container2',
    'alpine-template-container3',
    'alpine-StructureMaterial-ThermalEnvelope-Static',
    'alpine-SkinMaterialInventory',
    'alpine-StructuralMaterialInventory',
    'alpine-epcPhaseData'
  ];

  containers.forEach(containerId => {
    const container = document.getElementById(containerId) as AlpineElement; // Aserción de tipo
    if (container) {
      if (container.__x) { // Si el contenedor tiene una instancia de Alpine.js
        container.__x.$destroy(); // Destruye la instancia de Alpine.js
      }
      container.removeAttribute('x-data');
      container.innerHTML = ''; // Limpia el contenido del contenedor
    }
  });
}

function initializeAlpine() {
  if (alpineInitialized) {clearAlpineComponents()}

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
    const thermalEnvelopeStaticContainer = document.getElementById('alpine-StructureMaterial-ThermalEnvelope-Static');
    if (thermalEnvelopeStaticContainer) {
      thermalEnvelopeStaticContainer.setAttribute('x-data', 'dblEnvelopeVerticalSummarize()');
      thermalEnvelopeStaticContainer.innerHTML = envelopeVerticalSummaryTemplate;
    }
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //MaterialInventory
    const skinMaterialContainer = document.getElementById('alpine-SkinMaterialInventory');
    if (skinMaterialContainer) {
      skinMaterialContainer.setAttribute('x-data', 'dblSkinMaterial()');
      skinMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    const structuraMaterialContainer = document.getElementById('alpine-StructuralMaterialInventory')
    if (structuraMaterialContainer) {
      structuraMaterialContainer.setAttribute('x-data', 'dblStructuralMaterial()');
      structuraMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    //epcDATA
    const epcContainer = document.getElementById('alpine-epcPhaseData');
    if (epcContainer) {
      epcContainer.setAttribute('x-data', 'epcData()');
      epcContainer.innerHTML = epcDataTemplate;
    }
    if (!alpineInitialized) {
      Alpine.start(); // Inicializa Alpine.js solo una vez
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
        let epcStartDate = phase.epcStartDate;
        dblEpcPhaseData = dblEpcData.find(certificate => {
          return certificate.dblEpcDynamic !== undefined && certificate.dblEpcDynamic.startDate === epcStartDate;
        });
        if (dblEpcPhaseData !== undefined) {
          console.log("Datos de epcPhaseData encontrados:", dblEpcPhaseData);
        } else {
          console.log("Datos de epcPhaseData no encontrados.");
        }
      })
      .then(() => {
        initializeAlpine(); // Inicializar Alpine.js después de obtener los datos
      })
      .catch(error => {
        console.log("Error loading IFC", error);
      });
  } else {
    console.log("Not found");
  }
}
