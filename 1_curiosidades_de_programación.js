/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
    "javascript": [
        "es un lenguaje de programación interpretado y orientado a objetos que se utiliza principalmente en el desarrollo de aplicaciones web.",
        "se utiliza para agregar interactividad y dinamismo a las páginas web",
        "JavaScript se utiliza en el desarrollo de aplicaciones móviles, aplicaciones de escritorio y en la programación de servidores a través de Node.js"],
    
    "python": [
        "es un lenguaje de programación interpretado de alto nivel que se utiliza en una amplia variedad de aplicaciones, desde la ciencia de datos hasta la programación de servidores web.",
        "Fue creado en 1989 por Guido van Rossum, y es conocido por su sintaxis clara y concisa, así como por ser fácil de aprender.",
        "Python cuenta con una amplia biblioteca estándar, que proporciona módulos y paquetes para tareas comunes como la manipulación de archivos, la creación de interfaces gráficas de usuario y la conexión a bases de datos."],
        
    "java": [
        "Java fue creado por James Gosling en 1995 y es conocido por su portabilidad, lo que significa que puede ejecutarse en múltiples plataformas, incluyendo Windows, macOS, Linux y más.",
        "es un lenguaje de programación que utiliza una máquina virtual (JVM) para ejecutar el código fuente. ",
        "Java es un lenguaje de programación orientado a objetos de alto nivel, que se utiliza en una amplia variedad de aplicaciones empresariales, desde el desarrollo de aplicaciones móviles hasta la programación de servidores.",
        "Java es conocido por su capacidad para manejar grandes cantidades de datos y por su facilidad para crear aplicaciones seguras y escalables. "],
        
     "kotlin": [
        "es un lenguaje de programación de alto nivel y de tipado estático desarrollado por JetBrains, la misma empresa que desarrolla el popular IDE de Java, IntelliJ IDEA",
        "Kotlin se lanzó en 2011 como una alternativa a Java y ha ganado popularidad en los últimos años debido a su facilidad de uso, seguridad, interoperabilidad con Java y su enfoque en la programación moderna.",
        " Kotlin es compatible con la máquina virtual de Java (JVM) y puede interoperar con Java, lo que significa que los desarrolladores pueden utilizar bibliotecas y marcos de trabajo de Java existentes en aplicaciones Kotlin."],
    
    "ruby": [
        "Ruby es un lenguaje de programación interpretado y de código abierto que se utiliza principalmente en la programación web y en el desarrollo de aplicaciones de escritorio.",
        "Ruby es conocido por su facilidad de lectura y escritura debido a su sintaxis concisa y legible. ",
        "es un lenguaje de programación orientado a objetos que utiliza principios como la herencia, el polimorfismo y la encapsulación para crear aplicaciones reutilizables y escalables."],
    
    
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, puedo darte datos curiosos de algún lenguaje de programación, solo tienes que mencionarlo, por ejemplo, di algo como "Prueba JavaScript"';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const CustomLanguageIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLanguageIntent';
    },
    /**handle(handlerInput) {
        const { language } = handlerInput.requestEnvelope.request.intent.slots;
        
        let response;
        if(language && languageFacts[language.value]){
            response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)];
            
        }else{
            response = "No tengo esa información sobre el lenguaje que has mencionado, prueba con otro"
        }
        const repromptOutput = 'Quieres conocer sobre algún otro lenguaje de programación, solo di algo como "qué sabes sobre ruby"';
        
        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(repromptOutput)
            .getResponse();
    }**/
    handle(handlerInput) {
        const { language } = handlerInput.requestEnvelope.request.intent.slots;
        let response;
        if (language && languageFacts[language.value]) {
            response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)];
        } else {
            response = "No tengo esa información sobre el lenguaje que has mencionado, prueba con otro";
        }
        
        const speakOutput = response + ". ¿Quieres conocer sobre otro lenguaje de programación?, solo di algo como 'que sabes de ruby' ";
        const repromptOutput = 'Si deseas conocer sobre otro lenguaje de programación, simplemente menciona su nombre.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
    
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'puedo darte datos curiosos de algún lenguaje de programación, solo tienes que mencionarlo, por ejemplo, prueba diciendo "JavaScript"';

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
        const speakOutput = 'Gracias por visitar curiosidades de programación, ¡vuelve pronto!';

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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

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
        const speakOutput = `You just triggered ${intentName}`;

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

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();