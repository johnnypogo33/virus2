$(document).ready(function () {
  ControlleurFactory.instance().commencerJeu();
});

function accepterBarreEspacement() {
  $('body').keyup(function(e){
     if(e.keyCode == 32){
       // user has pressed space
       if (utilitaires().getEnPause()) {
         utilitaires().setEnPause(false);
         $('.alerte-en-pause').hide();
       }
       else {
         utilitaires().setEnPause(true);
         $('.alerte-en-pause').show();
       }
     }
  });
}
