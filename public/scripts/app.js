
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
function adminCopy() {
  // Get the text field
  var copyText = document.getElementById("adminlink");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

function voterCopy() {
  // Get the text field
  var copyText = document.getElementById("voterlink");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

module.exports = {
  adminCopy,
  voterCopy,
};
