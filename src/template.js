//temporary
// export function dblEnvData({ dataSets, title}) {
//     return {
//         dataSets: dataSets,
//         openAll: false,
//         openLevels: {},
//         openEnvelopes: {},
//         title: title,

//         toggleAllEnvelopes() {
//             this.openAll = !this.openAll;
//         },
//         isAllEnvelopesOpen() {
//             return this.openAll;
//         },
//         toggleLevel(levelKey) {
//             if (this.openLevels[levelKey] === undefined) {
//                 this.openLevels[levelKey] = true;
//             } else {
//                 this.openLevels[levelKey] = !this.openLevels[levelKey];
//             }
//         },
//         isLevelOpen(levelKey) {
//             return this.openLevels[levelKey] || false;
//         },
//         toggleEnvelope(envelope) {
//             const envelopeCode = envelope.dblEnvelopeCode;
//             if (this.openEnvelopes[envelopeCode] === undefined) {
//                 this.openEnvelopes[envelopeCode] = true;
//             } else {
//                 this.openEnvelopes[envelopeCode] = !this.openEnvelopes[envelopeCode];
//             }
//         },
//         isEnvelopeOpen(envelope) {
//             const envelopeCode = envelope.dblEnvelopeCode;
//             return this.openEnvelopes[envelopeCode] || false;
//         }
//     };
// }
export function dblEnvData({ dataSets, title }) {
    return {
        dataSets: dataSets,
        openAll: false,
        openLevels: {},
        openEnvelopes: {},
        title: title,

        toggleAllEnvelopes() {
            this.openAll = !this.openAll;
        },
        isAllEnvelopesOpen() {
            return this.openAll;
        },
        toggleLevel(levelKey) {
            if (this.openLevels[levelKey] === undefined) {
                this.openLevels[levelKey] = true;
            } else {
                this.openLevels[levelKey] = !this.openLevels[levelKey];
            }
        },
        isLevelOpen(levelKey) {
            return this.openLevels[levelKey] || false;
        },
        toggleEnvelope(envelope) {
            const envelopeCode = envelope.dblEnvelopeCode;
            if (this.openEnvelopes[envelopeCode] === undefined) {
                this.openEnvelopes[envelopeCode] = true;
            } else {
                this.openEnvelopes[envelopeCode] = !this.openEnvelopes[envelopeCode];
            }
        },
        isEnvelopeOpen(envelope) {
            const envelopeCode = envelope.dblEnvelopeCode;
            return this.openEnvelopes[envelopeCode] || false;
        },
    };
}

