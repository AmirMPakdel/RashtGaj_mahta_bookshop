
const Sort = (studentList, by, order)=>{

    let newList = Object.assign([], studentList);

    if(by == "code"){

        newList.sort((a,b)=>{
            
            return a.code - b.code;
        });

        if(order == "D"){

            newList.reverse();
        }
        
    }else{

        newList.sort((a,b)=>{
            
            return a.lastName.localeCompare(b.lastName);
        });

        if(order == "D"){

            newList.reverse();
        }
    }
    
    return newList;
}

export{Sort}