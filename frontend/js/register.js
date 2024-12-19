
let API="http://13.60.198.66";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (event) => {
       
        event.preventDefault();

       
        const username= document.getElementById("user").value
        const email= document.getElementById("email").value
        const password = document.getElementById("pass").value
        const cpassword = document.getElementById("cpass").value

        

        console.log(username,email,password,cpassword);

        try {
            const res= await fetch(API+"/api/adduser",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,email,password,cpassword})
            })
            if(res.status==200){
                const {msg}=await res.json();
                alert(msg);
            }else{
                const {msg}=await res.json();
                alert(msg);
            }  
    
            
        } catch (error) {
            console.log(error);
            
        }

        
        
    });
})
