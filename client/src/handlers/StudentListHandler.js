import urls from '../consts/urls';
import Dashboard from '../pages/Dashboard';

const GetStudentList = (onFetched, onError)=>{

    //alert('getting list')

    fetch(urls.getStudentList,
        {method:"POST", 
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> onFetched(res))
                .catch(err=>{ onFetched(res) });
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور")

            }else{

                res.json().then(res=> onError(res.error))
                .catch(err=>{ onError(res) });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

const UpdateStudentList = (onSuccess, onError)=>{

    GetStudentList((res)=>{

        Dashboard.StudentInfoList = res;
        
        onSuccess();

    }, (err)=>{

        onError(err);
    })
}

export {GetStudentList}