export const thermalEnvelopeTemplate = `
    <h2 @click="toggleAllEnvelopes" style="cursor: pointer;" :class="{'dbl-tableEnvelopeType': true}">
        <span x-text="title"></span>
        <span :class="{'arrow': true, 'down': isAllEnvelopesOpen()}">▶</span>
    </h2>
    <div x-show="isAllEnvelopesOpen()">
        <template x-for="(data, dataSetKey) in dataSets" :key="dataSetKey">
            <div>
                <template x-for="(envelopes, levelKey) in data" :key="levelKey">
                    <div>
                        <h2 @click="toggleLevel(levelKey)" style="cursor: pointer;" :class="{'dbl-table-Level': true}">
                            <span x-text="'Level: ' + levelKey" :class="{'dbl-table-LevelText': true}"></span>
                            <span :class="{'arrow': true, 'down': isLevelOpen(levelKey),'dbl-table-LevelArrow' : true}">▶ </span>
                        </h2>
                        <div x-show="isLevelOpen(levelKey)" style="margin-left: 20px;">
                            <template x-for="(envelope, index) in envelopes" :key="index">
                                <div x-data="{ isOpen: isEnvelopeOpen(envelope), showComponents: false }" :class="{'dbl-table-EnvelopeContainer':true}">
                                    <h4 @click="toggleEnvelope(envelope); isOpen = !isOpen" style="cursor: pointer;" :class="{'dbl-table-Envelope':true}">
                                        <span x-text="'Envelope: ' + envelope.dblEnvelopeCode" :class="{'dbl-table-EnvelopeText':true}"></span>
                                        <span :class="{'arrow': true, 'down': isOpen,'dbl-table-EnvelopeArrow' : true}">▶</span>
                                        <button class="dbl-fragment-map-button"
                                            style=" vertical-align: middle; margin-left: 10px; background: none; border: none;"
                                            :data-envelope-code="envelope.dblEnvelopeCode"
                                            :data-dataset-name="dataSetKey"
                                            :data-level-key="levelKey"
                                            @click="isOpen = !isOpen">
                                        <span class="fragment-inspector" style="font-size: 18px; color: #000;">🔍</span> <!-- Lupa como icono -->
                                    </button>
                                    </h4>
                                    
                                    <div x-show="isOpen" style="margin-left: 20px;">
                                        <table border="1" :class="{'dbl-tableEnvelope-table': true}">
                                            <thead>
                                                <tr>
                                                    <th>Atributo</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>EnvelopeCode</td>
                                                    <td x-text="envelope.dblEnvelopeCode"></td>
                                                </tr>
                                                <tr>
                                                    <td>EnvelopeType</td>
                                                    <td x-text="envelope.dblEnvelopeType"></td>
                                                </tr>
                                                <tr>
                                                    <td>EnvelopeUvalue</td>
                                                    <td x-text="envelope.dblEnvelopeUvalue"></td>
                                                </tr>
                                                <tr>
                                                    <td>EnvelopeWidth</td>
                                                    <td x-text="envelope.dblEnvelopeWidth"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style="margin-top: 20px;" :class={'dbl-tableComponentContainer':true}>
                                            <h4 @click="showComponents = !showComponents" style="cursor: pointer;" :class="{'dbl-tableComponentText':true}">
                                                Envelope Components
                                                <span :class="{'arrow': true, 'down': showComponents}">+</span>
                                            </h4>
                                            <div x-show="showComponents" style="margin-left: 20px;"  >
                                                <table border="1" :class="{'dbl-tableComponent-table': true}">
                                                    <thead>
                                                        <tr>
                                                            <th :class ="{'dbl-tableComponent-tableColumn1':true}">ComponentType</th>
                                                            <th>Rvalue</th>
                                                            <th>NetArea</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template x-for="component in envelope.dblEnvelopeComponents" :key="component.dblComponentExpressId">
                                                            <tr>
                                                                <td x-text="component.dblComponentType" :class ="{'dbl-tableComponent-tableColumn1':true}"></td>
                                                                <td x-text="component.dblComponentRvalue"></td>
                                                                <td x-text="component.dblComponentNetArea"></td>
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>`;

