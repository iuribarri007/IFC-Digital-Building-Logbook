import Alpine, { remove } from 'alpinejs';
// Import templates
import { thermalEnvelopeTemplate,thermalEnvelopeWindowTemplate, envelopeVerticalSummaryTemplate,dblShowThermalEnvelope, dblShowThermalEnvelopeWindows, dblEnvelopeVerticalSummarize } from "./templateThermalEnvelope";
import { materialInventoryTemplate, materialMadasterSummaryTemplate,dblShowMaterialInventory,dblShowMaterialMadasterSummary } from "./templateMaterialInventory";
import { dblEnvelopeWalls,dblEnvelopeFloors,dblEnvelopeRoofs,dblEnvelopeWindows,dblEnvelopeSummaryVertical } from "../components/ifcComponents/getIfcThermalEnvelopeData";
import { dblShowEpcData,epcDataTemplate} from './templateEPC';
// Import Objects
import { dblSkinMaterialInventory,dblStructuralMaterialInventory,dblServiceMaterialInventory,dblSpaceMaterialInventory,dblStuffMaterialInventory } from '../components/ifcComponents/getIfcMaterialInventoryData';
import { dblSkinMadasterSummary,dblStructuralMadasterSummary,dblServiceMadasterSummary,dblSpaceMadasterSummary,dblStuffMadasterSummary } from '../components/ifcComponents/getIfcMaterialInventoryData';
import { dblEpcPhaseData } from '../main';


interface AlpineElement extends HTMLElement {
  __x?: {
    $destroy: () => void;
  };
}
//Assign fuctions to objetcs
export function alpineTemplatesInit(){
  document.addEventListener('alpine:init', () => {
    Alpine.data('dblThermalEnvelopeDynamicFacades', () => dblShowThermalEnvelope({ envelopeType: { dblEnvelopeWalls }, title: 'Building Facades' }));
    Alpine.data('dblThermalEnvelopeDynamicFloors', () => dblShowThermalEnvelope({ envelopeType: { dblEnvelopeFloors }, title: 'Building Floors' }));
    Alpine.data('dblThermalEnvelopeDynamicRoofs', () => dblShowThermalEnvelope({ envelopeType: { dblEnvelopeRoofs }, title: 'Building Roofs' }));
    Alpine.data('dblThermalEnvelopeDynamicWindows', () => dblShowThermalEnvelopeWindows({ envelopeType: { dblEnvelopeWindows }, title: 'Building Windows' }));
    //
    Alpine.data('dblThermalEnvelopeDynamicVertical', () => dblEnvelopeVerticalSummarize({ envelopeData: dblEnvelopeSummaryVertical, title: 'Facade data summary' }));

    Alpine.data('dblSkinMaterial', () => dblShowMaterialInventory({ categories: dblSkinMaterialInventory, mainTitle: 'Skin Layer Material' }));
    Alpine.data('dblStructuralMaterial', () => dblShowMaterialInventory({ categories: dblStructuralMaterialInventory, mainTitle: 'Structural Layer Materials' }));
    Alpine.data('dblServiceMaterial', () => dblShowMaterialInventory({ categories: dblServiceMaterialInventory, mainTitle: 'Service Layer Materials' }));
    Alpine.data('dblSpaceMaterial', () => dblShowMaterialInventory({ categories: dblSpaceMaterialInventory, mainTitle: 'Space Layer Materials' }));
    Alpine.data('dblStuffMaterial', () => dblShowMaterialInventory({ categories: dblStuffMaterialInventory, mainTitle: 'Stuff Layer Materials' }));
    //
    Alpine.data('dblMadasterSummaryStaticSkin',() => dblShowMaterialMadasterSummary({ layerMadasterSummary: dblSkinMadasterSummary, mainTitle: 'Skin Material Summary' }));
    Alpine.data('dblMadasterSummaryStaticStructural',() => dblShowMaterialMadasterSummary({ layerMadasterSummary: dblStructuralMadasterSummary, mainTitle: 'Structural Material Summary'}));
    Alpine.data('dblMadasterSummaryStaticService', () => dblShowMaterialMadasterSummary({ layerMadasterSummary: dblServiceMadasterSummary, mainTitle: 'Service Material Summary' }));
    Alpine.data('dblMadasterSummaryStaticSpace', () => dblShowMaterialMadasterSummary({ layerMadasterSummary: dblSpaceMadasterSummary, mainTitle: 'Space Material Summary' }));
    Alpine.data('dblMadasterSummaryStaticStuff', () => dblShowMaterialMadasterSummary({ layerMadasterSummary: dblStuffMadasterSummary, mainTitle: 'Stuff Material Summary' }));

    Alpine.data('epcData', () => dblShowEpcData({ data: dblEpcPhaseData, mainTitle: 'EPC Infooo' }));
  });

}

