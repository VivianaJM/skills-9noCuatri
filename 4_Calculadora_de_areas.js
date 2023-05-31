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
      WELCOME_MESSAGE: 'Welcome to the area calculator. You can say "Calculate the area of a rectangle with width 5 and length 9"',
      CONVERSION_RESULT_R1: 'Please provide valid numerical values for the width and length of the rectangle.',
      CONVERSION_RESULT_R2: 'Please provide the width and length of the rectangle.',
      CONVERSION_RESULT_R3: 'The area of the rectangle is: ',
      UNIT_2: 'square units.',
      CONVERSION_RESULT_T1: 'Please provide valid numerical values for the base and height of the triangle.',
      CONVERSION_RESULT_T2: 'Please provide the base and height of the triangle.',
      CONVERSION_RESULT_T3: 'The area of the triangle is: ',
      CONVERSION_RESULT_C1: 'Please provide a valid numerical value for the radius of the circle.',
      CONVERSION_RESULT_C2: 'Please provide the radius of the circle.',
      CONVERSION_RESULT_C3: 'The area of the circle is: ',
      CONVERSION_NULL: 'I cannot calculate the area of that figure. Please try again with rectangle, triangle or circle.',
      REPROMPT: 'Do you want to calculate another area?',
      STOP_MESSAGE: 'Thank you for visiting area calculator, come back soon!',
      HELP_MESSAGE: 'You can say "calculate area of a rectangle", "calculate area of a triangle with base 4 and height 8" or "calculate area of a circle with radius 3".',
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      VALUE_ZERO: 'enter a value that is greater than zero'
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Bienvenido a la calculadora de áreas. Puedes decir "Calcula el área de un rectángulo con ancho 5 y largo 9"',
      CONVERSION_RESULT_R1: 'Por favor, proporciona valores numéricos válidos para el ancho y el largo del rectángulo.',
      CONVERSION_RESULT_R2: 'Por favor, proporciona el ancho y el largo del rectángulo.',
      CONVERSION_RESULT_R3: 'El área del rectángulo es: ',
      UNIT_2: ' unidades cuadradas',
      CONVERSION_RESULT_T1:'Por favor, proporciona valores numéricos válidos para la base y la altura del triángulo.',
      CONVERSION_RESULT_T2: 'Por favor, proporciona la base y la altura del triángulo.',
      CONVERSION_RESULT_T3: 'El área del triángulo es: ',
      CONVERSION_RESULT_C1: 'Por favor, proporciona un valor numérico válido para el radio del círculo.',
      CONVERSION_RESULT_C2: 'Por favor, proporciona el radio del círculo.',
      CONVERSION_RESULT_C3: 'El área del círculo es: ',
      CONVERSION_NULL: 'No puedo calcular el área de esa figura. Por favor, intenta nuevamente con rectángulo, triángulo o círculo.',
      REPROMPT: '¿Deseas calcular otra área?',
      STOP_MESSAGE: 'Gracias por visitar calculadora de areas, ¡vuelve pronto!',
      HELP_MESSAGE: 'Puedes decir "calcular área de un rectángulo", "calcular área de un triángulo de base 4 y altura 8" o "calcular área de un círculo con radio 3".',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      VALUE_ZERO: ' ingresa un valor que sea mayor a cero'
    }
  }
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AreaIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AreaIntent'
    );
  },
  handle(handlerInput) {
    const {
      figure,
      rectWidth,
      rectHeight,
      trianBase,
      trianHeight,
      circRadius
    } = handlerInput.requestEnvelope.request.intent.slots;
    
    const selectedFigure = figure.value;
    const rectangleWidth = rectWidth ? rectWidth.value : null;
    const rectangleHeight = rectHeight ? rectHeight.value : null;
    const triangleBase = trianBase ? trianBase.value : null;
    const triangleHeight = trianHeight ? trianHeight.value : null;
    const circleRadius = circRadius ? circRadius.value : null;

    let speakOutput = '';

    if (
      selectedFigure === 'rectángulo' ||
      selectedFigure === 'rectangulo' ||
      selectedFigure === 'rectangle'
    ) {
      if (rectangleWidth && rectangleHeight) {
        const rWidth = parseFloat(rectangleWidth);
        const rHeight = parseFloat(rectangleHeight);

        if (!isNaN(rWidth) && rWidth > 0 && !isNaN(rHeight) && rHeight > 0) {
          const rectangleArea = rWidth * rHeight;
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput =
            requestAttributes.t('CONVERSION_RESULT_R3') +
            rectangleArea + ' ' +
            requestAttributes.t('UNIT_2');
        } else {
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput = requestAttributes.t('VALUE_ZERO');
        }
      } else {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        speakOutput = requestAttributes.t('CONVERSION_RESULT_R2');
      }
    } else if (
      selectedFigure === 'triángulo' ||
      selectedFigure === 'triangulo' ||
      selectedFigure === 'triangle'
    ) {
      if (triangleBase && triangleHeight) {
        const tBase = parseFloat(triangleBase);
        const tHeight = parseFloat(triangleHeight);

        if (!isNaN(tBase) && tBase > 0 && !isNaN(tHeight) && tHeight > 0) {
          const triangleArea = (tBase * tHeight) / 2;
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput =
            requestAttributes.t('CONVERSION_RESULT_T3') +
            triangleArea + ' ' +
            requestAttributes.t('UNIT_2');
        } else {
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput = requestAttributes.t('VALUE_ZERO');
        }
      } else {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        speakOutput = requestAttributes.t('CONVERSION_RESULT_T2');
      }
    } else if (
      selectedFigure === 'círculo' ||
      selectedFigure === 'circulo' ||
      selectedFigure === 'circle'
    ) {
      if (circleRadius) {
        const cRadius = parseFloat(circleRadius);

        if (!isNaN(cRadius) && cRadius > 0) {
          const circleArea = Math.PI * Math.pow(cRadius, 2);
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput =
            requestAttributes.t('CONVERSION_RESULT_C3') +
            circleArea.toFixed(2) + ' ' +
            requestAttributes.t('UNIT_2');
        } else {
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          speakOutput = requestAttributes.t('VALUE_ZERO');
        }
      } else {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        speakOutput = requestAttributes.t('CONVERSION_RESULT_C2');
      }
    } else {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      speakOutput = requestAttributes.t('CONVERSION_NULL');
    }

    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const res = requestAttributes.t('REPROMPT');

    return handlerInput.responseBuilder
      .speak(speakOutput + ' ' + res)
      .reprompt()
      .withShouldEndSession(false) // Mantener la sesión activa
      .getResponse();
  }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput =  requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        AreaIntentHandler,
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