//:::::::::::::::::::::::::::::::::::::
export const envelopeVerticalSummaryTemplate = `
    <div>
        <h3 x-text="title"></h3>
        <template x-for="(item, key) in envelopeData" :key="key">
            <div class="subcategory-section">
                <h4 class="subcategory-section-title" x-text="item.dblVerticalEnvelopeSummaryOrientation + ' Facade'"></h4>
                <div style="display: flex;">
                    <div style="flex: 1;">
                        <img src="path_to_image" alt="Image">
                    </div>
                    <div style="flex: 1;">
                        <table border="1">
                            <tr>
                                <td>Facade Gross Area:</td>
                                <td x-text="item.dblWallEnvelopeSummaryGrossAreaSum"></td>
                            </tr>
                            <tr>
                                <td>Window Area:</td>
                                <td x-text="item.dblWindowEnvelopeSummaryNetAreaSum"></td>
                            </tr>
                            <tr>
                                <td>Window to Wall Ratio:</td>
                                <td x-text="item.dblWindowToWallRatio"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </template>
    </div>
`;
export function dblEnvelopeVerticalSummarize({ envelopeData, title }) {
    return {
        envelopeData: envelopeData,
        title: title,
        toggleDetails(key) {
            this.envelopeData[key].expanded = !this.envelopeData[key].expanded;
        },
        isDetailsOpen(key) {
            return this.envelopeData[key].expanded;
        }
    };
}
//:::::::::::::::::::::::::::::://
export function dblMaterialData({ categories, mainTitle }) {
    // Inicialización del estado de expansión y otros estados necesarios
    categories.forEach(category => {
        if (category.dblMaterialArray) {
            category.dblMaterialArray.forEach(material => {
                material.expanded = false;  // Estado de expansión para cada material
            });
        }
        category.expanded = false;  // Estado de expansión para cada categoría
    });

    return {
        categories: categories,
        mainTitle: mainTitle,
        isAllMaterialsOpen: false,

        toggleAllMaterials() {
            this.isAllMaterialsOpen = !this.isAllMaterialsOpen;
        },

        toggleCategory(categoryIndex) {
            this.categories[categoryIndex].expanded = !this.categories[categoryIndex].expanded;
        },

        isCategoryOpen(categoryIndex) {
            return this.categories[categoryIndex].expanded;
        },

        toggleMaterial(categoryIndex, materialIndex) {
            this.categories[categoryIndex].dblMaterialArray[materialIndex].expanded = !this.categories[categoryIndex].dblMaterialArray[materialIndex].expanded;
        },

        isMaterialOpen(categoryIndex, materialIndex) {
            return this.categories[categoryIndex].dblMaterialArray[materialIndex].expanded;
        }
    };
}
export const materialInventoryTemplate = `
    <div>
        <h2 @click="toggleAllMaterials" style="cursor: pointer;">
            <span x-text="mainTitle"></span>
            <span :class="{'arrow': true, 'down': isAllMaterialsOpen}">▶</span>
        </h2>
        <div x-show="isAllMaterialsOpen">
            <table border="1">
                <thead>
                    <tr>
                        <th>UniclassName</th>
                        <th>UniclassCode</th>
                        <th>MassDensity</th>
                        <th>WasteCategory</th>
                        <th>NetVolumeSum</th>
                        <th>WeightSum</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template x-for="(category, categoryIndex) in categories" :key="categoryIndex">
                        <tr>
                            <td x-text="category.dblMaterialCategoryUniclassName || 'undefined'"></td>
                            <td x-text="category.dblMaterialCategoryUniclassCode || 'undefined'"></td>
                            <td x-text="category.dblMaterialCategoryMassDensity || 'undefined'"></td>
                            <td x-text="category.dblMaterialCategoryWasteCategory || 'undefined'"></td>
                            <td x-text="category.dblMaterialNetVolumeSum || 'undefined'"></td>
                            <td x-text="category.dblMaterialWeightSum || 'undefined'"></td>
                            <td>
                                <span @click="toggleCategory(categoryIndex)" style="cursor: pointer;">
                                    <span :class="{'arrow': true, 'down': isCategoryOpen(categoryIndex)}">▶</span>
                                </span>
                            </td>
                        </tr>
                        <tr x-show="isCategoryOpen(categoryIndex)">
                            <td :colspan="7">
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>Material Name</th>
                                            <th>Fraction</th>
                                            <th>Uniclass Code</th>
                                            <th>Uniclass Name</th>
                                            <th>Waste Category</th>
                                            <th>Thermal Conductivity</th>
                                            <th>Density</th>
                                            <th>Net Volume</th>
                                            <th>Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template x-for="(material, materialIndex) in category.dblMaterialArray" :key="materialIndex">
                                            <tr>
                                                <td x-text="material.dblMaterialName || 'undefined'"></td>
                                                <td x-text="material.dblMaterialFraction || 'undefined'"></td>
                                                <td x-text="material.dblMaterialUniclassCode || 'undefined'"></td>
                                                <td x-text="material.dblMaterialUniclassName || 'undefined'"></td>
                                                <td x-text="material.dblMaterialWasteCategory || 'undefined'"></td>
                                                <td x-text="material.dblMaterialThermalConductivity || 'undefined'"></td>
                                                <td x-text="material.dblMaterialDensity || 'undefined'"></td>
                                                <td x-text="material.dblMaterialNetVolume || 'undefined'"></td>
                                                <td x-text="material.dblMaterialWeight || 'undefined'"></td>
                                                <td>
                                                    <span @click="toggleMaterial(categoryIndex, materialIndex)" style="cursor: pointer;">
                                                        <span :class="{'arrow': true, 'down': isMaterialOpen(categoryIndex, materialIndex)}">▶</span>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr x-show="isMaterialOpen(categoryIndex, materialIndex)">
                                                <td colspan="9">
                                                    <!-- Aquí puedes agregar detalles adicionales o acciones para cada material -->
                                                </td>
                                            </tr>
                                        </template>
                                        <!-- Si no hay materiales en dblMaterialArray -->
                                        <template x-if="category.dblMaterialArray.length === 0">
                                            <tr>
                                                <td colspan="9">No materials available</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
`;

