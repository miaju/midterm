
$(()=>{
  $("#refresh_btn").on('click',(event)=>{
    event.preventDefault();
    window.location.reload();
    // $.ajax({
    //   method:"GET",
    //   url:$("#admintoken").text(),
    //   success:(data)=>{
    //     console.log("here",data);
    //   }
    // })
  });


  $("#close_btn").on('click',(event)=>{
    event.preventDefault();
    const link = $("#admintoken").text().concat("/stop");
    $.ajax({
      method:"POST",
      url:link,
      success:((data)=>{
        // console.log(data);
        window.location.href = "/";
      })

    })

  });
})
