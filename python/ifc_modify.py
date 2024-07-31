import ifcopenshell
import pandas as pd

# Load the IFC file
ifc_file = ifcopenshell.open('Tecnalia_TFM_Presentacion/ph01_TFM.ifc')

# Load the CSV file
csv_file = '_walltypes.csv'
# csv_data = pd.read_csv(csv_file)

csv_walltypes = pd.read_csv('_walltypes.csv', delimiter=';')
csv_floortypes = pd.read_csv('_floortypes.csv', delimiter=';')
csv_rooftypes = pd.read_csv('_rooftypes.csv', delimiter=';')
# Print the column names to verify
print(csv_walltypes.columns)

# Function to update material constituents for IfcWallType elements
def update_walltype_materials(ifc_file, csv_data):
    # Iterate through the wall types in the CSV data
    for wall_type_name in csv_data['WallTypeName'].unique():
        # Convert wall_type_name to string to handle potential numeric or float values
        wall_type_name = str(wall_type_name)
        
        # Get all IfcWallType elements with names containing wall_type_name
        wall_types = [wt for wt in ifc_file.by_type('IfcWallType') if wall_type_name in str(wt.Name)]
        
        for wall_type in wall_types:
            # Get the material constituent sets associated with the IfcWallType
            material_sets = wall_type.HasAssociations
            
            for material_set in material_sets:
                if material_set.is_a('IfcRelAssociatesMaterial'):
                    material = material_set.RelatingMaterial
                    if material.is_a('IfcMaterialConstituentSet'):
                        constituents = material.MaterialConstituents
                        for constituent in constituents:
                            if constituent.is_a('IfcMaterialConstituent'):
                                # Find matching row in CSV data
                                matching_rows = csv_data[(csv_data['WallTypeName'] == wall_type_name) & (csv_data['MaterialConstituentName'] == constituent.Name)]
                                
                                for index, row in matching_rows.iterrows():
                                    fraction = row['Fraction']
                                    
                                    # Update the Fraction attribute of the constituent
                                    constituent.Fraction = fraction
                                    print(constituent.Fraction)
 # Update material constituents in the IFC file

def update_floortype_materials (ifc_file, csv_data):
    for floor_type_name in csv_data['FloorTypeName'].unique():
        floor_type_name = str(floor_type_name)
        floor_types= [ft for ft in ifc_file.by_type('IfcSlabType') if floor_type_name in str(ft.Name)]

        for floor_type in floor_types:
            material_sets = floor_type.HasAssociations

            for material_set in material_sets:
                if material_set.is_a('IfcRelAssociatesMaterial'):
                    material = material_set.RelatingMaterial
                    if material.is_a('IfcMaterialConstituentSet'):
                        constituents = material.MaterialConstituents
                        for constituent in constituents:
                            if constituent.is_a('IfcMaterialConstituent'):
                                # Find matching row in CSV data
                                matching_rows = csv_data[(csv_data['FloorTypeName'] == floor_type_name) & (csv_data['MaterialConstituentName'] == constituent.Name)]
                                
                                for index, row in matching_rows.iterrows():
                                    fraction = row['Fraction']
                                    # Update the Fraction attribute of the constituent
                                    constituent.Fraction = fraction
                                    print(constituent.Fraction)

def update_rooftype_materials (ifc_file, csv_data):
    for roof_type_name in csv_data['RoofTypeName'].unique():
        roof_type_name = str(roof_type_name)
        roof_types= [ft for ft in ifc_file.by_type('IfcRoofType') if roof_type_name in str(ft.Name)]

        for roof_type in roof_types:
            material_sets = roof_type.HasAssociations

            for material_set in material_sets:
                if material_set.is_a('IfcRelAssociatesMaterial'):
                    material = material_set.RelatingMaterial
                    if material.is_a('IfcMaterialConstituentSet'):
                        constituents = material.MaterialConstituents
                        for constituent in constituents:
                            if constituent.is_a('IfcMaterialConstituent'):
                                # Find matching row in CSV data
                                matching_rows = csv_data[(csv_data['RoofTypeName'] == roof_type_name) & (csv_data['MaterialConstituentName'] == constituent.Name)]
                                
                                for index, row in matching_rows.iterrows():
                                    fraction = row['Fraction']
                                    # Update the Fraction attribute of the constituent
                                    constituent.Fraction = fraction
                                    print(constituent.Fraction)



update_walltype_materials(ifc_file, csv_walltypes)
update_floortype_materials(ifc_file,csv_floortypes)
update_rooftype_materials(ifc_file,csv_rooftypes)

# Save the updated IFC file
ifc_file.write('Tecnalia_TFM_Presentacion/ph01_tfm_modified.ifc')