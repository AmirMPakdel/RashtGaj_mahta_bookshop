
const Search = (word, studentList)=>{

    let newList = [];

    let j=0;
    
    
    studentList.forEach(element => {

        j++;

        if(recSearch(word, element.firstName)){

            newList.push(element);

        }else if(recSearch(word, element.lastName)){

            newList.push(element);

        }else if(recSearch(word,  element.code.toString())){

            newList.push(element);
        }
    });
    
    return newList;
}

const recSearch = (a, b, i=0)=>{ // search a in b

    if(b == undefined){

        return false;
    }

    if(a.length == i){
        
        return true;
    }

    if(a[i] == b[i]){

        return recSearch(a,b,i+1)
    
    }else{
        
        return false;
    }
}

export{Search};