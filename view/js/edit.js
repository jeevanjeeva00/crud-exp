const url = 'http://localhost:4650';

const userForm = document.getElementById('userForm');
const fName = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const username = document.getElementById('username');
const password = document.getElementById('password');
const address = document.getElementById('address');


//js logic to read data from url query

const params = window.location.search;
const id=new URLSearchParams(params) .get('id');

console.log('user id =' , id) 

const getSingle = async () => {
    await fetch(`${url} /api/users/${id}` ,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json())
    .then(out => {
        console.log('output = ' , out)
        if(out.user) {
            fName.value = out.user.name;
            email.value = out.user.email;
            age.value = out.user.age;
            username.value = out.user.username;
            password.value = out.user.password;
            address.value=out.user.address;

        }

    }).catch(err => console.log(err.msg))
}

//update handler
userForm.addEventListener('submite' , async(event)=>{
    event.preventDefault();
    try{
        // alert('update reequest called')
        const data = {
            name:fName.value,
            email:email.value,
            age: age.value,
            username:username.value,
            password: password.value,
            address:address.value,
            

        };
        console.log('update data =' , data);

        await fetch(`${url} /api/users/${id}`,{
            method:'PATCH',
            headers:{
                 'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then (res=> res.json())
        .then(out =>{
            alert(out.msg)
            window.location.href="/";

        }).catch(err=> console.log(err.msg));
    }catch(err){
        console.log(err.msg)
    }
});

//function call
(function(){
    getSingle()
})()