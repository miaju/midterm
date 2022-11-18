
$(()=>{
  $("#refresh_btn").on('click',(event)=>{
    event.preventDefault();
    $.ajax({
      method:"GET",
      url:$("#admintoken").text()
    })
  });


  $("#close_btn").on('click',(event)=>{
    event.preventDefault();
    const link = $("#admintoken").text().concat("/stop");
    $.ajax({
      method:"POST",
      url:link
    })
  });
})
