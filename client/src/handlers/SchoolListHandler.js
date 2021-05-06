import urls from '../consts/urls';
import LoginPage from '../pages/Login';

const GetSchoolList = (onDone, onError)=>{

    fetch(urls.schoolList,
        {method:"POST", 
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> {
                    LoginPage.schoolNameList = createSchoolList(res);
                    onDone();
                })
                .catch(err=>alert(err));
            
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

const createSchoolList = (schoolList)=>{

    let sl = [];
    schoolList.forEach(e => {
        
        sl.push({value:e.name, label:e.name});
    });
    sl.push({value:"سایر", label:"سایر مدارس"});
    return sl;
  }

export {GetSchoolList}