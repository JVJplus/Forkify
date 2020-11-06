import uniqid from 'uniqid';

export class List{
    constructor(){
        this.items = [];
    }

    addItem(obj){
        const id=uniqid();
        this.items.push({
            id,
            count:obj.count,
            unit:obj.unit,
            ingredient:obj.ingredient
        });
        return this.items[this.items.length-1];
    }

    deleteItem(id){
        const index=this.items.findIndex(el=>el.id==id);
        this.items.splice(index,1);
    }

    updateCount(id,newCount){
        this.items.find(el=>el.id==id).count=newCount;
    }
}