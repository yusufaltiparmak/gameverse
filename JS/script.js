// Oyun detay fonksiyonu
function showDetails(game) {
  alert('Seçilen oyun: ' + game);
}

// Sayfa yüklendiğinde çalışan fonksiyon
$(document).ready(function() {
  // jQuery fonksiyon 1: Elementlerin görünürlüğünü değiştirme
  $("#showGamesBtn").click(function() {
    $("#featured").slideToggle("slow");
  });

  // jQuery fonksiyon 2: CSS değiştirme
  $("#themeSwitcher").click(function() {
    $("body").toggleClass("dark-theme light-theme");
  });

  // jQuery fonksiyon 3: Form doğrulama
  $("#iletisimForm").submit(function(event) {
    event.preventDefault();
    validateForm();
  });

  // jQuery fonksiyon 4: Animasyon
  $(".game-card").hover(function() {
    $(this).animate({
      marginTop: "-10px"
    }, 200);
  }, function() {
    $(this).animate({
      marginTop: "0px"
    }, 200);
  });

  // jQuery fonksiyon 5: Ajax çağrısı
  $("#loadMoreBtn").click(function() {
    $.ajax({
      url: "dummy-data.json",
      success: function(result) {
        displayGames(result);
      },
      error: function() {
        alert("Veri yüklenirken hata oluştu!");
      }
    });
  });

  // Sayaç başlat
  startCounter();
});

// Form doğrulama fonksiyonu
function validateForm() {
  let isValid = true;
  const email = $("#email").val();
  const name = $("#ad").val();
  const message = $("#mesaj").val();

  if (name.length < 3) {
    alert("Ad en az 3 karakter olmalıdır.");
    isValid = false;
  }

  if (!validateEmail(email)) {
    alert("Geçerli bir e-posta adresi giriniz.");
    isValid = false;
  }

  if (message.length < 10) {
    alert("Mesaj en az 10 karakter olmalıdır.");
    isValid = false;
  }

  if (isValid) {
    alert("Form başarıyla gönderildi!");
    $("#iletisimForm")[0].reset();
  }
}

// E-posta doğrulama fonksiyonu
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Sayaç fonksiyonu
function startCounter() {
  let counter = 0;
  setInterval(function() {
    counter++;
    $("#counter").text(counter);
  }, 1000);
}

// Oyunları gösterme fonksiyonu
function displayGames(games) {
  let output = "";
  for (let i = 0; i < games.length; i++) {
    output += `<div class="col-md-4">
                <div class="card game-card">
                  <img src="${games[i].image}" class="card-img-top" alt="${games[i].name}">
                  <div class="card-body">
                    <h5 class="card-title"><span>${games[i].name}</span></h5>
                    <p class="card-text"><span>${games[i].description}</span></p>
                    <button class="btn btn-primary" onclick="showDetails('${games[i].name}')">Detay</button>
                  </div>
                </div>
              </div>`;
  }
  $("#moreGames").html(output);
}

// Rastgele renk oluşturma fonksiyonu
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Renk değiştirme fonksiyonu
function changeHeaderColor() {
  document.querySelector('header').style.backgroundColor = getRandomColor();
}

// Ekran genişliğine göre düzenleme fonksiyonu
function checkScreenSize() {
  if (window.innerWidth < 768) {
    document.querySelectorAll('.game-card').forEach(function(card) {
      card.classList.add('small-screen');
    });
  } else {
    document.querySelectorAll('.game-card').forEach(function(card) {
      card.classList.remove('small-screen');
    });
  }
}

// Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çalışacak
window.onload = checkScreenSize;
window.onresize = checkScreenSize;