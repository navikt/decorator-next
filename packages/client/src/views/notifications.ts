import { logAmplitudeEvent } from "../analytics/amplitude";
import { analyticsEvents } from "../analytics/constants";
import { endpointUrlWithParams } from "../helpers/urls";

class ArchivableNotification extends HTMLElement {
    // TODO: hva skal vi vise hvis arkivering feiler?
    private handleError() {}

    connectedCallback() {
        const id = this.getAttribute("data-id");
        if (!id) {
            return;
        }

        this.querySelector("button")?.addEventListener("click", () =>
            fetch(endpointUrlWithParams(`/api/notifications/${id}/archive`), {
                method: "POST",
                credentials: "include",
            }).then((res) => {
                if (!res.ok) {
                    this.handleError();
                    return;
                }

                this.parentElement?.remove();
                logAmplitudeEvent(...analyticsEvents.arkivertBeskjed);
            }),
        );
    }
}

customElements.define("archivable-notification", ArchivableNotification);

class LinkNotification extends HTMLElement {
    // TODO: hva skal vi vise hvis poste done-event feiler?
    private handleError() {}

    connectedCallback() {
        const anchorElement = this.querySelector("a");
        if (!anchorElement) {
            return;
        }

        const id = this.getAttribute("data-id");
        if (!id) {
            return;
        }

        const type = this.getAttribute("data-type");

        anchorElement.addEventListener("click", () => {
            if (type === "inbox") {
                logAmplitudeEvent("navigere", {
                    komponent: "varsel-innboks",
                    kategori: "varselbjelle",
                    destinasjon: anchorElement.href,
                });
                return;
            }

            fetch(endpointUrlWithParams(`/api/notifications/${id}/archive`), {
                method: "POST",
                credentials: "include",
            }).then((res) => {
                if (!res.ok) {
                    this.handleError();
                    return;
                }

                this.parentElement?.remove();
                logAmplitudeEvent("navigere", {
                    komponent:
                        this.getAttribute("data-type") === "task"
                            ? "varsel-oppgave"
                            : "varsel-beskjed",
                    kategori: "varselbjelle",
                    destinasjon: anchorElement.href,
                });
            });
        });
    }
}

customElements.define("link-notification", LinkNotification);
