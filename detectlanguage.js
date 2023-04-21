const LanguageDetect = require('languagedetect');
const translator = require('translatte');
const lngDetector = new LanguageDetect();



// pass message in detect the language to max of 3.
// check the confidence on the language, if below 5% ignore
//


function DetectLang(message){
    let confidence = lngDetector.detect(message,3);
    //console.log(confidence[0]);
    //console.log(confidence[1]);
    //console.log(confidence[2]);

    let lang1 = confidence[0];
    let lang2 = confidence[1];
    let lang3 = confidence[2];

    LogLangs(lang1);
    LogLangs(lang2);
    LogLangs(lang3);

   return confidence;

}


function LogLangs(lang){
    console.log(lang[0]);
    console.log((lang[1] * 100) + " % confidence");
}


function GetLangShort(longLang){
    langsObj = {
        'auto': 'automatic',
        'af': 'afrikaans',
        'sq': 'albanian',
        'am': 'amharic',
        'ar': 'arabic',
        'hy': 'armenian',
        'az': 'azerbaijani',
        'eu': 'basque',
        'be': 'belarusian',
        'bn': 'bengali',
        'bs': 'bosnian',
        'bg': 'bulgarian',
        'ca': 'catalan',
        'ceb': 'cebuano',
        'ny': 'chichewa',
        'zh': 'chinese (Simplified)',
        'zh-cn': 'chinese (Simplified)',
        'zh-tw': 'chinese (Traditional)',
        'co': 'corsican',
        'hr': 'croatian',
        'cs': 'czech',
        'da': 'danish',
        'nl': 'dutch',
        'en': 'english',
        'eo': 'esperanto',
        'et': 'estonian',
        'tl': 'filipino',
        'fi': 'finnish',
        'fr': 'french',
        'fy': 'frisian',
        'gl': 'galician',
        'ka': 'georgian',
        'de': 'german',
        'el': 'greek',
        'gu': 'gujarati',
        'ht': 'haitian Creole',
        'ha': 'hausa',
        'haw': 'hawaiian',
        'he': 'hebrew',
        'iw': 'hebrew',
        'hi': 'hindi',
        'hmn': 'hmong',
        'hu': 'hungarian',
        'is': 'icelandic',
        'ig': 'igbo',
        'id': 'indonesian',
        'ga': 'irish',
        'it': 'italian',
        'ja': 'japanese',
        'jw': 'javanese',
        'kn': 'kannada',
        'kk': 'kazakh',
        'km': 'khmer',
        'ko': 'korean',
        'ku': 'kurdish (Kurmanji)',
        'ky': 'kyrgyz',
        'lo': 'kao',
        'la': 'katin',
        'lv': 'latvian',
        'lt': 'lithuanian',
        'lb': 'luxembourgish',
        'mk': 'macedonian',
        'mg': 'malagasy',
        'ms': 'malay',
        'ml': 'malayalam',
        'mt': 'maltese',
        'mi': 'maori',
        'mr': 'marathi',
        'mn': 'mongolian',
        'my': 'myanmar (Burmese)',
        'ne': 'nepali',
        'no': 'norwegian',
        'ps': 'pashto',
        'fa': 'persian',
        'pl': 'polish',
        'pt': 'portuguese',
        'pa': 'punjabi',
        'ro': 'romanian',
        'ru': 'russian',
        'sm': 'samoan',
        'gd': 'scots Gaelic',
        'sr': 'serbian',
        'st': 'sesotho',
        'sn': 'shona',
        'sd': 'sindhi',
        'si': 'sinhala',
        'sk': 'slovak',
        'sl': 'slovenian',
        'so': 'somali',
        'es': 'spanish',
        'su': 'sundanese',
        'sw': 'swahili',
        'sv': 'swedish',
        'tg': 'tajik',
        'ta': 'tamil',
        'te': 'telugu',
        'th': 'thai',
        'tr': 'turkish',
        'uk': 'ukrainian',
        'ur': 'urdu',
        'uz': 'uzbek',
        'vi': 'vietnamese',
        'cy': 'welsh',
        'xh': 'xhosa',
        'yi': 'yiddish',
        'yo': 'yoruba',
        'zu': 'zulu'
    };

    let count = 0;
    let shortCode = [];

    console.log("Received: " + longLang);

    for (const [key, value] of Object.entries(langsObj)) {

        if(value === longLang){
            console.log(`${key}: ${value}`);
            console.log(`lang short code is ${key}`);
            shortCode[count] = key;
            count++;
        }
        
      }

    return shortCode;  

}

function PerformTranslatation(message){

    let spoken = DetectLang(message);
    let lang1;
    let lang2;
    let lang3;
    let shortCodes =[];
    let lang1Short;
    let lang2Short;
    let lang3Short;

    console.log("Length of Spoken is " + spoken.length);

    if (spoken[0] !== null){
        lang1 = spoken[0];
    }
    if (spoken[1] !== null){
        lang2 = spoken[1];
    }
    if (spoken[2] !== null){
        lang3 = spoken[2];
    }

    if (lang1 !== null){
        lang1Short = GetLangShort(lang1[0]); 
        shortCodes[0] = lang1Short;
        console.log(lang1Short);
    }
    if (lang2 !== null){
        lang2Short = GetLangShort(lang2[0]);
        shortCodes[1] = lang2Short;
        console.log(lang2Short);
    }
    if (lang3 !== null){
        lang3Short = GetLangShort(lang3[0]);
        shortCodes[2] = lang3Short;
        console.log(lang3Short);
    }

    let translations = [];

    if (shortCodes !== null){
        for (let index = 0; index < shortCodes.length; index++) {
       
            translator(message, {
                from: shortCodes[index].toString(),
                to: 'en'
            }).then(res => {
                console.log(res);
                translations[index] = res;
                FormatResponse(translations);
            }).catch(err => {
                console.error(err);
            });
        
        }
    }else{
        console.log("Short codes was null, check if this was an error")
    }

    

    
}
function FormatResponse(translation){
    let lang1Translation = translation[0];
    let lang1keys = Object.keys(lang1Translation);
    //console.log("Keys: "+lang1keys);
    console.log("Translated Text = " + lang1Translation[0]);
}

    

module.exports={
    PerformTranslatation
}
