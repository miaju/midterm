// Client facing scripts here
$(() => {
  $('#fetch-polls').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/polls'
    })
    .done((response) => {
      const $pollsList = $('#polls');
      $pollsList.empty();

      for(const poll of response.polls) {
        $(`<li class="polls">`).text(`${poll.title}: ${poll.description}`).appendTo($pollsList);
      }
    });
  });
});
