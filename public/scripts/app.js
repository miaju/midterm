
$(() => {
  $("#refresh_btn").on('click', (event) => {
    event.preventDefault();
    window.location.reload();
  });

  $("#close_btn").on('click', (event)=>{
    event.preventDefault();
    const link = $("#admintoken").text().concat("/stop");
    $.ajax({
      method: "POST",
      url: link,
      success:((data)=>{
        window.location.href = "/";
      })
    });
  });
});
