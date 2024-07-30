 # IFC based Digital Building Logbook

This project results from research into integrating Open BIM workflows into the European Commission's proposal for a Digital Building Logbook (DBL). The DBL serves as a repository for all relevant building data, intended to be accessible to all stakeholders throughout a building's lifecycle.

As part of the research, a web application has been developed to test OpenBIM models in IFC format as an information source for the DBL. The focus is on the category **"06 Structure and Material,"** according to the categorization proposed by Ecoryis in the document **"Technical Guidelines for the European DBL"**:  
[Technical Guidelines for DBLs](https://www.ecorys.com/app/uploads/2019/02/DBL-Technical-Guidelines-for-DBLs.pdf).

The **Structure and Material** category is divided into two subcategories: **Thermal Envelope** and **Material Inventory**. Additionally, the application displays information related to the energy certificates of buildings, using data obtained from **Open Data Euskadi**. This demonstrates how data from multiple sources can be integrated into a single platform.

As a case study, BIM models have been developed based on the energy retrofitting project and the installation of a new elevator in Block 1 of the Aramotz neighborhood in Durango. This renovation is part of the **OpenGela** initiative developed by the Basque government, which aims to rehabilitate disadvantaged neighborhoods in Euskadi. BIM models were created for both the current state and the renovated state, including the necessary information to later transform and display this data in the application.

The project was developed from April to July 2024 by **Iñigo Uribarri** as part of the Master's thesis for the **"Máster en Investigación en Eficiencia Energética y Sostenibilidad"**, in Tecnalia: Research and innovation with assistance from **Asier Mediavilla**, senior researcher and IFC expert.

## IFC-Based Digital Building Logbook

The project relies on the following dependencies:

- **Alpine.js** ^3.14.1
- **bim-fragment** 1.0.22
- **openbim-components** 1.1.5
- **Three.js** 0.152.2
- **web-ifc** 0.0.44
- **vite** 5.3.1

IFC models are displayed using **openbim-components** and **web-ifc**. The application uses **TypeScript** as the main programming language to extract, transform, and load information from IFC files, making the data more user-friendly. This approach simplifies the user experience by removing the complexity of the IFC schema.

**Vite** is used as the build tool and development server, offering a significantly faster and more efficient development experience compared to traditional bundlers like Rollup. Vite’s modern approach integrates code seamlessly without requiring manual configuration or compilation steps, enhancing productivity and streamlining the development workflow.

On the front end, the project employs **Alpine.js** to configure templates for displaying information from objects and arrays. Alpine.js provides reactivity and state management in a lightweight manner, eliminating the need for more complex frameworks such as React, Angular, or Vue.

## Challenges and Solutions

### 01. Thermal Envelope Challenges: System vs. Addition of Elements

The project faced challenges regarding the thermal envelope of buildings due to the dynamic nature of rehabilitation processes. Key issues included the need for traceability and identification of elements across different phases. Managing modifications to instance elements was crucial for optimal understanding throughout these phases.

Rehabilitation was approached as a process of adding elements in layers, requiring the evaluation of the envelope as a unified system versus as a sum of its parts. This necessitated semantic segmentation of components to differentiate between load-bearing and non-load-bearing structures, as well as between the thermal envelope and facade elements. This segmentation often led to the need for division and duplication of functions within the system.

### 02. Material Inventory Challenges: Matryoshka Buildings and Nomenclature

Material inventory presented challenges as an intersection between products and materials. A significant issue was the lack of standardized nomenclature, complicating the establishment of comparable frameworks. Identifying materials as part of specific products within a system was essential for conceptual layer-based construction.

To optimize reuse and circularity, materials needed to be categorized according to the building system they belonged to. The project aimed to use BIM models as a foundation for material passports and urban-level material databases, a concept known as urban mining.

### 03. Technological Challenges

#### BIM and Software Integration

The project utilized a combination of proprietary and open-source software for BIM. Understanding the limitations of proprietary BIM software (such as Revit) and its constraints regarding IFC (Industry Foundation Classes) was essential. These constraints included supported IFC schema versions (IFC 2x3, IFC 4) and Model View Definitions (Reference View vs. Design Transfer View), as well as the capability to export parameters by element category.

Complementing proprietary BIM software with open BIM workflows involved enriching models with CSV data and using **IfcOpenShell** (Python) to generate data models with higher granularity and Level of Information (LOI). IFC viewers served as quality control tools and facilitated the introduction of Information Delivery Specifications (IDS) for generating and verifying information requirements.

#### IFC and User-Friendly Language

Familiarity with the IFC schema across its various versions was necessary to standardize and adhere to the schema as much as possible while creating custom properties only when strictly necessary. Translating the IFC language into comprehensible information was a priority, removing complexity to enable DBL users to understand the data.

Web programming served as an abstraction layer to convert IFC information into actionable knowledge for DBL users. The technology stack was entirely open-source, including Python and IfcOpenShell for enriching and manipulating IFC models outside proprietary BIM tools, and TypeScript and JavaScript for adding logic to the front end.

#### Web Technologies and Libraries

- **That Open Engine**, **IFC.js**, and **Three.js**: These libraries were used to work with and manipulate the IFC schema in a web environment, with Three.js serving as the foundation for displaying and exploring BIM models on web platforms.
- **Alpine.js**: Alpine.js was utilized to create templates with embedded logic, allowing easy iteration over objects and arrays and simplifying data integration and display within the application.

Through these solutions, the project addressed challenges associated with thermal envelopes, material inventory, and technological integration, paving the way for more comprehensive and user-friendly BIM applications.

## Future Work and Research Directions

Future development aims to enhance the platform by fully integrating the Digital Building Logbook with additional databases and further leveraging information from OpenBIM models. Efforts will also focus on integrating more recent versions of OpenBIM Components. During the project’s development, the library from That Open Company has evolved, introducing new and more efficient features. For example, the use of Fragment ".frag" format for loading models allows faster loading of IFC models without needing to transform them each time they are loaded onto the platform. 

Secondly, it is necessary to improve the user experience of the platform to make it more fluid and accessible for everyone. One example is enabling the application to load models automatically through a load menu, rather than requiring the user to manually upload them. This would streamline the process by loading the content directly into the DOM.

Finally, it would be interesting to integrate the data regarding embedded carbon into the application by relating the weight and the volumen of the materials with their corresponding impacts in terms of CO2/kg. 