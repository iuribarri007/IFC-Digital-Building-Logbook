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
  
    // Logic for the DBL menu
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('data-target');
            const defaultSubcategory = `${target}-1`;

            // Remove active-category class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active-category');
            });

            // Add active-category class to the clicked menu item
            this.classList.add('active-category');

            // Show category
            const category = document.querySelector('.category');
            if (category) {
                category.classList.add('active');
            }

            // Show category title
            categoryTitleTexts.forEach(text => {
                text.classList.toggle('hidden', text.getAttribute('data-target') !== target);
            });

            // Show active subcategory-title
            subcategoryTitleContainers.forEach(container => {
                container.classList.toggle('hidden', container.getAttribute('data-target') !== target);
            });

            // Show subcategory-sidebar content
            subcategorySidebarContents.forEach(sidebarContent => {
                sidebarContent.classList.toggle('hidden', sidebarContent.getAttribute('data-target') !== target);
                if (!sidebarContent.classList.contains('hidden')) {
                    const firstContent = sidebarContent.querySelector('.sidebar-content');
                    if (firstContent) {
                        firstContent.classList.remove('hidden');
                    }
                }
            });

            // Show the corresponding sidebar content
            const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
            subcategoryContentContainers.forEach(containerContent => {
                containerContent.classList.toggle('hidden', containerContent.getAttribute('data-target') !== defaultSubcategory);
            });

            // Show the corresponding subcategory-menu-content-container
            const subcategoryMenuContentContainers = document.querySelectorAll('.subcategory-menu-content-container');
            subcategoryMenuContentContainers.forEach(container => {
                container.classList.toggle('hidden', container.getAttribute('data-target') !== target);
            });

            // Show the corresponding sidebar-content
            const sidebarContents = document.querySelectorAll('.sidebar-content');
            sidebarContents.forEach(content => {
                content.classList.toggle('hidden', content.getAttribute('data-target') !== defaultSubcategory);
            });

            // Handle subcategory button highlighting
            // Remove active-subcategory class from all subcategory buttons
            subcategoryButtons.forEach(button => {
                button.classList.remove('active-subcategory');
            });

            // Add active-subcategory class to the first subcategory button of the clicked category
            const firstSubcategoryButton = document.querySelector(`.subcategory-title-container[data-target="${target}"] .subcategory-title-btn`);
            if (firstSubcategoryButton) {
                firstSubcategoryButton.classList.add('active-subcategory');
            }
        });
    });

    // Function to handle subcategory button click
    function handleSubcategoryButtonClick(event) {
        const subTarget = event.target.getAttribute('data-target');

        // Remove active-subcategory class from all buttons in the same category
        const parentCategory = event.target.closest('.category');
        parentCategory.querySelectorAll('.subcategory-title-btn').forEach(button => {
            button.classList.remove('active-subcategory');
        });

        // Add active-subcategory class to the clicked button
        event.target.classList.add('active-subcategory');

        // Show subcategory sidebar content
        subcategorySidebarContents.forEach(sidebarContent => {
            sidebarContent.classList.toggle('hidden', !sidebarContent.querySelector(`.sidebar-content[data-target="${subTarget}"]`));
            if (!sidebarContent.classList.contains('hidden')) {
                sidebarContent.querySelectorAll('.sidebar-content').forEach(content => {
                    content.classList.toggle('hidden', content.getAttribute('data-target') !== subTarget);
                });
            }
        });

        // Show the subcategory content container
        const subcategoryContentContainers = document.querySelectorAll('.subcategory-menu-content-container .subcategory-content');
        subcategoryContentContainers.forEach(containerContent => {
            containerContent.classList.toggle('hidden', containerContent.getAttribute('data-target') !== subTarget);
        });
    }

    // Add click event to subcategory buttons
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', handleSubcategoryButtonClick);
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

    // Resizing function
    let isResizing = false;
    const minWidth = 20 * 16; // 20rem in pixels (assuming 16px base font size)
    const maxWidth = window.innerWidth * 0.42; // 45% of the viewport width

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

