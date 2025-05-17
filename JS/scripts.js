function selamla() { alert("Selam!"); }
function uyar() { console.log("Uyarý!"); }
function kontrolEt() { return true; }
function sayac() { let i=0; i++; }
function oyunSec() { alert("Oyun seçildi."); }
function oyunBaslat() { alert("Baþladý!"); }
function oyunDurdur() { alert("Durduruldu!"); }
function oyunBitir() { alert("Bitti!"); }
function zamanGoster() { console.log(Date.now()); }
function mesajGoster() { console.log("Mesaj gösterildi."); }

$(document).ready(function(){
    $("#main-content").hide();
    $("#main-content").fadeIn();
    $(".game-box").click(function(){ $(this).css("background-color", "yellow"); });
    $(".game-box").hover(function(){ $(this).css("border", "1px solid red"); });
    $("table").fadeOut().fadeIn();
});
