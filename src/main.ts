import Alpine, { remove } from 'alpinejs';
import * as AlpineConfig from "./templates/alpineConfig.js"
import { loadIfcAsFragments,getFragmentMapInfo,clearHighlighterOnOutsideClick } from "./ifc.js"
import { projectPhasesArray } from "./static/modelPhases.js";
import { UndefinedDblEpc } from './components/epcComponents/epcInterface.js';
import { certificates } from './static/energyPerformanceCertificate.js';
import { dblEpcData, transformCertificateData } from './components/epcComponents/getEpcData.js';


let alpineInitialized = false;
export let dblEpcPhaseData: UndefinedDblEpc = {}
const phasesBtns = document.querySelectorAll('.project-phase')

phasesBtns.forEach(button => {
  button.addEventListener("click", ifcLoadEvent)
});

function findEpcPhaseData(epcStartDate) {
  return dblEpcData.find(certificate => {
    console.log("Epc data 2",certificate)
    return certificate.dblEpcDynamic !== undefined && certificate.dblEpcDynamic.startDate === epcStartDate;
    
  });
}

function initializeAlpine(){
  if(alpineInitialized){
    AlpineConfig.alpineClearComponents()}
    AlpineConfig.alpineTemplatesInit()
    AlpineConfig.alpineAsignTemplateData()
    if (!alpineInitialized) {
      Alpine.start(); 
      alpineInitialized = true; 
      getFragmentMapInfo()
      clearHighlighterOnOutsideClick()
    }
}


function createLoadingMenu() {
  // Crear el menú de carga
  const loadingMenu = document.createElement('div');
  loadingMenu.id = 'loadingMenu';
  loadingMenu.style.position = 'fixed';
  loadingMenu.style.top = '50%';
  loadingMenu.style.left = '50%';
  loadingMenu.style.transform = 'translate(-50%, -50%)';
  loadingMenu.style.zIndex = '9999'; // Asegura que esté por encima de otros elementos
  loadingMenu.style.textAlign = 'center';

  const loadingImage = document.createElement('img');
  loadingImage.src = '../assets/images/logos/dblLogo.png';
  loadingImage.alt = 'Loading';
  loadingImage.style.width = '100px';
  loadingImage.style.height = '100px';
  loadingImage.style.animation = 'spin 2s linear infinite';
  loadingImage.style.objectFit = 'contain'; // Asegura que la imagen mantenga sus proporciones

  const loadingText = document.createElement('div');
  loadingText.id = 'loadingText';
  loadingText.textContent = 'Project loading';

  loadingMenu.appendChild(loadingImage);
  loadingMenu.appendChild(loadingText);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  let dots = 0;
  let intervalId: number | null = null;

  return {
    show: () => {
      document.body.appendChild(loadingMenu);
      intervalId = setInterval(() => {
        dots = (dots + 1) % 4;
        loadingText.textContent = 'Project loading' + '.'.repeat(dots);
      }, 500);
    },
    hide: () => {
      if (loadingMenu.parentNode) {
        document.body.removeChild(loadingMenu);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
  };
}

// Crear la instancia del menú de carga
const loadingMenu = createLoadingMenu();

async function ifcLoadEvent(event) {
  const buttonId = event.target.id;
  const phase = projectPhasesArray.find(phase => phase.id === parseInt(buttonId));
  
  if (!phase) {
    console.log("Phase not found");
    return;
  }

  try {
    const ifcModel = phase.ifcModel;
    console.log(phase);

    // Mostrar el menú de carga
    loadingMenu.show();

    // Ejecutar la función de carga
    await loadIfcAsFragments(ifcModel);

    // Aquí puedes realizar otras operaciones si es necesario
    transformCertificateData(certificates);

    const epcStartDate = phase.epcStartDate;
    dblEpcPhaseData = findEpcPhaseData(epcStartDate);

    if (dblEpcPhaseData !== undefined) {
      console.log("Datos de epcPhaseData encontrados:", dblEpcPhaseData);
    } else {
      console.log("Datos de epcPhaseData no encontrados.");
    }

    initializeAlpine();
  } catch (error) {
    console.error("Error loading IFC", error);
  } finally {
    // Ocultar el menú de carga
    loadingMenu.hide();
  }
}

