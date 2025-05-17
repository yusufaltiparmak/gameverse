// Bu dosya mevcut scripts.js dosyasının tamamını içeriyor
// Ayrıca tüm butonlar için fonksiyonel özellikler eklenmiştir

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
    
    // Kullanıcıya bildirim verelim
    const currentTheme = $("body").hasClass("light-theme") ? "Açık Tema" : "Koyu Tema";
    showNotification(`Tema değiştirildi: ${currentTheme}`, "info");
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
    // Kullanıcıya bir yükleme bildirimi göster
    showNotification("Oyunlar yükleniyor...", "info");
    
    // Dummy datayı kullanarak oyunları ekleyelim (Ajax yerine direkt kullanıyoruz)
    const dummyData = [
      {
        "name": "Stellar Odyssey",
        "image": "IMG/game1.jpg",
        "description": "Uzay macerası dolu stratejik bir keşif oyunu.",
        "type": "Strateji"
      },
      {
        "name": "City Builder Pro",
        "image": "IMG/game2.jpg",
        "description": "Kendi şehrini inşa et ve yönet.",
        "type": "Simülasyon"
      },
      {
        "name": "Dungeon Master",
        "image": "IMG/game1.jpg", 
        "description": "Zindanlarda ilerle ve efsanevi hazineleri keşfet.",
        "type": "RPG"
      }
    ];
    
    // Biraz gecikme ekleyelim ki yükleme efekti görünsün
    setTimeout(function() {
      displayGames(dummyData);
      showNotification("Oyunlar başarıyla yüklendi!", "success");
    }, 1000);
  });

  // Detay butonları için event listener ekleyelim
  $(document).on("click", ".btn-primary", function() {
    const gameTitle = $(this).closest(".card-body").find(".card-title span").text();
    if (gameTitle) {
      showDetails(gameTitle);
    }
  });

  // Sayaç başlat
  startCounter();
  
  // Bildirim sistemini kuralım
  setupNotificationSystem();
});

// Form doğrulama fonksiyonu
function validateForm() {
  let isValid = true;
  const email = $("#email").val();
  const name = $("#ad").val();
  const message = $("#mesaj").val();

  if (name && name.length < 3) {
    showNotification("Ad en az 3 karakter olmalıdır.", "error");
    isValid = false;
  }

  if (email && !validateEmail(email)) {
    showNotification("Geçerli bir e-posta adresi giriniz.", "error");
    isValid = false;
  }

  if (message && message.length < 10) {
    showNotification("Mesaj en az 10 karakter olmalıdır.", "error");
    isValid = false;
  }

  if (isValid) {
    showNotification("Form başarıyla gönderildi!", "success");
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
                    <div class="d-flex justify-content-between">
                      <span class="badge bg-primary">${games[i].type}</span>
                      <span>Çıkış: 2025</span>
                    </div>
                    <div class="mt-3">
                      <button class="btn btn-primary" onclick="showDetails('${games[i].name}')">Detay</button>
                    </div>
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
  const newColor = getRandomColor();
  document.querySelector('header').style.backgroundColor = newColor;
  showNotification(`Header rengi değiştirildi: ${newColor}`, "info");
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

// Bildirim sistemi kurulumu
function setupNotificationSystem() {
  // Bildirim konteyneri oluştur
  if (!$("#notification-container").length) {
    $("body").append('<div id="notification-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999;"></div>');
  }
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = "info") {
  // CSS sınıflarını belirle
  let bgClass = "bg-primary";
  
  switch(type) {
    case "success":
      bgClass = "bg-success";
      break;
    case "error":
      bgClass = "bg-danger";
      break;
    case "warning":
      bgClass = "bg-warning";
      break;
    case "info":
    default:
      bgClass = "bg-info";
  }
  
  // Bildirim HTML'ini oluştur
  const notificationId = "notification-" + Date.now();
  const notification = `
    <div id="${notificationId}" class="alert ${bgClass} text-white" style="min-width: 250px; margin-bottom: 10px; opacity: 0; transition: opacity 0.3s ease-in-out">
      ${message}
      <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  
  // Bildirimi container'a ekle
  $("#notification-container").append(notification);
  
  // Animasyon efekti
  setTimeout(() => {
    $(`#${notificationId}`).css("opacity", "1");
  }, 10);
  
  // Bildirimi kapat butonunu aktifleştir
  $(`#${notificationId} .btn-close`).click(function() {
    $(`#${notificationId}`).css("opacity", "0");
    setTimeout(() => {
      $(`#${notificationId}`).remove();
    }, 300);
  });
  
  // Otomatik kapanma
  setTimeout(() => {
    $(`#${notificationId}`).css("opacity", "0");
    setTimeout(() => {
      $(`#${notificationId}`).remove();
    }, 300);
  }, 5000);
}

// Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çalışacak
window.onload = function() {
  checkScreenSize();
  
  // Sayfa yüklendiğinde gösterilecek karşılama mesajı
  showNotification("GameVerse'e Hoş Geldiniz!", "success");
};
window.onresize = checkScreenSize;