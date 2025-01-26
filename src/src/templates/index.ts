import { sendVoiceFlow } from "./list_templates/sendVoiceFlow";
import { sendImageFlow } from "./list_templates/sendImageFlow";
import { sendPdfFlow } from "./list_templates/sendPdfFlow";
//import { DetectIntention } from "./intention.flow";
import { registerFlow } from "./registerFlow";
import { createFlow } from "@builderbot/bot";
import { mainFlow } from "./mainFlow";
//import { menuFlow } from "./menuFlow";
import { faqFlow } from "./faqFlow";
import { humanoflow2 } from "./humanoflow";

export default createFlow([
    mainFlow,
    faqFlow,
    registerFlow,
    sendImageFlow,
    sendPdfFlow,
    sendVoiceFlow,
    humanoflow2,
]);