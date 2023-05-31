/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Welcome to the unit converter from the decimal system to the English system, you can say something like: "convert 2 meters to feet".',
      CONVERSION_RESULT: 'Sorry, I can\'t perform that conversion.',
      EQUALS: 'is equals to',
      REPROMPT: 'Do you want to do another conversion? Just say something like: "convert 10 centimeters to inches."',
      STOP_MESSAGE: 'Thank you for visiting unit converter, I hope I have helped you. come back soon!',
      HELP_MESSAGE: 'Can you tell me a unit in the decimal system and the unit you want to convert to, for example: "convert 2 meters to yards".',
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      VALUE_ZERO: 'enter a value that is greater than zero'
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Bienvenido al convertidor de unidades del sistema decimal al sistema ingles, puedes decir algo como: "convierte 2 metros a pies".',
      CONVERSION_RESULT: 'Lo siento, no puedo realizar esa conversión.',
      EQUALS: 'equivale a ',
      REPROMPT: '¿Quieres realizar otra conversión?, solo di algo como: "convierte 10 centímetros a pulgadas".',
      STOP_MESSAGE: 'Gracias por visitar convertidor de unidades, espero haberte ayudado. ¡vuelve pronto!',
      HELP_MESSAGE: 'Puedes decirme una unidad en el sistema decimal y la unidad a la que deseas convertir, por ejemplo: "convierte 2 metros a yardas".',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      VALUE_ZERO: ' ingresa un valor que sea mayor a cero'
    }
  }
}


const conversionTable = {
    cm: {
        inches: 0.393701,
        feet: 0.0328084,
        miles: 0.0000062137,
        yard: 0.0109361
    },
    m: {
        inches: 39.3701,
        feet: 3.28084,
        miles: 0.000621371,
        yard: 1.09361
    },
    km: {
        inches: 39370.1,
        feet: 3280.84,
        miles: 0.621371,
        yard: 1093.61
    },
    
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};

const ConvertUnitsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertUnitsIntent'
    );
  },
  handle(handlerInput) {
    const { value, unitFrom, unitTo } = handlerInput.requestEnvelope.request.intent.slots;
    const valueToConvert = parseFloat(value.value);

    let conversionResult = '';
    let result; // Variable para almacenar el resultado de la conversión
    
    //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    //const unitCm = requestAttributes.t('UNIT_CM');
    //const unitPul = requestAttributes.t('UNIT_PUL');

    switch (unitFrom.value) {
      case 'centimeters':
      case 'centimetros':
      case 'centimeter':
      case 'centimetro':
        switch (unitTo.value) {
          case 'pulgadas':
          case 'pulgada':
          case 'inches':
          case 'inche':
            result = conversionTable.cm.inches;
            break;
          case 'pies':
          case 'pie':
          case 'feet':
          case 'feets':
            result = conversionTable.cm.feet;
            break;
          case 'millas':
          case 'milla':
          case 'miles':
          case 'mile':
            result = conversionTable.cm.miles;
            break;
          case 'yardas':
          case 'yarda':
          case 'yard':
          case 'yards':
            result = conversionTable.cm.yard;
            break;
      default:
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        conversionResult = requestAttributes.t('CONVERSION_RESULT');
    }
    break;
      case 'metros':
      case 'meters':
      case 'meter':
        switch (unitTo.value) {
          case 'pulgadas':
          case 'pulgada':
          case 'inches':
          case 'inche':
            result = conversionTable.m.inches;
            break;
          case 'pies':
          case 'pie':
          case 'feet':
          case 'feets':
            result = conversionTable.m.feet;
            break;
          case 'millas':
          case 'milla':
          case 'miles':
          case 'mile':
            result = conversionTable.m.miles;
            break;
          case 'yardas':
          case 'yarda':
          case 'yard':
          case 'yards':
            result = conversionTable.m.yard;
            break;
          default:
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            conversionResult = requestAttributes.t('CONVERSION_RESULT');
        }
        break;
      case 'kilometros':
      case 'kilometers':
      case 'kilometer':
        switch (unitTo.value) {
          case 'pulgadas':
          case 'pulgada':
          case 'inches':
          case 'inche':
            result = conversionTable.km.inches;
            break;
          case 'pies':
          case 'pie':
          case 'feet':
          case 'feets':
            result = conversionTable.km.feet;
            break;
          case 'millas':
          case 'milla':
          case 'miles':
          case 'mile':
            result = conversionTable.km.miles;
            break;
          case 'yardas':
          case 'yarda':
          case 'yard':
          case 'yards':
            result = conversionTable.km.yard;
            break;
          default:
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            conversionResult = requestAttributes.t('CONVERSION_RESULT');
        }
        break;
      default:
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        conversionResult = requestAttributes.t('CONVERSION_RESULT');
        break;
    }

    if (conversionResult === '' && valueToConvert > 0) {
      const convertedValue = parseFloat((result * valueToConvert).toFixed(3));
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      conversionResult = valueToConvert + ' ' + unitFrom.value +' '+ requestAttributes.t('EQUALS') +' '+ convertedValue +' '+  unitTo.value;
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            conversionResult = requestAttributes.t('VALUE_ZERO');
    }
    
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('REPROMPT');
    return handlerInput.responseBuilder
      .speak(conversionResult + '. ' + speakOutput)
      .reprompt()
      .getResponse();
  },
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText =  requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput =  requestAttributes.t('STOP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConvertUnitsIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();