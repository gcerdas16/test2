import { addKeyword, EVENTS } from "@builderbot/bot";
import aiServices from "~/services/aiServices";
import sheetsService from "~/services/sheetsService";
import { config } from "../config";
import path from "path";
import fs, { stat } from "fs";
//import { start, reset, stop } from "~/services/idle-custom";
import { QueueConfig, createMessageQueue } from "fast";
import { humanoflow2 } from "./humanoflow";

const queueConfig: QueueConfig = { gapMilliseconds: 15000 };
const enqueueMessage = createMessageQueue(queueConfig);


const pathPrompt = path.join(
  process.cwd(),
  "assets/prompts",
  "prompt_OpenAi.txt"
);
const prompt = fs.readFileSync(pathPrompt, "utf8");

export const faqFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { endFlow, flowDynamic, gotoFlow }) => {

    enqueueMessage(ctx, async (body) => {
      const EnqueueMessageBody = body
      console.log('Processed messages:', EnqueueMessageBody, ctx.from);
      //await flowDynamic(`Received messages: ${EnqueueMessageBody}`);

      const history = await sheetsService.getUserConv(ctx.from);
      history.push({ role: "user", content: EnqueueMessageBody });
      try {
        const AI = new aiServices(config.ApiKey);
        const response = await AI.chat(prompt, history);
        await sheetsService.addConverToUser(ctx.from, [
          { role: "user", content: EnqueueMessageBody },
          { role: "assistant", content: response },
        ]);
        if (response.includes("humanotest")) {
          return gotoFlow(
            humanoflow2
          );
        }
        return endFlow(response);

      } catch (error) {
        console.log("Error en llamada GPT", error);
        return endFlow("Por favor, intenta de nuevo");
      }
    });
  });

