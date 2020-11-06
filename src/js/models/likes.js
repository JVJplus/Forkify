export class Likes{
    constructor(){
        this.likes = [];
    }

    addItem(id,img,title,author){
        this.likes.push({
            id,img,title,author
        });
        this.addToLocalStorage();
        return this.likes[this.likes.length-1];
    }

    removeItem(id){
        const index=this.likes.findIndex(el=>el.id==id);
        this.likes.splice(index,1);
        this.addToLocalStorage();
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id==id)!=-1;
    }

    noOfLikes(){
        return this.likes.length;
    }

    addToLocalStorage(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }

    restoreLocalStorage(){
        // can be null, if not empty or 1st time
        const oldLikes=JSON.parse(localStorage.getItem('likes'));
        if(oldLikes)
            this.likes=oldLikes;
    }
}