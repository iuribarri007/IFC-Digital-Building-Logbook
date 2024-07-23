
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
  
//     const menuItems = document.querySelectorAll('.dbl-menu .menu-item a');
//     const categories = document.querySelectorAll('.category');
//     const categoryTitleTexts = document.querySelectorAll('.category-title-text');
//     const subcategoryTitleContainers = document.querySelectorAll('.subcategory-title-container');
//     const subcategoryContents = document.querySelectorAll('.subcategory-content');
  
//     menuItems.forEach(item => {
//       item.addEventListener('click', function(event) {
//         event.preventDefault();
//         const target = this.getAttribute('data-target');
        
//         // Mostrar el div .category
//         const category = document.querySelector('.category');
//         if (category) {
//           category.classList.add('active');
//         }
        
//         // Mostrar el div .category-title-text correspondiente
//         categoryTitleTexts.forEach(text => {
//           if (text.getAttribute('data-target') === target) {
//             text.classList.remove('hidden');
//           } else {
//             text.classList.add('hidden');
//           }
//         });
        
//         // Mostrar el div .subcategory-title-container correspondiente
//         subcategoryTitleContainers.forEach(container => {
//           if (container.getAttribute('data-target') === target) {
//             container.classList.remove('hidden');
//           } else {
//             container.classList.add('hidden');
//           }
//         });
        
//         // Mostrar el div .subcategory-content correspondiente
//         subcategoryContents.forEach(content => {
//           if (content.getAttribute('data-target') === target) {
//             content.classList.remove('hidden');
//           } else {
//             content.classList.add('hidden');
//           }
//         });
//       });
//     });
  
//     // Agregar evento para el botón toggle del menú
//     menuToggle.addEventListener('click', function() {
//       menu.classList.toggle('active');
//     });
  
//     // Agregar eventos para los botones de cerrar categoría
//     closeButtons.forEach(button => {
//       button.addEventListener('click', function(event) {
//         event.preventDefault();
//         const category = button.closest('.category');
//         category.classList.remove('active');
//       });
//     });
  
//     // Agregar eventos para los botones de flecha de subcategoría
//     subcategoryArrowButtons.forEach(button => {
//       button.addEventListener('click', function() {
//         const arrow = this.querySelector('.subcategory-btn-arrow');
//         arrow.classList.toggle('rotated');
//       });
//     });
  
//     // Agregar evento para el botón de cerrar menú
//     closeMenuButton.addEventListener('click', function() {
//       subcategoryMenu.classList.toggle('closed');
//     });
  
//     // Agregar evento para el botón de cerrar barra lateral
//     closeSidebarButton.addEventListener('click', function() {
//       subcategorySidebar.classList.toggle('closed');
//     });
  
//     // Funcionalidad de redimensionamiento
//     let isResizing = false;
  
//     resizer.addEventListener('mousedown', function(e) {
//       isResizing = true;
//       document.body.style.cursor = 'ew-resize';
//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);
//     });
  
//     function onMouseMove(e) {
//       if (!isResizing) return;
  
//       // Obtiene el rectángulo del elemento subcategory-menu
//       const rect = subcategoryMenu.getBoundingClientRect();
  
//       // Calcula el nuevo ancho basado en la posición actual del mouse
//       subcategoryMenu.style.width = `${e.clientX - rect.left}px`;
//     }
  
//     function onMouseUp() {
//       isResizing = false;
//       document.body.style.cursor = '';
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     }
//   });


// document.addEventListener('DOMContentLoaded', function() {
//   const menuToggle = document.querySelector('.menu-toggle');
//   const menu = document.querySelector('#dbl-PrimaryMenu');
//   const closeButtons = document.querySelectorAll('.close-category');
//   const resizer = document.querySelector('.resizer');
//   const closeMenuButton = document.querySelector('.close-menu');
//   const subcategoryMenu = document.querySelector('.subcategory-menu');
//   const closeSidebarButton = document.querySelector('.close-sidebar');
//   const subcategorySidebar = document.querySelector('.subcategory-sidebar');
//   const subcategoryArrowButtons = document.querySelectorAll('.subcategory-btn-controls');
//   const menuItems = document.querySelectorAll('.dbl-menu .menu-item a');
//   const categories = document.querySelectorAll('.category');
//   const categoryTitleTexts = document.querySelectorAll('.category-title-text');
//   const subcategoryTitleContainers = document.querySelectorAll('.subcategory-title-container');
//   const subcategorySidebarContents = document.querySelectorAll('.subcategory-sidebar-content-container');
//   const subcategoryButtons = document.querySelectorAll('.subcategory-title-btn');