export function initializeEpcData({ data, mainTitle }) {
    return {
        data,
        mainTitle,
        getSafeData(data) {
            return data !== undefined ? data : "No Data";
        },
        get dblEpcPhaseData() {
            return data || {};
        },
        get scope() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.scope);
        },
        get normative() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.normative);
        },
        get startDate() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.startDate);
        },
        get endDate() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.endDate);
        },
        get epcProcedure() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.epcProcedure);
        },
        get certificateId() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.certificateId);
        },
        get certificateUrl() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.epcCertificateUrl);
        },
        get buildingCerticateUrl() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcDynamic?.epcBuildingUrl);
        },
        get emissionsEnergyRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsEnergyRating);
        },
        get emissionsEnergyYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsEnergyYearArea);
        },
        get emissionsDhwRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsDhwRating);
        },
        get emissionsDhwYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsDhwYearArea);
        },
        get emissionsHeatingRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsHeatingRating);
        },
        get emissionsHeatingYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEmissionsCO2?.emissionsHeatingYearArea);
        },
        get nonRenEnergyConsumptionRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenEnergyConsumptionRating);
        },
        get nonRenEnergyConsumptionYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenEnergyConsumptionYearArea);
        },
        get nonRenDhwEnergyComsumptionRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenDhwEnergyComsumptionRating);
        },
        get nonRenDhwEnergyConsumptionYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenDhwEnergyConsumptionYearArea);
        },
        get nonRenHeatingEnergyConsumptionRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenHeatingEnergyConsumptionRating);
        },
        get nonRenHeatingEnergyConsumptionYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcNonRenEnergyConsumption?.nonRenHeatingEnergyConsumptionYearArea);
        },
        get energyDemandHeatingRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEnergyDemand?.energyDemandHeatingRating);
        },
        get energyDemandHeatingYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEnergyDemand?.energyDemandHeatingYearArea);
        },
        get energyDemandDhwRating() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEnergyDemand?.energyDemandDhwRating);
        },
        get energyDemandDhwYearArea() {
            return this.getSafeData(this.dblEpcPhaseData.dblEpcEnergyDemand?.energyDemandDhwYearArea);
        }
    };
}
export const epcDataTemplate = `
    <div>
        <!-- Section for dblEpcDynamic -->
        <div x-bind:class="{ 'subcategory-section': true }">
            <h2 x-bind:class="{ 'subcategory-section-title': true }"> Energy Performance information</h2>
            <div class="grid">
                <div class="row">
                    <div class="cell">Scope: <span x-text="scope"></span></div>
                    <div class="cell">Normative: <span x-text="normative"></span></div>
                </div>
                <div class="row">
                    <div class="cell">EPC Start date: <span x-text="startDate"></span></div>
                    <div class="cell">EPC End date: <span x-text="endDate"></span></div>
                </div>
                <div class="row">
                    <div class="cell">EPC Procedure: <span x-text="epcProcedure"></span></div>
                    <div class="cell">Certificate ID: <span x-text="certificateId"></span></div>
                </div>
                <div class="row">
                    <div class="cell">
                        Certificate URL: 
                        <a :href="certificateUrl" x-text="certificateUrl"></a>
                    </div>
                    <div class="cell">
                        Building URL: 
                        <a :href="buildingCerticateUrl" x-text="buildingCerticateUrl"></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Section for dblEpcEmissionsCO2 -->
        <div x-bind:class="{ 'subcategory-section': true }">
            <h2 x-bind:class="{ 'subcategory-section-title': true }">CO2 emissions</h2>
            <table>
                <tr>
                    <td>Operational energy emissions:</td>
                    <td x-text="emissionsEnergyYearArea + ' [kg CO2/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + emissionsEnergyRating + '.png'" alt="No label"></td>
                </tr>
                <tr>
                    <td>Domestic Hot Water emissions:</td>
                    <td x-text="emissionsDhwYearArea + ' [kg CO2/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + emissionsDhwRating + '.png'" alt="No label"></td>
                </tr>
                <tr>
                    <td>Heating emissions:</td>
                    <td x-text="emissionsHeatingYearArea + ' [kg CO2/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + emissionsHeatingRating + '.png'" alt="No label"></td>
                </tr>
            </table>
        </div>
        <!-- Section for dblEpcNonRenEnergyConsumption -->
        <div x-bind:class="{ 'subcategory-section': true }">
            <h2 x-bind:class="{ 'subcategory-section-title': true }">Non Renewable energy consumption</h2>
            <table>
                <tr>
                    <td>Non renewable general energy consumption:</td>
                    <td x-text="nonRenEnergyConsumptionYearArea + ' [kWh/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + nonRenEnergyConsumptionRating + '.png'" alt="No label"></td>
                </tr>
                <tr>
                    <td>Non renewable DMH energy consumption:</td>
                    <td x-text="nonRenDhwEnergyConsumptionYearArea + ' [kWh/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + nonRenDhwEnergyComsumptionRating + '.png'" alt="No label"></td>
                    
                    
                </tr>
                <tr>
                    <td>Non renewable Heating energy consumption:</td>
                    <td x-text="nonRenHeatingEnergyConsumptionYearArea + ' [kWh/m2 year]'"></td>
                    <td><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + nonRenHeatingEnergyConsumptionRating + '.png'" alt="No label"></td>
                    
                    
                </tr>
            </table>
        </div>
        <!-- Section for dblEpcEnergyDemand -->
        <div x-bind:class="{ 'subcategory-section': true }">
            <h2 x-bind:class="{ 'subcategory-section-title': true }">Energy demand</h2>
            <table>
                <tr>
                    <td>Heating demand:</td>
                    <td x-text="energyDemandHeatingYearArea + ' [kWh/m2 year]'"></td>
                    <td class="td-img"><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + energyDemandHeatingRating + '.png'" alt="No label"></td>
                </tr>
                <tr>
                    <td>DHW demand:</td>
                    <td x-text="energyDemandDhwYearArea + ' [kWh/m2 year]'"></td>
                    <td class="td-img"><img class="dbl-img-performance-epc" x-bind:src="'../assets/images/dbl-images/dbl-performance-epc/epcLabel-' + energyDemandDhwRating + '.png'" alt="No label"></td>
                </tr>
            </table>
        </div>
    </div>
`;
// export const epcDataTemplate = `
//     <div>
//         <!-- Section for dblEpcDynamic -->
//         <div x-bind:class="{ 'subcategory-section': true }">
//             <h2 x-bind:class="{ 'subcategory-section-title': true }"> Energy Performance information</h2>
//             <div class="grid">
//                 <div class="row">
//                     <div class="cell">Scope: <span x-text="scope"></span></div>
//                     <div class="cell">Normative: <span x-text="normative"></span></div>
//                 </div>
//                 <div class="row">
//                     <div class="cell">EPC Start date: <span x-text="startDate"></span></div>
//                     <div class="cell">EPC End date: <span x-text="endDate"></span></div>
//                 </div>
//                 <div class="row">
//                     <div class="cell">EPC Procedure: <span x-text="epcProcedure"></span></div>
//                     <div class="cell">Certificate ID: <span x-text="certificateId"></span></div>
//                 </div>
//                 <div class="row">
//                     <div class="cell">
//                         Certificate URL: 
//                         <a :href="certificateUrl" x-text="certificateUrl"></a>
//                     </div>
//                     <div class="cell">
//                         Building URL: 
//                         <a :href="buildingCerticateUrl" x-text="buildingCerticateUrl"></a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <!-- Section for dblEpcEmissionsCO2 -->
//         <div x-bind:class="{ 'subcategory-section': true }">
//             <h2 x-bind:class="{ 'subcategory-section-title': true }">CO2 emissions</h2>
//             <table>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Emisiones Energéticas CO2"></td>
//                     <td>Operational energy emissions:</td>
//                     <td x-text="emissionsEnergyRating"></td>
//                     <td x-text="emissionsEnergyYearArea"></td>
//                 </tr>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Emisiones DHW CO2"></td>
//                     <td>Domestic Hot Water emissions:</td>
//                     <td x-text="emissionsDhwRating"></td>
//                     <td x-text="emissionsDhwYearArea"></td>
                    
