const button=document.getElementById("button_to_server");
button.addEventListener("click",async ()=>{
    alert("request start");
    const res=await fetch("/server/test_response");
    const data=res.json();

    document.getElementById("displayRes").innerText=data;
})