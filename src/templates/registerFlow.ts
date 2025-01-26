import { addKeyword, EVENTS } from "@builderbot/bot";
import sheetsService from "../services/sheetsService";

const registerFlow = addKeyword(EVENTS.ACTION)
  .addAnswer(
    `¡Hola! Soy un asistente virtual de *INK STUDIO*, ¿cómo puedo ayudarle hoy?`,
    null,
    async (ctx, ctxFn) => {
      await sheetsService.createUser(ctx.from, ctx.name);
      //await ctxFn.flowDynamic(
      //  "Excelente! Tus datos ya fueron cargados, ya podes comenzar a utilizar el bot"
      //);
    }
  );

export { registerFlow };