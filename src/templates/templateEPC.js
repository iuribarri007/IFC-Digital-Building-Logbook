export function dblShowEpcData({ data, mainTitle }) {
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