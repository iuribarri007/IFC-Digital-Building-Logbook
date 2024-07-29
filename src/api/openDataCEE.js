const API_BASE_URL = 'https://api.euskadi.eus/energy-efficiency';
const validEnergyCertificates = [];  

// Auxiliar function to get the closest date to present date
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
// Auxiliar function to filter the certificates in case of duplicates
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

  const validEnergyCertificates = Object.values(tempResult);

  return validEnergyCertificates;
}
// Get the certificates from Open Data Euskadi
export async function getCertificates(county, municipality, street, portal, currentPage = 1, itemsPerPage = 10) {
  const endpoint = `buildings/counties/${county}/municipalities/${municipality}?street=${encodeURIComponent(street)}&portal=${encodeURIComponent(portal)}&currentPage=${currentPage}&itemsOfPage=${itemsPerPage}`;
  
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let building = undefined 
    const data = await response.json();
    //console.log(data)
    data.features.forEach((feature)=>{
        if(feature.properties.location.portal == portal.toString()){
            building = feature
        }
    })
    if(building !== undefined ){
      let certificates= []
      const energyCertificateArray = building.properties._links.certificates.buildings
      for (let energyCertificate of energyCertificateArray){
        const certificateLink = energyCertificate.href
        try{const certificateResponse = await fetch(certificateLink)
          const certificateData = await certificateResponse.json();
          certificates.push(certificateData)}
        catch{console.log("No certificate found")}
      }
      const validEnergyCertificates = getUniqueObjectsWithClosestStartDate(certificates);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