// Assign data to templates
export function alpineAsignTemplateData() {
  const thermalEnvelopeDynamicFacades = document.getElementById('alpine-ThermalEnvelope-Dynamic-Facades');
    if (thermalEnvelopeDynamicFacades) {
      thermalEnvelopeDynamicFacades.setAttribute('x-data', 'dblThermalEnvelopeDynamicFacades()');
      thermalEnvelopeDynamicFacades.innerHTML = thermalEnvelopeTemplate;
    }
    const thermalEnvelopeDynamicFloors = document.getElementById('alpine-ThermalEnvelope-Dynamic-Floors');
    if (thermalEnvelopeDynamicFloors) {
      thermalEnvelopeDynamicFloors.setAttribute('x-data', 'dblThermalEnvelopeDynamicFloors()');
      thermalEnvelopeDynamicFloors.innerHTML = thermalEnvelopeTemplate;
    }
    const thermalEnvelopeDynamicRoofs = document.getElementById('alpine-ThermalEnvelope-Dynamic-Roofs');
    if (thermalEnvelopeDynamicRoofs) {
      thermalEnvelopeDynamicRoofs.setAttribute('x-data', 'dblThermalEnvelopeDynamicRoofs()');
      thermalEnvelopeDynamicRoofs.innerHTML = thermalEnvelopeTemplate;
    }
    const thermalEnvelopeDynamicWindows = document.getElementById('alpine-ThermalEnvelope-Dynamic-Windows');
    if(thermalEnvelopeDynamicWindows){
      thermalEnvelopeDynamicWindows.setAttribute('x-data', 'dblThermalEnvelopeDynamicWindows()');
      thermalEnvelopeDynamicWindows.innerHTML = thermalEnvelopeWindowTemplate;
    }

    const thermalEnvelopeStaticVertical = document.getElementById('alpine-ThermalEnvelope-Static-Vertical');
    if (thermalEnvelopeStaticVertical) {
      thermalEnvelopeStaticVertical.setAttribute('x-data', 'dblThermalEnvelopeDynamicVertical()');
      thermalEnvelopeStaticVertical.innerHTML = envelopeVerticalSummaryTemplate;
    }
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //MaterialInventory
    const materialInventoryDynamicSkin = document.getElementById('alpine-MaterialInventory-Dynamic-Skin');
    if (materialInventoryDynamicSkin) {
      materialInventoryDynamicSkin.setAttribute('x-data', 'dblSkinMaterial()');
      materialInventoryDynamicSkin.innerHTML = materialInventoryTemplate;
    }
    const structuralMaterialContainer = document.getElementById('alpine-MaterialInventory-Dynamic-Structural')
    if (structuralMaterialContainer) {
      structuralMaterialContainer.setAttribute('x-data', 'dblStructuralMaterial()');
      structuralMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    const serviceMaterialContainer = document.getElementById('alpine-MaterialInventory-Dynamic-Service')
    if (serviceMaterialContainer) {
      serviceMaterialContainer.setAttribute('x-data', 'dblServiceMaterial()');
      serviceMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    const spaceMaterialContainer = document.getElementById('alpine-MaterialInventory-Dynamic-Space')
    if (spaceMaterialContainer) {
      spaceMaterialContainer.setAttribute('x-data', 'dblSpaceMaterial()');
      spaceMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    const stuffMaterialContainer = document.getElementById('alpine-MaterialInventory-Dynamic-Stuff')
    if (stuffMaterialContainer) {
      stuffMaterialContainer.setAttribute('x-data', 'dblStuffMaterial()');
      stuffMaterialContainer.innerHTML = materialInventoryTemplate;
    }
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const madasterSummaryStaticSkin = document.getElementById('alpine-MadasterSummary-Static-Skin')
    if(madasterSummaryStaticSkin){
      madasterSummaryStaticSkin.setAttribute('x-data', 'dblMadasterSummaryStaticSkin()');
      madasterSummaryStaticSkin.innerHTML = materialMadasterSummaryTemplate;
    }
    const madasterSummaryStaticStructural = document.getElementById('alpine-MadasterSummary-Static-Structural')
    if(madasterSummaryStaticStructural){
      madasterSummaryStaticStructural.setAttribute('x-data', 'dblMadasterSummaryStaticStructural()');
      madasterSummaryStaticStructural.innerHTML = materialMadasterSummaryTemplate;
    }
    const madasterSummaryStaticService = document.getElementById('alpine-MadasterSummary-Static-Service')
    if(madasterSummaryStaticService){
      madasterSummaryStaticService.setAttribute('x-data', 'dblMadasterSummaryStaticService()');
      madasterSummaryStaticService.innerHTML = materialMadasterSummaryTemplate;
    }
    const madasterSummaryStaticSpace = document.getElementById('alpine-MadasterSummary-Static-Space')
    if(madasterSummaryStaticSpace){
      madasterSummaryStaticSpace.setAttribute('x-data', 'dblMadasterSummaryStaticSpace()');
      madasterSummaryStaticSpace.innerHTML = materialMadasterSummaryTemplate;
    }
    const madasterSummaryStaticStuff = document.getElementById('alpine-MadasterSummary-Static-Stuff')
    if(madasterSummaryStaticStuff){
      madasterSummaryStaticStuff.setAttribute('x-data', 'dblMadasterSummaryStaticStuff()');
      madasterSummaryStaticStuff.innerHTML = materialMadasterSummaryTemplate;
    }
    //epcDATA
    const epcContainer = document.getElementById('alpine-epcPhaseData');
    if (epcContainer) {
      epcContainer.setAttribute('x-data', 'epcData()');
      epcContainer.innerHTML = epcDataTemplate;
    }
}


// Clear Alpine containers
export function alpineClearComponents() {
  const containers = [
    'alpine-ThermalEnvelope-Dynamic-Facades',
    'alpine-ThermalEnvelope-Dynamic-Floors',
    'alpine-ThermalEnvelope-Dynamic-Roofs',
    'alpine-ThermalEnvelope-Dynamic-Windows',
    //
    'alpine-ThermalEnvelope-Static-Vertical',
    //
    'alpine-MadasterSummary-Static-Skin',
    'alpine-MadasterSummary-Static-Structural',
    'alpine-MadasterSummary-Static-Service',
    'alpine-MadasterSummary-Static-Space',
    'alpine-MadasterSummary-Static-Stuff',
    //
    'alpine-MaterialInventory-Dynamic-Skin',
    'alpine-MaterialInventory-Dynamic-Structural',
    'alpine-MaterialInventory-Dynamic-Service',
    'alpine-MaterialInventory-Dynamic-Space',
    'alpine-MaterialInventory-Dynamic-Stuff',
    //
    'alpine-epcPhaseData'
  ];

  containers.forEach(containerId => {
    const container = document.getElementById(containerId) as AlpineElement; 
    if (container) {
      if (container.__x) {
        container.__x.$destroy(); 
      }
      container.removeAttribute('x-data');
      container.innerHTML = ''; 
    }
  });
}