//   // Manejador de clic en elementos del menú principal
//   menuItems.forEach(item => {
//       item.addEventListener('click', function(event) {
//           event.preventDefault();
//           const target = this.getAttribute('data-target');
//           const defaultSubcategory = `${target}-1`;

//           // Mostrar la categoría principal
//           const category = document.querySelector('.category');
//           if (category) {
//               category.classList.add('active');
//           }

//           // Mostrar el título de la categoría correspondiente
//           categoryTitleTexts.forEach(text => {
//               if (text.getAttribute('data-target') === target) {
//                   text.classList.remove('hidden');
//               } else {
//                   text.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenedor de título de subcategoría correspondiente
//           subcategoryTitleContainers.forEach(container => {
//               if (container.getAttribute('data-target') === target) {
//                   container.classList.remove('hidden');
//               } else {
//                   container.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenido de barra lateral de subcategoría correspondiente
//           subcategorySidebarContents.forEach(sidebarContent => {
//               if (sidebarContent.getAttribute('data-target') === target) {
//                   sidebarContent.classList.remove('hidden');

//                   // Mostrar el primer sidebar-content dentro de cada contenedor de barra lateral
//                   const firstContent = sidebarContent.querySelector('.sidebar-content');
//                   if (firstContent) {
//                       firstContent.classList.remove('hidden');
//                   }
//               } else {
//                   sidebarContent.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenido de subcategoría correspondiente
//           const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
//           subcategoryContentContainers.forEach(containerContent => {
//               if (containerContent.getAttribute('data-target') === defaultSubcategory) {
//                   containerContent.classList.remove('hidden');
//               } else {
//                   containerContent.classList.add('hidden');
//               }
//           });

//           // Agregar evento de clic a los botones de subcategoría correspondientes
//           const activeSubcategoryButtons = document.querySelectorAll(`.subcategory-title-container[data-target="${target}"] .subcategory-title-btn`);
//           activeSubcategoryButtons.forEach(button => {
//               button.addEventListener('click', function() {
//                   const subTarget = this.getAttribute('data-target');

//                   // Mostrar el contenido de barra lateral de subcategoría correspondiente
//                   subcategorySidebarContents.forEach(sidebarContent => {
//                       if (sidebarContent.querySelector(`.sidebar-content[data-target="${subTarget}"]`)) {
//                           sidebarContent.classList.remove('hidden');
//                           sidebarContent.querySelectorAll('.sidebar-content').forEach(content => {
//                               if (content.getAttribute('data-target') === subTarget) {
//                                   content.classList.remove('hidden');
//                               } else {
//                                   content.classList.add('hidden');
//                               }
//                           });
//                       } else {
//                           sidebarContent.classList.add('hidden');
//                       }
//                   });

//                   // Mostrar el contenido del contenedor de subcategoría correspondiente
//                   subcategoryContentContainers.forEach(containerContent => {
//                       if (containerContent.getAttribute('data-target') === subTarget) {
//                           containerContent.classList.remove('hidden');
//                       } else {
//                           containerContent.classList.add('hidden');
//                       }
//                   });
//               });
//           });
//       });
//   });

//   // Manejador de clic para el botón de alternancia del menú
//   menuToggle.addEventListener('click', function() {
//       menu.classList.toggle('active');
//   });

//   // Manejador de clic para los botones de cerrar categoría
//   closeButtons.forEach(button => {
//       button.addEventListener('click', function(event) {
//           event.preventDefault();
//           const category = button.closest('.category');
//           category.classList.remove('active');
//       });
//   });

//   // Manejador de clic para los botones de flecha de subcategoría
//   subcategoryArrowButtons.forEach(button => {
//       button.addEventListener('click', function() {
//           const arrow = this.querySelector('.subcategory-btn-arrow');
//           arrow.classList.toggle('rotated');
//       });
//   });

//   // Manejador de clic para el botón de cerrar menú
//   closeMenuButton.addEventListener('click', function() {
//       subcategoryMenu.classList.toggle('closed');
//   });

//   // Manejador de clic para el botón de cerrar barra lateral
//   closeSidebarButton.addEventListener('click', function() {
//       subcategorySidebar.classList.toggle('closed');
//   });

//   // Funcionalidad de redimensionamiento
//   let isResizing = false;

//   resizer.addEventListener('mousedown', function(e) {
//       isResizing = true;
//       document.body.style.cursor = 'ew-resize';
//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);
//   });

