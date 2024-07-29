// Material Inventory dynamic
export const materialInventoryTemplate = `
    <div class="dbl-tableElementType">
        <h2 @click="toggleAllMaterials" style="cursor: pointer;">
            <span x-text="mainTitleSafe"></span>
            <span :class="{'arrow': true, 'down': isAllMaterialsOpen}">▶</span>
        </h2>
        <div x-show="isAllMaterialsOpen">
            <table class="dbl-tableComponent-table">
                <thead class="dbl-table-Level">
                    <tr>
                        <th>Madaster Material</th>
                        <th>Uniclass Material</th>
                        <th>Uniclass Product</th>
                        <th>Volume (m3)</th>
                        <th>Weight (kg)</th>
                        <th>Density (kg/m3)</th>
                        <th>Waste Category</th>
                    </tr>
                </thead>
                <tbody>
                    <template x-if="dblMaterialCategories.length > 0">
                        <template x-for="(category, categoryIndex) in dblMaterialCategories" :key="categoryIndex">
                            <tr>
                                <td x-text="getSafeData(category.dblMaterialCategoryMadaster)"></td>
                                <td x-text="getSafeData(category.dblMaterialCategoryUniclassName)"></td>
                                <td x-text="getSafeData(category.dblProductCategoryUniclassName)"></td>
                                <td x-text="getSafeData(category.dblMaterialNetVolumeSum)"></td>
                                <td x-text="getSafeData(category.dblMaterialWeightSum)"></td>
                                <td x-text="getSafeData(category.dblMaterialCategoryMassDensity)"></td>
                                <td x-text="getSafeData(category.dblMaterialCategoryWasteCategory)"></td>
                            </tr>
                        </template>
                    </template>
                    <template x-if="dblMaterialCategories.length === 0">
                        <tr>
                            <td colspan="10">No material categories found</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
`;

export function dblShowMaterialInventory({ categories, mainTitle }) {
    function getSafeData(data, defaultValue = "Not found") {
        return data !== undefined ? data : defaultValue;
    }
    (categories || []).forEach(category => {
        category.expanded = false;  
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
        getSafeData,
        get dblMaterialCategories() {
            return Array.isArray(categories) ? categories : [];
        },
        get mainTitleSafe() {
            return getSafeData(mainTitle, "No Material Categories Found");
        }
    };
}
// Material Inventory static
export function dblShowMaterialMadasterSummary({ layerMadasterSummary, mainTitle }) {
    // Función para verificar y devolver datos seguros
    function getSafeData(data, defaultValue = "Not found") {
        return data !== undefined ? data : defaultValue;
    }
    return {
        layerMadasterSummary: layerMadasterSummary,
        mainTitle: mainTitle,
        getSafeData,
        get safeLayerMadasterSummary() {
            return Array.isArray(layerMadasterSummary) ? layerMadasterSummary : [];
        }
    };
}
export const materialMadasterSummaryTemplate = `
    <div class="subcategory-section">
        <h4 class="subcategory-section-title" x-text="mainTitle"></h4>
        <div style="display: flex;">
            <button class="subcategory-section-imgStatic">
                <!-- Imagen basada en el nombre del objeto directamente en el atributo src -->
                <img :src="'../../assets/images/dbl-images/dbl-building-layers/' + mainTitle.toLowerCase().replace(/ /g, '-') + '.png'" alt="Image">
            </button>
            <div class="subcategory-section-tableStatic">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Material Category</th>
                            <th>Volume (m3)</th>
                            <th>Weight (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template x-if="safeLayerMadasterSummary.length === 0">
                            <tr>
                                <td>Not found</td>
                                <td>Not found</td>
                                <td>Not found</td>
                            </tr>
                        </template>
                        <template x-if="safeLayerMadasterSummary.length > 0">
                            <template x-for="(category, index) in safeLayerMadasterSummary" :key="index">
                                <tr>
                                    <td x-text="getSafeData(category.dblMaterialCategoryMadaster, 'Not found')"></td>
                                    <td x-text="getSafeData(category.dblMaterialNetVolumeSummary, 'Not found')"></td>
                                    <td x-text="getSafeData(category.dblMaterialWeightSummary, 'Not found')"></td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`;

