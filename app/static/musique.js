var MusiqueFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(sons());

    objet.pause = function() {
      if(this.audio){
        this.audio.pause()
      }
    }

    objet.audio = false;

    objet.prePlay = function(audio) {
      if (!this.audio) {
        audio.loop = true;
        this.audio = audio;
        return true;
      }

      if(audio.getAttribute('src') == this.audio.getAttribute('src')) {
        return false;
      }

      this.pause();
      audio.loop = true;
      this.audio = audio;
      return true;
    };

    return objet;

  }

  return {
    instance: function (create_new) {
      if (!instance) {
        instance = createInstance();
      }
      if (create_new) {
        return createInstance();
      }
      return instance;
    }
  };
})();

function musique(create_new = false) {
  return MusiqueFactory.instance(create_new);
}
