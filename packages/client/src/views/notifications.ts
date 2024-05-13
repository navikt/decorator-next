import { analyticsEvents } from "../analytics/constants";
import * as api from "../api";
import { logAmplitudeEvent } from "../analytics/amplitude";

class ArchivableNotificaton extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute("data-id");
        if (id) {
            this.querySelector("button")?.addEventListener("click", () =>
                api.archive({ eventId: id }).then(() => {
                    this.parentElement?.remove();
                    logAmplitudeEvent(...analyticsEvents.arkivertBeskjed);
                }),
            );
        }
    }
}

customElements.define("archivable-notification", ArchivableNotificaton);

class LinkNotification extends HTMLElement {
    connectedCallback() {
        const a = this.querySelector("a");
        if (a) {
            a.addEventListener("click", () => {
                logAmplitudeEvent("navigere", {
                    komponent:
                        this.getAttribute("data-type") === "task"
                            ? "varsel-oppgave"
                            : "varsel-beskjed",
                    kategori: "varselbjelle",
                    destinasjon: a.href,
                });
            });
        }
    }
}

customElements.define("link-notification", LinkNotification);
