// DOM Yüklendikten Sonra
$(document).ready(function() {
  // Ziyaretçi Sayacı
  let counter = 0;
  setInterval(() => {
    counter++;
    $('#counter').text(counter);
  }, 1000);

  // Buton Yükseklik Ayarla
  function adjustButtonHeights() {
    const buttons = $('.button-group .btn');
    let maxHeight = 0;
    
    buttons.css('height', 'auto');
    
    buttons.each(function() {
      if ($(this).outerHeight() > maxHeight) {
        maxHeight = $(this).outerHeight();
      }
    });
    
    buttons.css('height', maxHeight + 'px');
  }

  // Header Renk Değiştir
  $('#changeColorBtn').click(function() {
    const colors = ['#2a475e', '#1b2838', '#66c0f4', '#c7d5e0', '#171a21'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $('.site-header').css('background-color', randomColor);
    showNotification(`Header rengi değiştirildi: ${randomColor}`);
  });

  // Oyunları Göster/Gizle
  $('#showGamesBtn').click(function() {
    $('#featured').slideToggle();
    $(this).text(function(i, text) {
      return text === "Oyunları Göster" ? "Oyunları Gizle" : "Oyunları Göster";
    });
  });

  // Tema Değiştir
  $('#themeSwitcher').click(function() {
    $('body').toggleClass('light-theme');
    const theme = $('body').hasClass('light-theme') ? 'Açık Tema' : 'Koyu Tema';
    showNotification(`Tema değiştirildi: ${theme}`);
  });

  // Bildirim Sistemi
  function showNotification(message, type = 'info') {
    const types = {
      info: {bg: '#66c0f4', text: '#1b2838'},
      success: {bg: '#4CAF50', text: 'white'},
      error: {bg: '#f44336', text: 'white'}
    };
    
    const notification = $(`
      <div class="notification" style="
        background: ${types[type].bg};
        color: ${types[type].text};
      ">
        ${message}
      </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
      notification.addClass('show');
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }, 100);
  }

  // İlk Yüklenmede Çalışacaklar
  adjustButtonHeights();
  $(window).resize(adjustButtonHeights);
  showNotification('GameVerse\'e hoş geldiniz!', 'success');
});
