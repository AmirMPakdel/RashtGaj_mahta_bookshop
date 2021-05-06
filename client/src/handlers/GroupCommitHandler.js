import urls from '../consts/urls';

const CommitPurchaseHandler = (json, onFetched, onError)=>{

    fetch(urls.groupCommit, {
        method:"POST", 
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                onFetched(res);
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور")

            }else{

                res.json().then((data)=>{

                    onError(data.error)

                }).catch((err)=>{

                    onError(err)

                });
                
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

export default CommitPurchaseHandler;