//   function onMouseMove(e) {
//       if (!isResizing) return;

//       // Obtiene el rectángulo del elemento subcategory-menu
//       const rect = subcategoryMenu.getBoundingClientRect();

//       // Calcula el nuevo ancho basado en la posición actual del mouse
//       subcategoryMenu.style.width = `${e.clientX - rect.left}px`;
//   }

//   function onMouseUp() {
//       isResizing = false;
//       document.body.style.cursor = '';
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//   }
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
  const subcategorySidebarContents = document.querySelectorAll('.subcategory-sidebar-content-container');
  const subcategoryButtons = document.querySelectorAll('.subcategory-title-btn');

  // Manejador de clic en elementos del menú principal
//   menuItems.forEach(item => {
//       item.addEventListener('click', function(event) {
//           event.preventDefault();
//           const target = this.getAttribute('data-target');
//           const defaultSubcategory = `${target}-1`;

//           // Mostrar la categoría principal
//           const category = document.querySelector('.category');
//           if (category) {
//               category.classList.add('active');
//           }

//           // Mostrar el título de la categoría correspondiente
//           categoryTitleTexts.forEach(text => {
//               if (text.getAttribute('data-target') === target) {
//                   text.classList.remove('hidden');
//               } else {
//                   text.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenedor de título de subcategoría correspondiente
//           subcategoryTitleContainers.forEach(container => {
//               if (container.getAttribute('data-target') === target ) {
//                   container.classList.remove('hidden');
//               } else {
//                   container.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenido de barra lateral de subcategoría correspondiente //CAMBIO AQUI
//           subcategorySidebarContents.forEach(sidebarContent => {
//               if (sidebarContent.getAttribute('data-target') === target +"-1") {
//                   sidebarContent.classList.remove('hidden');

//                   // Mostrar el primer sidebar-content dentro de cada contenedor de barra lateral
//                   const firstContent = sidebarContent.querySelector('.sidebar-content');
//                   if (firstContent) {
//                       firstContent.classList.remove('hidden');
//                   }
//               } else {
//                   sidebarContent.classList.add('hidden');
//               }
//           });

