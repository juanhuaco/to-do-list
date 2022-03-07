import Model from './model.js';
import View from './view.js';


document.addEventListener('DOMContentLoaded', function(){
    const model = new Model();
    const view = new View();
    view.setModel(model);
    model.setView(view);
    
    view.render();
});