//                 </tr>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Emisiones de Calefacción CO2"></td>
//                     <td>Heating emissions:</td>
//                     <td x-text="emissionsHeatingRating"></td>
//                     <td x-text="emissionsHeatingYearArea"></td>
                    
//                 </tr>
//             </table>
//         </div>
//         <!-- Section for dblEpcNonRenEnergyConsumption -->
//         <div x-bind:class="{ 'subcategory-section': true }">
//             <h2 x-bind:class="{ 'subcategory-section-title': true }">Non Renewable energy consumption</h2>
//             <table>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Consumo Energético No Renovable"></td>
//                     <td>Non renewable general energy consumption:</td>
//                     <td x-text="nonRenEnergyConsumptionRating"></td>
//                     <td x-text="nonRenEnergyConsumptionYearArea"></td>
                    
//                 </tr>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Consumo DHW No Renovable"></td>
//                     <td>Non renewable DMH energy consumption:</td>
//                     <td x-text="nonRenDhwEnergyComsumptionRating"></td>
//                     <td x-text="nonRenDhwEnergyConsumptionYearArea"></td>
                    
//                 </tr>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Consumo de Calefacción No Renovable"></td>
//                     <td>Non renewable Heating energy consumption:</td>
//                     <td x-text="nonRenHeatingEnergyConsumptionRating"></td>
//                     <td x-text="nonRenHeatingEnergyConsumptionYearArea"></td>
                    
