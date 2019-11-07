$(document).ready(()=>{
    $.ajax({
        type : "GET",
        url     :  "http://localhost:4000/api/barber/income/"+sessionStorage.getItem("ownername"),
        success: (data) => {
            $("#incomeDetails").text(data.income)
        },
        error: () => {
            console.log("error");
        }
    })
})