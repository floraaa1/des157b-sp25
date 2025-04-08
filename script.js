(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const header1 = document.querySelector('#header1');
    const sections = document.querySelectorAll('section');
    const projects = document.querySelectorAll('#project');
    const research = document.querySelectorAll('#research');
    const development = document.querySelectorAll('#development');
    const capstone = document.querySelectorAll('#capstone');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            header1.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            projects.className = 'switch';
            research.className = 'switch';
            development.className = 'switch';
            capstone.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            header1.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (let i = 0; i < projects.length; i++) {
                projects[i].removeAttribute('class');
            }
            
            for (let i = 0; i < research.length; i++) {
                research[i].removeAttribute('class');
            }
            
            for (let i = 0; i < development.length; i++) {
                development[i].removeAttribute('class');
            }
            
            for (let i = 0; i < capstone.length; i++) {
                capstone[i].removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()