import Alpine from 'alpinejs';
import { dblEnvelopeData1, dblEnvelopeData2 } from './templateData.js'

//DOM logic::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#dbl-PrimaryMenu');
    const dropdowns = document.querySelectorAll('.menu-item.dropdown');
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    const links = document.querySelectorAll('.show-content');
    const tables = document.querySelectorAll('.dbl-table');

    if (menuToggle == null) {
        return;
    }

    // Toggle para el menú principal
    menuToggle.addEventListener('click', function() {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
        if (menu !== null) {
            menu.classList.toggle('open');
        }
    });

    // Toggle para los menús desplegables
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(event) {
            event.stopPropagation();
            const dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.toggle('open');
        });

        dropdown.addEventListener('mouseleave', function() {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.remove('open');
        });
    });

    // Cerrar menús desplegables al hacer clic fuera de ellos
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu)
                dropdownMenu.classList.remove('open');
        });
    });

    // Añadir clase para girar la flecha al hacer clic
    dropdownArrows.forEach(arrow => {
        arrow.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevenir que el evento se propague al dropdown
            this.classList.toggle('rotate-down');
        });
    });

    // Mostrar y ocultar las tablas correspondientes al hacer clic en los enlaces del menú
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Ocultar todas las tablas
            tables.forEach(table => table.classList.remove('active'));

            // Mostrar la tabla correspondiente
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
});
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::