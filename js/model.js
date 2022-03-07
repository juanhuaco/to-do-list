export default class Model {
    constructor(){
        this.view = null;
        this.toDos = JSON.parse(localStorage.getItem('toDos'));
        if(!this.toDos || this.toDos.length < 1){
            this.toDos = [
                {
                    id: 0,
                    title: 'Aprende JS',
                    description: 'Se supone que es facil',
                    completed: false,
                }
            ]
            this.currentId = 1;
        }else{
            this.currentId = this.toDos[this.toDos.length - 1].id + 1;
        }
        
        //console.table(this.toDos);
    }

    setView(view){
        this.view = view;
    }

    getToDos(){
        return this.toDos.map((toDo)=>({...toDo}));
    }

    findToDoIndex(toDo){
        const index = this.toDos.findIndex((elem)=>elem.id === toDo.id);
        return index;
    }

    findToDoById(id){
        const index = this.toDos.findIndex((elem)=>elem.id === id);
        return this.toDos[index];
    }

    toggleCompleted(toDo){
        const index = this.findToDoIndex(toDo);
        const newToDo = this.toDos[index];
        newToDo.completed = !newToDo.completed;
        this.save();
    }
    
    addToDo(title, description){
        const toDo = {
            id: this.currentId++,
            title,
            description,
            completed: false
        }
        
        this.toDos.push(toDo);

        //console.log(this.toDos);

        this.save();

        return {...toDo};
    }

    removeToDo(toDo){
        const index = this.findToDoIndex(toDo);
        this.toDos.splice(index, 1);
        this.save();
    }

    editToDo(id, values){
        
        const toDo = this.findToDoById(id);
        const index = this.findToDoIndex(toDo);
        
        this.toDos[index] = {id, ...values};
        //console.log(this.toDos[index]);
        this.save();

        return this.toDos[index];
    }

    save(){
        localStorage.setItem('toDos', JSON.stringify(this.toDos));
        //console.table(this.toDos);
    }
    
}