//                 </tr>
//             </table>
//         </div>
//         <!-- Section for dblEpcEnergyDemand -->
//         <div x-bind:class="{ 'subcategory-section': true }">
//             <h2 x-bind:class="{ 'subcategory-section-title': true }">Energy demand</h2>
//             <table>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Demanda de Calefacción"></td>
//                     <td>Heating demand:</td>
//                     <td x-text="energyDemandHeatingRating"></td>
//                     <td x-text="energyDemandHeatingYearArea"></td>
                    
//                 </tr>
//                 <tr>
//                     <td><img src="../assets/images/dbl-images/dbl-performance-epc/epcLabel-A.png" alt="Demanda de DHW"></td>
//                     <td>DHW demand:</td>
//                     <td x-text="energyDemandDhwRating"></td>
//                     <td x-text="energyDemandDhwYearArea"></td>
                    
//                 </tr>
//             </table>
//         </div>
//     </div>
// `;

// export const epcPhaseDataTemplate = `
//     <div x-data="epcPhaseDataLogic({ epcPhaseData })">
//         <div x-if="epcPhaseData">
//             <div>
//                 <h2 @click="toggleSection('dblEpcDynamic')" style="cursor: pointer;">Dynamic Information <span style="float: right;">▶</span></h2>
//                 <table x-show="isSectionOpen('dblEpcDynamic')">
//                     <tr>
//                         <td><strong>Scope:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.scope : ''"></td>
//                         <td><strong>Normative:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.certificateId : ''"></td>
//                     </tr>
//                     <tr>
//                         <td><strong>Start Date:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.startDate : ''"></td>
//                         <td><strong>End Date:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.endDate : ''"></td>
//                     </tr>
//                     <tr>
//                         <td><strong>EPC Procedure:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.epcProcedure : ''"></td>
//                         <td><strong>Certificate Id:</strong></td>
//                         <td x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.certificateId : ''"></td>
//                     </tr>
//                     <tr>
//                         <td><strong>Certificate URL:</strong></td>
//                         <td><a x-bind:href="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.certificateUrl : ''" target="_blank" x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.certificateUrl : ''"></a></td>
//                         <td><strong>Building Certificate URL:</strong></td>
//                         <td><a x-bind:href="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.buildingCertificateUrl : ''" target="_blank" x-text="epcPhaseData.dblEpcDynamic ? epcPhaseData.dblEpcDynamic.buildingCertificateUrl : ''"></a></td>
//                     </tr>
//                 </table>
//             </div>

//             <!-- Otros bloques de información similar para otras secciones -->
//         </div>

//         <div x-if="!epcPhaseData">
//             <p>Los datos de epcPhaseData no están definidos aún.</p>
//             <!-- Puedes manejar esto de acuerdo a tu requerimiento -->
//         </div>
//     </div>
// `;