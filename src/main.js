
// document.addEventListener('DOMContentLoaded', function() {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const menu = document.querySelector('#dbl-PrimaryMenu');
//     const closeButtons = document.querySelectorAll('.close-category');
//     const resizer = document.querySelector('.resizer');
//     const closeMenuButton = document.querySelector('.close-menu');
//     const subcategoryMenu = document.querySelector('.subcategory-menu');
//     const closeSidebarButton = document.querySelector('.close-sidebar');
//     const subcategorySidebar = document.querySelector('.subcategory-sidebar');
//     const subcategoryArrowButtons = document.querySelectorAll('.subcategory-btn-controls');
//     //
//     const menuItems = document.querySelectorAll('.dbl-menu .menu-item a');
//     const categories = document.querySelectorAll('.category');
//     const categoryTitleTexts = document.querySelectorAll('.category-title-text');
//     const subcategoryTitleContainers = document.querySelectorAll('.subcategory-title-container');
//     const subcategoryContents = document.querySelectorAll('.subcategory-content');

//     menuItems.forEach(item => {
//         item.addEventListener('click', function(event) {
//           event.preventDefault();
//           const target = this.getAttribute('data-target');
          
//           // Mostrar el div .category
//           const category = document.querySelector('.category');
//           if (category) {
//             category.classList.add('active');
//           }
          
//           // Mostrar el div .category-title-text correspondiente
//           categoryTitleTexts.forEach(text => {
//             if (text.getAttribute('data-target') === target) {
//               text.classList.remove('hidden');
//             } else {
//               text.classList.add('hidden');
//             }
//           });
          
//           // Mostrar el div .subcategory-title-container correspondiente
//           subcategoryTitleContainers.forEach(container => {
//             if (container.getAttribute('data-target') === target) {
//               container.classList.remove('hidden');
//             } else {
//               container.classList.add('hidden');
//             }
//           });
          
//           // Mostrar el div .subcategory-content correspondiente
//           subcategoryContents.forEach(content => {
//             if (content.getAttribute('data-target') === target) {
//               content.classList.remove('hidden');
//             } else {
//               content.classList.add('hidden');
//             }
//           });
//         });
//       });

//     // Agregar evento para el botón toggle del menú
//     menuToggle.addEventListener('click', function() {
//         menu.classList.toggle('active');
//     });

//     // Agregar eventos para los botones de cerrar categoría
//     closeButtons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             event.preventDefault();
//             const category = button.closest('.category');
//             category.classList.remove('active');
//         });
//     });

//     // Agregar eventos para los botones de flecha de subcategoría
//     subcategoryArrowButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const arrow = this.querySelector('.subcategory-btn-arrow');
//             arrow.classList.toggle('rotated');
//         });
//     });

//     // Agregar evento para el botón de cerrar menú
//     closeMenuButton.addEventListener('click', function() {
//         subcategoryMenu.classList.toggle('closed');
//     });

//     // Agregar evento para el botón de cerrar barra lateral
//     closeSidebarButton.addEventListener('click', function() {
//         subcategorySidebar.classList.toggle('closed');
//     });

//     // Funcionalidad de redimensionamiento
//     let isResizing = false;

//     resizer.addEventListener('mousedown', function(e) {
//         isResizing = true;
//         document.body.style.cursor = 'ew-resize';
//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     function onMouseMove(e) {
//         if (!isResizing) return;

//         // Obtiene el rectángulo del elemento subcategory-menu
//         const rect = subcategoryMenu.getBoundingClientRect();

//         // Calcula el nuevo ancho basado en la posición actual del mouse
//         subcategoryMenu.style.width = `${e.clientX - rect.left}px`;
//     }

//     function onMouseUp() {
//         isResizing = false;
//         document.body.style.cursor = '';
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#dbl-PrimaryMenu');
    const closeButtons = document.querySelectorAll('.close-category');
    const resizer = document.querySelector('.resizer');
    const closeMenuButton = document.querySelector('.close-menu');
    const subcategoryMenu = document.querySelector('.subcategory-menu');
    const closeSidebarButton = document.querySelector('.close-sidebar');
    const subcategorySidebar = document.querySelector('.subcategory-sidebar');
    const subcategoryArrowButtons = document.querySelectorAll('.subcategory-btn-controls');
  
    const menuItems = document.querySelectorAll('.dbl-menu .menu-item a');
    const categories = document.querySelectorAll('.category');
    const categoryTitleTexts = document.querySelectorAll('.category-title-text');
    const subcategoryTitleContainers = document.querySelectorAll('.subcategory-title-container');
    const subcategoryContents = document.querySelectorAll('.subcategory-content');
  
    menuItems.forEach(item => {
      item.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('data-target');
        
        // Mostrar el div .category
        const category = document.querySelector('.category');
        if (category) {
          category.classList.add('active');
        }
        
        // Mostrar el div .category-title-text correspondiente
        categoryTitleTexts.forEach(text => {
          if (text.getAttribute('data-target') === target) {
            text.classList.remove('hidden');
          } else {
            text.classList.add('hidden');
          }
        });
        
        // Mostrar el div .subcategory-title-container correspondiente
        subcategoryTitleContainers.forEach(container => {
          if (container.getAttribute('data-target') === target) {
            container.classList.remove('hidden');
          } else {
            container.classList.add('hidden');
          }
        });
        
        // Mostrar el div .subcategory-content correspondiente
        subcategoryContents.forEach(content => {
          if (content.getAttribute('data-target') === target) {
            content.classList.remove('hidden');
          } else {
            content.classList.add('hidden');
          }
        });
      });
    });
  
    // Agregar evento para el botón toggle del menú
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  
    // Agregar eventos para los botones de cerrar categoría
    closeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const category = button.closest('.category');
        category.classList.remove('active');
      });
    });
  
    // Agregar eventos para los botones de flecha de subcategoría
    subcategoryArrowButtons.forEach(button => {
      button.addEventListener('click', function() {
        const arrow = this.querySelector('.subcategory-btn-arrow');
        arrow.classList.toggle('rotated');
      });
    });
  
    // Agregar evento para el botón de cerrar menú
    closeMenuButton.addEventListener('click', function() {
      subcategoryMenu.classList.toggle('closed');
    });
  
    // Agregar evento para el botón de cerrar barra lateral
    closeSidebarButton.addEventListener('click', function() {
      subcategorySidebar.classList.toggle('closed');
    });
  
    // Funcionalidad de redimensionamiento
    let isResizing = false;
  
    resizer.addEventListener('mousedown', function(e) {
      isResizing = true;
      document.body.style.cursor = 'ew-resize';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  
    function onMouseMove(e) {
      if (!isResizing) return;
  
      // Obtiene el rectángulo del elemento subcategory-menu
      const rect = subcategoryMenu.getBoundingClientRect();
  
      // Calcula el nuevo ancho basado en la posición actual del mouse
      subcategoryMenu.style.width = `${e.clientX - rect.left}px`;
    }
  
    function onMouseUp() {
      isResizing = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });