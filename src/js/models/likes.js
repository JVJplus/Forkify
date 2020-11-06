export class Likes{
    constructor(){
        this.likes = [];
    }

    addItem(id,img,title,author){
        this.likes.push({
            id,img,title,author
        });
        return this.likes[this.likes.length-1];
    }

    removeItem(id){
        const index=this.likes.findIndex(el=>el.id==id);
        this.likes.splice(index,1);
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id==id)!=-1;
    }

    noOfLikes(){
        return this.likes.length;
    }
}