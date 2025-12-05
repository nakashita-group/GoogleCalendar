const button=document.getElementById("button_to_server");
button.addEventListener("click",async ()=>{
    const res=await fetch("/api/test_response");
    console.log("response",res);
    const data=await res.json();
    console.log("data",data);

    // document.getElementById("displayRes").innerText=JSON.stringify(data, null, 2);
    // console.log("credential",data);
})