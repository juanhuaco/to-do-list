import Alert from './alert.js'

export default class Modal {
    constructor(){
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.toDo = null;
        this.alert = new Alert('modal-alert');
    }

    onClick(callback){
        this.btn.onclick = () => {
            if(!this.title.value || !this.description.value){
                this.alert.show('Fill all the data')
                return;
            }
            this.alert.hide();
            $('#modal').modal('toggle');

            const values = {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            }
            
            console.log(this);
            //const newT = this.toDo;
            //this.setValues({id:newT, ...values});
            callback(this.toDo, values);
        };
    }

    setValues(toDo){
        this.toDo = toDo.id;
        this.title.value = toDo.title;
        this.description.value = toDo.description;
        this.completed.checked = toDo.completed;
    }
}