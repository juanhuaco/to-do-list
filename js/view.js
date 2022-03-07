import Modal from './components/modal.js';
import TD from './components/add-todo.js';
import Filters from './components/filters.js'

export default class View {
    constructor(){
        this.currentId = 1;
        this.model = null;
        this.modal = new Modal();
        this.table = document.getElementById('table');
        this.addToDoForm = new TD();
        this.filters = new Filters();

        this.addToDoForm.onClick((title, description) => this.addToDo(title, description));
        this.modal.onClick((id, values)=>this.editToDo(id, values));
        this.filters.onClick((filters)=>this.filter(filters));

    }

    render(){
        const toDos = this.model.toDos;
        toDos.forEach((toDo) => this.createRow(toDo));
    }

    filter(filters){
        const { type, words } = filters;
        const [, ...rows] = document.getElementsByTagName('tr');
        for(const row of rows){
            console.log(row);
        }
    }

    setModel(model){
        this.model = model;
    }

    toggleCompleted(toDo){
        this.model.toggleCompleted(toDo);
    }

    addToDo(title, description){
        const toDo = this.model.addToDo(title, description);
        this.createRow(toDo);
    }
    
    removeToDo(toDo){
        this.model.removeToDo(toDo);
        document.getElementById(toDo.id).remove();
    }

    editToDo(id, values){
        const newToDo = this.model.editToDo(id, values);
        this.editRow(newToDo);
    }

    createRow(toDo){
        const row = this.table.insertRow();
        row.setAttribute('id', toDo.id);
            row.innerHTML = `
                <td>${toDo.title}</td>
                <td>${toDo.description}</td>
                <td class="text-center">
                </td>
                <td class="text-right">
                </td>
            `;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('text-center');
            checkbox.checked = toDo.completed;
            checkbox.onclick = ()=> this.toggleCompleted(toDo);
            row.children[2].appendChild(checkbox);

            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-primary', 'mb-1');
            editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
            editBtn.setAttribute('data-toggle', 'modal');
            editBtn.setAttribute('data-target', '#modal');
            editBtn.onclick = ()=> {
                const newToDo = this.model.toDos[this.model.findToDoIndex(toDo)]
                this.modal.setValues(newToDo);
            };
            row.children[3].appendChild(editBtn);

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
            removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
            removeBtn.onclick = ()=> this.removeToDo(toDo);
            row.children[3].appendChild(removeBtn);
    }

    editRow(toDo){
        const row = document.getElementById(toDo.id);
        row.children[0].innerText = toDo.title;
        row.children[1].innerText = toDo.description;
        row.children[2].children[0].checked = toDo.completed;
    }
}