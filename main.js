// Init speechSynth
const synth = speechSynthesis;
// DOM
const textForm = document.querySelector(".text-form");
const text = document.querySelector("#text");
const voiceSelect = document.querySelector("#voiceSelect");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('body');

// Init voices

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    // Loop through the voices
    voices.forEach(voice => {
        // Create an element called option to add into the select tag
        let option = document.createElement("option");
        // fiil the options with the voices
        option.textContent = voice.name + '('+voice.lang+')';

        // Set option attributes
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);

        voiceSelect.appendChild(option);
    })
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Say the text
let speak = () => {
    if (synth.speaking) {
        console.error("Speaking...");
        return;
    }

    if (text.value !== '') {
        body.style.background = '#000 url(img/tenor.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // get the text
        let speakText = new SpeechSynthesisUtterance(text.value);

        speakText.onend = e => {
            console.log("Done");
            body.style.background = '#000';
        }

        // If any error
        speakText.onerror = e => {
            console.error("An error occured");
        }

        // Active voice
        let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through the voice array

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set the pitch and rate values
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// EventListener

// text-from Submit

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    text.blur();
})

// Rate value change
rate.addEventListener("change", e => rateValue.textContent = rate.value);

// rate value change
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

// VoiceSelect on change

voiceSelect.addEventListener("change", e => speak());