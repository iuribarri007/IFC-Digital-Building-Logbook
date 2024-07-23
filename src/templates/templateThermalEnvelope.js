export function dblShowThermalEnvelope({ envelopeType, title }) {
    return {
        envelopeType: envelopeType,
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

// export const thermalEnvelopeTemplate = `
//     <h2 @click="toggleAllEnvelopes" style="cursor: pointer;" :class="{'dbl-tableElementType': true}">
//         <span x-text="title"></span>
//         <span :class="{'arrow': true, 'down': isAllEnvelopesOpen()}">▶</span>
//     </h2>
//     <div x-show="isAllEnvelopesOpen()">
//         <template x-for="(data, dataSetKey) in envelopeType" :key="dataSetKey">
//             <div>
//                 <template x-for="(envelopes, levelKey) in data" :key="levelKey">
//                     <div>
//                         <h2 @click="toggleLevel(levelKey)" style="cursor: pointer;" :class="{'dbl-table-Level': true}">
//                             <span x-text="'Level: ' + levelKey" :class="{'dbl-table-LevelText': true}"></span>
//                             <span :class="{'arrow': true, 'down': isLevelOpen(levelKey),'dbl-table-LevelArrow' : true}">▶ </span>
//                         </h2>
//                         <div x-show="isLevelOpen(levelKey)" style="margin-left: 20px;">
//                             <template x-for="(envelope, index) in envelopes" :key="index">
//                                 <div x-data="{ isOpen: isEnvelopeOpen(envelope), showComponents: false }" :class="{'dbl-table-ElementContainer': true}">
//                                     <h4 @click="toggleEnvelope(envelope); isOpen = !isOpen" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;" :class="{'dbl-table-Envelope': true}">
//                                         <span x-text="'Envelope: ' + envelope.dblEnvelopeCode" :class="{'dbl-table-EnvelopeText': true}"></span>
//                                         <div style="display: flex; align-items: center;">
//                                             <button class="dbl-fragment-map-button"
//                                                 style="background: none; border: none; margin-left: 10px;"
//                                                 :data-envelope-code="envelope.dblEnvelopeCode"
//                                                 :data-dataset-name="dataSetKey"
//                                                 :data-level-key="levelKey"
//                                                 @click.stop>
//                                                 <span class="fragment-inspector" style="font-size: 18px; color: #000;">🔍</span> <!-- Lupa como icono -->
//                                             </button>
//                                             <span :class="{'arrow': true, 'down': isOpen, 'dbl-table-EnvelopeArrow': true}" style="margin-left: 10px;">▶</span>
//                                         </div>
//                                     </h4>
                                    
//                                     <div x-show="isOpen" style="margin-left: 20px;">
//                                         <table border="1" :class="{'dbl-tableEnvelope-table': true}">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Atributo</th>
//                                                     <th>Valor</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     <td>EnvelopeCode</td>
//                                                     <td x-text="envelope.dblEnvelopeCode"></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>EnvelopeType</td>
//                                                     <td x-text="envelope.dblEnvelopeType"></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>EnvelopeUvalue</td>
//                                                     <td x-text="envelope.dblEnvelopeUvalue"></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>EnvelopeWidth</td>
//                                                     <td x-text="envelope.dblEnvelopeWidth"></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         <div :class="{'dbl-tableComponentContainer': true}">
//                                             <h4 @click="showComponents = !showComponents" style="cursor: pointer;" :class="{'dbl-tableComponentText': true}">
//                                                 Envelope Components
//                                                 <span :class="{'arrow': true, 'down': showComponents}" style="margin-left: 10px;">+</span>
//                                             </h4>
//                                             <div x-show="showComponents" style="margin-left: 20px;">
//                                                 <table border="1" :class="{'dbl-tableComponent-table': true}">
//                                                     <thead>
//                                                         <tr>
//                                                             <th :class="{'dbl-tableComponent-tableColumn1': true}">ComponentType</th>
//                                                             <th>Width (m)</th>
//                                                             <th>R-value (m2 K/W)</th>
//                                                             <th>Net Area (m2)</th>
//                                                             <th>Year</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         <template x-for="component in envelope.dblEnvelopeComponents" :key="component.dblComponentExpressId">
//                                                             <tr>
//                                                                 <td x-text="component.dblComponentType" :class="{'dbl-tableComponent-tableColumn1': true}"></td>
//                                                                 <td x-text="component.dblComponentWidth"></td>
//                                                                 <td x-text="component.dblComponentRvalue"></td>
//                                                                 <td x-text="component.dblComponentNetArea"></td>
//                                                                 <td x-text="component.dblComponentYearProduction"></td>
//                                                             </tr>
//                                                         </template>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                         <hr>
//                                     </div>
//                                 </div>
//                             </template>
//                         </div>
//                     </div>
//                 </template>
//             </div>
//         </template>
//     </div>`;

export const thermalEnvelopeTemplate = `
    <h2 @click="toggleAllEnvelopes" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;" :class="{'dbl-tableElementType': true}">
        <span x-text="title"></span>
        <span :class="{'arrow': true, 'down': isAllEnvelopesOpen()}" style="margin-left: 10px;">▶</span>
    </h2>
    <div x-show="isAllEnvelopesOpen()">
        <template x-for="(data, dataSetKey) in envelopeType" :key="dataSetKey">
            <div>
                <template x-for="(envelopes, levelKey) in data" :key="levelKey">
                    <div>
                        <h2 @click="toggleLevel(levelKey)" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;" :class="{'dbl-table-Level': true}">
                            <span x-text="'Level: ' + levelKey" :class="{'dbl-table-LevelText': true}"></span>
                            <span :class="{'arrow': true, 'down': isLevelOpen(levelKey), 'dbl-table-LevelArrow': true}" style="margin-left: 10px;">▶</span>
                        </h2>
                        <div x-show="isLevelOpen(levelKey)" style="margin-left: 20px;">
                            <template x-for="(envelope, index) in envelopes" :key="index">
                                <div x-data="{ isOpen: isEnvelopeOpen(envelope), showComponents: false }" :class="{'dbl-table-ElementContainer': true}">
                                    <h4 @click="toggleEnvelope(envelope); isOpen = !isOpen" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;" :class="{'dbl-table-Envelope': true}">
                                        <span x-text="'Envelope: ' + envelope.dblEnvelopeCode" :class="{'dbl-table-EnvelopeText': true}"></span>
                                        <div style="display: flex; align-items: center;">
                                            <button class="dbl-fragment-map-button"
                                                style="background: none; border: none; margin-left: 10px;"
                                                :data-envelope-code="envelope.dblEnvelopeCode"
                                                :data-dataset-name="dataSetKey"
                                                :data-level-key="levelKey"
                                                @click.stop>
                                                <span class="fragment-inspector" style="font-size: 18px; color: #000;">🔍</span> <!-- Lupa como icono -->
                                            </button>
                                            <span :class="{'arrow': true, 'down': isOpen, 'dbl-table-EnvelopeArrow': true}" style="margin-left: 10px;">▶</span>
                                        </div>
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
                                        <div :class="{'dbl-tableComponentContainer': true}">
                                            <h4 @click="showComponents = !showComponents" style="cursor: pointer;" :class="{'dbl-tableComponentText': true}">
                                                Envelope Components
                                                <span :class="{'arrow': true, 'down': showComponents}" style="margin-left: 10px;">+</span>
                                            </h4>
                                            <div x-show="showComponents" style="margin-left: 20px;">
                                                <table border="1" :class="{'dbl-tableComponent-table': true}">
                                                    <thead>
                                                        <tr>
                                                            <th :class="{'dbl-tableComponent-tableColumn1': true}">ComponentType</th>
                                                            <th>Width (m)</th>
                                                            <th>R-value (m2 K/W)</th>
                                                            <th>Net Area (m2)</th>
                                                            <th>Year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template x-for="component in envelope.dblEnvelopeComponents" :key="component.dblComponentExpressId">
                                                            <tr>
                                                                <td x-text="component.dblComponentType" :class="{'dbl-tableComponent-tableColumn1': true}"></td>
                                                                <td x-text="component.dblComponentWidth"></td>
                                                                <td x-text="component.dblComponentRvalue"></td>
                                                                <td x-text="component.dblComponentNetArea"></td>
                                                                <td x-text="component.dblComponentYearProduction"></td>
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


export function dblShowThermalEnvelopeWindows({ envelopeType, title }) {
    function getSafeData(data) {
      return data && Object.keys(data).length > 0 ? data : null;
    }
  
    return {
      title: title,
      data: getSafeData(envelopeType.dblEnvelopeWindows),
      expandedLevels: {},
      expandedItems: {},
      showAllEnvelopes: false,
  
      initialize() {
        this.expandedLevels = {};
        this.expandedItems = {};
        if (this.data) {
          for (const level in this.data) {
            this.expandedLevels[level] = false;
            for (const item of this.data[level]) {
              this.expandedItems[item.dblEnvelopeCode] = false;
            }
          }
        }
      },
  
      toggleAllEnvelopes() {
        this.showAllEnvelopes = !this.showAllEnvelopes;
        if (this.data) {
          for (const level in this.data) {
            this.expandedLevels[level] = this.showAllEnvelopes;
          }
          // Si se cierran todos los niveles, se colapsan los items
          if (!this.showAllEnvelopes) {
            this.expandedItems = {};
          }
        }
      },
  
      isAllEnvelopesOpen() {
        return this.showAllEnvelopes;
      },
  
      toggleLevel(level) {
        this.expandedLevels[level] = !this.expandedLevels[level];
        if (!this.expandedLevels[level]) {
          // Si el nivel se cierra, colapsar todos los items en ese nivel
          for (const item of this.data[level]) {
            this.expandedItems[item.dblEnvelopeCode] = false;
          }
        }
      },
  
      isLevelOpen(level) {
        return this.expandedLevels[level];
      },
  
      toggleItem(itemCode) {
        this.expandedItems[itemCode] = !this.expandedItems[itemCode];
      },
  
      isEnvelopeOpen(itemCode) {
        return this.expandedItems[itemCode];
      }
    };
  }
  export const thermalEnvelopeWindowTemplate = `
  <div x-data="dblThermalEnvelopeDynamicWindows">
    <!-- Título del contenedor de niveles -->
    <h2 @click="toggleAllEnvelopes" style="cursor: pointer;" :class="{'dbl-tableElementType': true}">
      <span x-text="title">Building Windows</span>
      <span style="float: right;" :class="{'arrow': true, 'down': isAllEnvelopesOpen()}">▶</span>
    </h2>
    
    <!-- Contenido de los Niveles -->
    <div x-show="isAllEnvelopesOpen()" x-init="initialize">
      <template x-for="(items, level) in data" :key="level">
        <div>
          <!-- Encabezado del Nivel -->
          <h2 @click="toggleLevel(level)" style="cursor: pointer;" :class="{'dbl-table-Level': true}">
            <span x-text="'Level: ' + level" :class="{'dbl-table-LevelText': true}"></span>
            <span style="float: right;" :class="{'arrow': true, 'down': isLevelOpen(level), 'dbl-table-LevelArrow': true}">▶</span>
          </h2>
          
          <!-- Objetos del Nivel -->
          <div x-show="isLevelOpen(level)" style="margin-left: 20px;">
            <template x-for="item in items" :key="item.dblEnvelopeCode">
              <div class="dbl-table-ElementContainer">
                <!-- Título del Objeto y toggle -->
                <h4 @click="toggleItem(item.dblEnvelopeCode)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                  <span x-text="'Envelope: ' + item.dblEnvelopeCode" :class="{'dbl-table-EnvelopeText': true}"></span>
                  <div style="display: flex; align-items: center;">
                    <button class="dbl-fragment-map-button" style="background: none; border: none; margin-right: 10px;">
                      <span class="fragment-inspector" style="font-size: 18px; color: #000;">🔍</span>
                    </button>
                    <span :class="{'arrow': true, 'down': isEnvelopeOpen(item.dblEnvelopeCode), 'dbl-table-EnvelopeArrow': true}">▶</span>
                  </div>
                </h4>
                <!-- Atributos del Objeto -->
                <div x-show="isEnvelopeOpen(item.dblEnvelopeCode)" style="margin-left: 20px;">
                  <table border="1" :class="{'dbl-tableEnvelope-table': true}" class="dbl-tableEnvelope-table">
                    <thead>
                      <tr>
                        <th>Atributo</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Envelope Code</td>
                        <td x-text="item.dblEnvelopeCode"></td>
                      </tr>
                      <tr>
                        <td>Window orientation</td>
                        <td x-text="item.dblEnvelopeWindowOrientation"></td>
                      </tr>
                      <tr>
                        <td>Envelope Type</td>
                        <td x-text="item.dblEnvelopeWindowType"></td>
                      </tr>
                      <tr>
                        <td>Window dimensions</td>
                        <td x-text="item.dblEnvelopeWindowWidth +'x' + item.dblEnvelopeWindowHeight"></td>
                      </tr>
                      <tr>
                        <td>Window area</td>
                        <td x-text="item.dblEnvelopeNetArea"></td>
                      </tr>
                      <tr>
                        <td>Window production year</td>
                        <td x-text="item.dblEnvelopeWindowYearProduction"></td>
                      </tr>
                      <tr>
                        <td>Window U-value</td>
                        <td x-text="item.dblEnvelopeWindowUvalue"></td>
                      </tr>
                      <tr>
                        <td>Window g-value</td>
                        <td x-text="item.dblEnvelopeWindowgValue"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    
    <!-- Mensaje cuando no hay objetos -->
    <div x-show="!data || Object.keys(data).length === 0">
      <p>No Envelopes found</p>
    </div>
  </div>
`;


export const envelopeVerticalSummaryTemplate = `
    <div>
        <h4 x-text="title"></h4>
        <template x-for="(item, key) in envelopeData" :key="key">
            <div class="subcategory-section">
                <h4 class="subcategory-section-title" x-text="item.dblVerticalEnvelopeSummaryOrientation + ' Facade'"></h4>
                <div style="display: flex;">
                    <div class="subcategory-section-imgStatic">
                        <img src="path_to_image" alt="Image">
                    </div>
                    <div class="subcategory-section-tableStatic">
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