//           // Mostrar el contenido de subcategoría correspondiente
//           const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
//           subcategoryContentContainers.forEach(containerContent => {
//               if (containerContent.getAttribute('data-target') === defaultSubcategory) {
//                   containerContent.classList.remove('hidden');
//               } else {
//                   containerContent.classList.add('hidden');
//               }
//           });
//       });
//   });
menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('data-target');
        const defaultSubcategory = `${target}-1`;

        // Mostrar la categoría principal
        const category = document.querySelector('.category');
        if (category) {
            category.classList.add('active');
        }

        // Mostrar el título de la categoría correspondiente
        categoryTitleTexts.forEach(text => {
            if (text.getAttribute('data-target') === target) {
                text.classList.remove('hidden');
            } else {
                text.classList.add('hidden');
            }
        });

        // Mostrar el contenedor de título de subcategoría correspondiente
        subcategoryTitleContainers.forEach(container => {
            if (container.getAttribute('data-target') === target ) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });

        // Mostrar el contenido de barra lateral de subcategoría correspondiente
        subcategorySidebarContents.forEach(sidebarContent => {
            if (sidebarContent.getAttribute('data-target') === target) {
                sidebarContent.classList.remove('hidden');

                // Mostrar el primer sidebar-content dentro de cada contenedor de barra lateral
                const firstContent = sidebarContent.querySelector('.sidebar-content');
                if (firstContent) {
                    firstContent.classList.remove('hidden');
                }
            } else {
                sidebarContent.classList.add('hidden');
            }
        });

        // Mostrar el contenido de subcategoría correspondiente
        const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
        subcategoryContentContainers.forEach(containerContent => {
            if (containerContent.getAttribute('data-target') === defaultSubcategory) {
                containerContent.classList.remove('hidden');
            } else {
                containerContent.classList.add('hidden');
            }
        });

        // Mostrar el subcategory-sidebar-content correspondiente
        subcategorySidebarContents.forEach(sidebarContent => {
            if (sidebarContent.getAttribute('data-target') === target) {
                sidebarContent.classList.remove('hidden');
            } else {
                sidebarContent.classList.add('hidden');
            }
        });

        // Mostrar el subcategory-menu-content-container correspondiente
        const subcategoryMenuContentContainers = document.querySelectorAll('.subcategory-menu-content-container');
        subcategoryMenuContentContainers.forEach(container => {
            if (container.getAttribute('data-target') === target) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });

        // Mostrar el sidebar-content correspondiente
        const sidebarContents = document.querySelectorAll('.sidebar-content');
        sidebarContents.forEach(content => {
            if (content.getAttribute('data-target') === defaultSubcategory) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// Agregar evento de clic a los botones de subcategoría
subcategoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const subTarget = this.getAttribute('data-target');

        // Mostrar el contenido de barra lateral de subcategoría correspondiente
        subcategorySidebarContents.forEach(sidebarContent => {
            if (sidebarContent.querySelector(`.sidebar-content[data-target="${subTarget}"]`)) {
                sidebarContent.classList.remove('hidden');
                sidebarContent.querySelectorAll('.sidebar-content').forEach(content => {
                    if (content.getAttribute('data-target') === subTarget) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            } else {
                sidebarContent.classList.add('hidden');
            }
        });

        // Mostrar el contenido del contenedor de subcategoría correspondiente
        const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
        subcategoryContentContainers.forEach(containerContent => {
            if (containerContent.getAttribute('data-target') === subTarget) {
                containerContent.classList.remove('hidden');
            } else {
                containerContent.classList.add('hidden');
            }
        });
    });
});
  // Agregar evento de clic a los botones de subcategoría
  subcategoryButtons.forEach(button => {
      button.addEventListener('click', function() {
          const subTarget = this.getAttribute('data-target');

          // Mostrar el contenido de barra lateral de subcategoría correspondiente
          subcategorySidebarContents.forEach(sidebarContent => {
              if (sidebarContent.querySelector(`.sidebar-content[data-target="${subTarget}"]`)) {
                  sidebarContent.classList.remove('hidden');
                  sidebarContent.querySelectorAll('.sidebar-content').forEach(content => {
                      if (content.getAttribute('data-target') === subTarget) {
                          content.classList.remove('hidden');
                      } else {
                          content.classList.add('hidden');
                      }
                  });
              } else {
                  sidebarContent.classList.add('hidden');
              }
          });

          // Mostrar el contenido del contenedor de subcategoría correspondiente
          const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
          subcategoryContentContainers.forEach(containerContent => {
              if (containerContent.getAttribute('data-target') === subTarget) {
                  containerContent.classList.remove('hidden');
              } else {
                  containerContent.classList.add('hidden');
              }
          });
      });
  });

  // Manejador de clic para el botón de alternancia del menú
  menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
  });

  // Manejador de clic para los botones de cerrar categoría
  closeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          const category = button.closest('.category');
          category.classList.remove('active');
      });
  });

  // Manejador de clic para los botones de flecha de subcategoría
  subcategoryArrowButtons.forEach(button => {
      button.addEventListener('click', function() {
          const arrow = this.querySelector('.subcategory-btn-arrow');
          arrow.classList.toggle('rotated');
      });
  });

  // Manejador de clic para el botón de cerrar menú
  closeMenuButton.addEventListener('click', function() {
      subcategoryMenu.classList.toggle('closed');
  });

  // Manejador de clic para el botón de cerrar barra lateral
  closeSidebarButton.addEventListener('click', function() {
      subcategorySidebar.classList.toggle('closed');
  });

  // Funcionalidad de redimensionamiento
  let isResizing = false;
  const minWidth = 20 * 16; // 20rem in pixels (assuming 16px base font size)
  const maxWidth = window.innerWidth * 0.4; // 60% of the viewport widt
 
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
      let newWidth = e.clientX - rect.left;
  
      // Limita el nuevo ancho entre minWidth y maxWidth
      if (newWidth >= minWidth && newWidth <= maxWidth) {
          subcategoryMenu.style.width = `${newWidth}px`;
      }
  }
  
  function onMouseUp() {
      isResizing = false;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
  }
//   let isResizing = false;

//   resizer.addEventListener('mousedown', function(e) {
//       isResizing = true;
//       document.body.style.cursor = 'ew-resize';
//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);
//   });

//   function onMouseMove(e) {
//       if (!isResizing) return;

//       // Obtiene el rectángulo del elemento subcategory-menu
//       const rect = subcategoryMenu.getBoundingClientRect();

//       // Calcula el nuevo ancho basado en la posición actual del mouse
//       subcategoryMenu.style.width = `${e.clientX - rect.left}px`;
//   }

//   function onMouseUp() {
//       isResizing = false;
//       document.body.style.cursor = '';
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//   }
});