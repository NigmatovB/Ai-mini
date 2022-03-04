const st = document.querySelector('#start')
const hed = document.querySelector('#on')
const p = document.querySelector('#p')
const h1 = document.querySelector('#h1')

let speech = new SpeechSynthesisUtterance();
speech.lang = "ru";
let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[63];
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = 'ru'

st.addEventListener( 'click', ( ) => {
  lis()
} )



function lis() {
  console.log('running');

  recognition.onspeechend = function () {
      recognition.stop();
  }
     recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      transcript = transcript.toLowerCase().trim()

      console.log(transcript);

    ;( async ( ) => {
      console.log(1);
        on++
        let data = await fetch('/data')
        data = await data.json()
        let count = 0

        console.log(data);

        for(let i in data){
            if( transcript === i ){
                console.log(1);
                    p.innerHTML = transcript
                    sp( data[i][0] )
                    anime(1)
                    setTimeout( ( ) => { 
                    anime(2)
                    }, data[i][1] )
                    count++
              } 
        }
        if ( count == 0 ) {
            console.log(2);
              sp( 'не понимаю таких заявлений' )
              anime(1)
              setTimeout( ( ) => { 
                  anime(2)
                  }, 3300 )
          }
    })()

    if ( on == 0 ) {
        console.log(2);
          sp( 'не слишала повтори пожалуйста' )
          anime(1)
          setTimeout( ( ) => { 
              anime(2)
              }, 3300 )
      }
  };
    recognition.start();
}

function sp( val ){
  speech.text = val
  window.speechSynthesis.speak(speech);
}

function anime( val ){
  if( val === 1 ){
    const div = document.createElement('div')
    div.classList.add("ob");
    let str = ``
    for(let i = 0; i < 6; i++ ){
      str +=  `<div class="boxContainer right">
                  <div class="box box1"></div>
                  <div class="box box2"></div>
                  <div class="box box3"></div>
                  <div class="box box4"></div>
                  <div class="box box5"></div>
              </div>`
    }
    div.innerHTML = str
    hed.append(div)
  } else {
    hed.innerHTML = ''
    setTimeout( ( ) => { 
      p.innerHTML = ''
     }, 500 )
  }
}

