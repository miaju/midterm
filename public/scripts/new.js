// Client facing scripts here
//const { generateRandomString } = require('./helpers');
$(() => {
  $('.button').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/api/new'
    })
      .done((response) => {
        const $pollsList = $('#polls');
        $pollsList.empty();

        for (const poll of response.polls) {
          $(`<li class="polls">`).text(`${poll.title}: ${poll.description}`).appendTo($pollsList);
        }
      });
  });
});
