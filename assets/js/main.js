
(function(){
  function setupWhatsApp(buttonId, revealId){
    const btn = document.getElementById(buttonId);
    const reveal = document.getElementById(revealId);
    if(!btn || !reveal) return;
    const num = btn.getAttribute('data-wa');
    btn.addEventListener('click', function(){
      // Reveal the number in text (first time user sees it)
      reveal.classList.remove('visually-hidden');
      reveal.textContent = 'WhatsApp: ' + num.replace('+91', '');
      // Also open WhatsApp chat in a new tab
      const link = 'https://wa.me/' + num.replace('+','');
      window.open(link, '_blank');
    });
  }
  setupWhatsApp('wa-home-btn','wa-home-reveal');
  setupWhatsApp('wa-contact-btn','wa-contact-reveal');
  setupWhatsApp('wa-footer-btn','wa-footer-reveal');
})();
