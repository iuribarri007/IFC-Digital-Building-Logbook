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

//Logic for the DBL menu

menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('data-target');
        const defaultSubcategory = `${target}-1`;

        // Show category
        const category = document.querySelector('.category');
        if (category) {
            category.classList.add('active');
        }

        // Show category title
        categoryTitleTexts.forEach(text => {
            if (text.getAttribute('data-target') === target) {
                text.classList.remove('hidden');
            } else {
                text.classList.add('hidden');
            }
        });

        // Show active subcategory-title
        subcategoryTitleContainers.forEach(container => {
            if (container.getAttribute('data-target') === target ) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });

        //Show subcategory-sidebar content
        subcategorySidebarContents.forEach(sidebarContent => {
            if (sidebarContent.getAttribute('data-target') === target) {
                sidebarContent.classList.remove('hidden');

                // Show first element in sidebar content
                const firstContent = sidebarContent.querySelector('.sidebar-content');
                if (firstContent) {
                    firstContent.classList.remove('hidden');
                }
            } else {
                sidebarContent.classList.add('hidden');
            }
        });

        // Show the corresponding sidebar content
        const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
        subcategoryContentContainers.forEach(containerContent => {
            if (containerContent.getAttribute('data-target') === defaultSubcategory) {
                containerContent.classList.remove('hidden');
            } else {
                containerContent.classList.add('hidden');
            }
        });

        
        subcategorySidebarContents.forEach(sidebarContent => {
            if (sidebarContent.getAttribute('data-target') === target) {
                sidebarContent.classList.remove('hidden');
            } else {
                sidebarContent.classList.add('hidden');
            }
        });

        // Show the corresponding subcategory-menu-content-container 
        const subcategoryMenuContentContainers = document.querySelectorAll('.subcategory-menu-content-container');
        subcategoryMenuContentContainers.forEach(container => {
            if (container.getAttribute('data-target') === target) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });

        // Show the corresponding sidebar-content
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

// Add click event to subcategory btns
subcategoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const subTarget = this.getAttribute('data-target');

        // Show subcategory sidebar content
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

        // Show the subcategory content container
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
  // Add event to subcategory buttons
  subcategoryButtons.forEach(button => {
      button.addEventListener('click', function() {
          const subTarget = this.getAttribute('data-target');

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

          // Show the correspondent content of subcategory 
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

  // Menu btn
  menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
  });

  // Close category 
  closeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          const category = button.closest('.category');
          category.classList.remove('active');
      });
  });

  // Operate arrow
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

  //Resizing function
  let isResizing = false;
  const minWidth = 20 * 16; // 20rem in pixels (assuming 16px base font size)
  const maxWidth = window.innerWidth * 0.45; // 45% of the viewport widt
 
  resizer.addEventListener('mousedown', function(e) {
      isResizing = true;
      document.body.style.cursor = 'ew-resize';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  });
  
  function onMouseMove(e) {
      if (!isResizing) return;
  
      const rect = subcategoryMenu.getBoundingClientRect();
  
      let newWidth = e.clientX - rect.left;
  
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
});

