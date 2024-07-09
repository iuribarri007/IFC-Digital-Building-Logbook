const API_BASE_URL = 'https://api.euskadi.eus/energy-efficiency';
const validEnergyCertificates = [];  

// Función principal para obtener los resultados deseados
function findClosestStartDate(items) {
  const today = new Date();
  let minDiff = Infinity;
  let closestItem = null;

  items.forEach(function(item) {
      const startDate = new Date(item.startDate);
      const diff = Math.abs(startDate - today);
      
      if (diff < minDiff) {
          minDiff = diff;
          closestItem = item;
      }
  });

  return closestItem;
}
function getUniqueObjectsWithClosestStartDate(certificateData) {
  // Objeto para almacenar temporalmente los objetos con la fecha más cercana por cada 'scope'
  const tempResult = {};

  certificateData.forEach(function(item) {
      const scope = item.scope;
      const startDate = new Date(item.startDate);

      // Si aún no tenemos un objeto para este 'scope' o si este es más cercano, lo actualizamos
      if (!tempResult[scope] || startDate > new Date(tempResult[scope].startDate)) {
          tempResult[scope] = item;
      }
  });

  // Convertir el objeto temporal en un array de resultados válidos
  const validEnergyCertificates = Object.values(tempResult);

  return validEnergyCertificates;
}
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export async function getCertificates(county, municipality, street, portal, currentPage = 1, itemsPerPage = 10) {
  const endpoint = `buildings/counties/${county}/municipalities/${municipality}?street=${encodeURIComponent(street)}&portal=${encodeURIComponent(portal)}&currentPage=${currentPage}&itemsOfPage=${itemsPerPage}`;
  
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    //console.log(response)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let building = undefined 
    const data = await response.json();
    console.log(data)
    data.features.forEach((feature)=>{
        if(feature.properties.location.portal == portal.toString()){
            building = feature
        }
    })
    if(building !== undefined ){
      let certificates= []
      //console.log(building)
      const energyCertificateArray = building.properties._links.certificates.buildings
      for (let energyCertificate of energyCertificateArray){
        console.log(energyCertificate)
        const certificateLink = energyCertificate.href
        try{const certificateResponse = await fetch(certificateLink)
          const certificateData = await certificateResponse.json();
          console.log(certificateData)
          certificates.push(certificateData)}
        catch{console.log("El certificado no carga")}
      }
      const validEnergyCertificates = getUniqueObjectsWithClosestStartDate(certificates);
      console.log(validEnergyCertificates)
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
