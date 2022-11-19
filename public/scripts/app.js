
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
const adminCopy = function() {
  // Get the text field
  let copyText = document.getElementById("adminlink");

  // Select the text field

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value)
    .then(() => {
      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    });


};

const voterCopy = function() {
  // Get the text field
  let copyText = document.getElementById("voterlink");

  // Select the text field

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value)
    .then(() => {
      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    });

};


module.exports = {
  adminCopy,
  voterCopy,
};
