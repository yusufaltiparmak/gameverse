// Oyun detay fonksiyonu
function showDetails(game) {
  alert('Seçilen oyun: ' + game);
}

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
  games.forEach(game => {
    output += `
      <div class="col-md-4">
        <div class="card game-card">
          <img src="${game.image}" class="card-img-top" alt="${game.name}">
          <div class="card-body">
            <h5 class="card-title"><span>${game.name}</span></h5>
            <p class="card-text"><span>${game.description}</span></p>
            <div class="d-flex justify-content-between">
              <span class="badge bg-primary">${game.type}</span>
              <span>Çıkış: 2025</span>
            </div>
            <div class="mt-3">
              <button class="btn btn-primary" onclick="showDetails('${game.name}')">Detay</button>
            </div>
          </div>
        </div>
      </div>`;
  });
  $("#moreGames").html(output);
}

// Rastgele renk oluşturma fonksiyonu
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({length: 6}, () => letters[Math.floor(Math.random() * 16)]).join('');
}

// Header renk değiştirme
function changeHeaderColor() {
  const newColor = getRandomColor();
  document.querySelector('header').style.backgroundColor = newColor;
  showNotification(`Header rengi değiştirildi: ${newColor}`, "info");
}

// Ekran boyutu kontrol fonksiyonu
function checkScreenSize() {
  const isSmall = window.innerWidth < 768;
  document.querySelectorAll('.game-card').forEach(card => {
    card.classList.toggle('small-screen', isSmall);
  });
}

// Bildirim sistemi kurulumu
function setupNotificationSystem() {
  if (!$("#notification-container").length) {
    $("body").append('<div id="notification-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999;"></div>');
  }
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = "info") {
  let bgClass = {
    success: "bg-success",
    error: "bg-danger",
    warning: "bg-warning",
    info: "bg-info"
  }[type] || "bg-info";

  const id = "notification-" + Date.now();
  const html = `
    <div id="${id}" class="alert ${bgClass} text-white" style="min-width: 250px; margin-bottom: 10px; opacity: 0; transition: opacity 0.3s ease-in-out">
      ${message}
      <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  $("#notification-container").append(html);
  setTimeout(() => $(`#${id}`).css("opacity", "1"), 10);

  $(`#${id} .btn-close`).click(() => {
    $(`#${id}`).css("opacity", "0");
    setTimeout(() => $(`#${id}`).remove(), 300);
  });

  setTimeout(() => {
    $(`#${id}`).css("opacity", "0");
    setTimeout(() => $(`#${id}`).remove(), 300);
  }, 5000);
}

// Sayfa hazır olduğunda çalışacak
$(document).ready(function() {
  $("#showGamesBtn").click(function() {
    $("#featured").slideToggle("slow");
  });

  $("#themeSwitcher").click(function() {
    $("body").toggleClass("dark-theme light-theme");
    const theme = $("body").hasClass("light-theme") ? "Açık Tema" : "Koyu Tema";
    showNotification(`Tema değiştirildi: ${theme}`, "info");
  });

  $("#iletisimForm").submit(function(event) {
    event.preventDefault();
    validateForm();
  });

  $(".game-card").hover(function() {
    $(this).animate({ marginTop: "-10px" }, 200);
  }, function() {
    $(this).animate({ marginTop: "0px" }, 200);
  });

  $("#loadMoreBtn").click(function() {
    showNotification("Oyunlar yükleniyor...", "info");
    const dummyData = [
      { name: "Stellar Odyssey", image: "IMG/game4.jpg", description: "Uzay macerası dolu stratejik bir keşif oyunu.", type: "Strateji" },
      { name: "City Builder Pro", image: "IMG/game5.jpg", description: "Kendi şehrini inşa et ve yönet.", type: "Simülasyon" },
      { name: "Dungeon Master", image: "IMG/game6.jpg", description: "Zindanlarda ilerle ve efsanevi hazineleri keşfet.", type: "RPG" }
    ];
    setTimeout(() => {
      displayGames(dummyData);
      showNotification("Oyunlar başarıyla yüklendi!", "success");
    }, 1000);
  });

  $(document).on("click", ".btn-primary", function() {
    const gameTitle = $(this).closest(".card-body").find(".card-title span").text();
    if (gameTitle) {
      showDetails(gameTitle);
    }
  });

  startCounter();
  setupNotificationSystem();
});

// Pencere yüklendiğinde ve yeniden boyutlandığında
window.onload = () => {
  checkScreenSize();
  showNotification("GameVerse'e Hoş Geldiniz!", "success");
};

window.onresize = checkScreenSize;

// Header buton yüksekliği eşitleme
window.addEventListener("load", function () {
  const toggleBtn = document.getElementById("showGamesBtn");
  const colorBtn = document.querySelector("button[onclick='changeHeaderColor()']");
  if (toggleBtn && colorBtn) {
    const maxHeight = Math.max(toggleBtn.offsetHeight, colorBtn.offsetHeight);
    toggleBtn.style.height = maxHeight + "px";
    colorBtn.style.height = maxHeight + "px";
  }
});
