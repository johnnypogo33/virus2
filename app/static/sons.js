function sons(){
  return {
    // fichier: un string qui correspond au fichier de musique ou son, par
    // exemple: 'audio/blazer.wav'
    play: function(fichier) {
      var audio = new Audio(fichier);

      if(this.prePlay(audio)){
        audio.play();
      }
    },

    // objet audio,
    // exemple: new Audio('audio/blazer.wav')
    // retourner true si la musique doit être jouée
    prePlay: function(audio) {
      return true;
    }
  }
}
