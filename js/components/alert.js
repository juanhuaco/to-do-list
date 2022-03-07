export default class Alert{
    constructor(alertId){
        this.alert = document.getElementById(alertId);
    }

    show(message){
        this.alert.classList.toggle('d-none', false);
        this.alert.innerText = message;
    }

    hide(){
        this.alert.classList.toggle('d-none', true);
    }
}