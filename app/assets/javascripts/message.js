$(function(){
  var buildHTML = function(message){
    var format = `<div class="message" data-message_id=` + message.id + `>` +
    `<div class="upper-message">` +
      `<div class="upper-message__user-name">` +
        message.user_name +
      `</div>` +
      `<div class="upper-message__time">` +
        message.created_at+
      `</div>` +
    `</div>` 
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = format +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = format +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = format +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);   
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');      
      $('form')[0].reset();
    })
      .fail(function(){
        alert('error');
      });
      return false;
  });
  var reloadMessages = function() {
    last_message_id = $('.message').last().data('message_id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "./api/messages",
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  };
  var reloadPage = /messages$/;
  if (reloadPage.test(location.href)==true){
    setInterval(reloadMessages, 7000);
  }else{
  }
});