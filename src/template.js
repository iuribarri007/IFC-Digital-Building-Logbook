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