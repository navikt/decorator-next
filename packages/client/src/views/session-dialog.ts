import { defineCustomElement } from "../custom-elements";
import { getSecondsRemaining } from "../helpers/time";
import { env } from "../params";

export class SessionDialog extends HTMLElement {
    sessionExpireAtLocal?: string;
    private interval?: number;
    private silenceWarning = false;

    private get secondsRemaining() {
        return this.sessionExpireAtLocal
            ? getSecondsRemaining(this.sessionExpireAtLocal)
            : Infinity;
    }

    connectedCallback() {
        const dialog = this.querySelector("dialog") as HTMLDialogElement;
        const form = dialog.querySelector("form") as HTMLFormElement;

        form.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();
            const action = new FormData(form, event.submitter).get("action");
            if (action === "renew") {
                this.silenceWarning = true;
                dialog.close();
            } else {
                window.location.href = `${env("LOGOUT_URL")}`;
            }
        });

        this.interval = window.setInterval(() => {
            if (this.secondsRemaining < 0) {
                window.location.href = `${env("LOGOUT_URL")}`;
            } else if (!this.silenceWarning && this.secondsRemaining < 5 * 60) {
                dialog.querySelector(".session-time-remaining")!.innerHTML =
                    Math.ceil(this.secondsRemaining / 60).toString();

                dialog.showModal();
            } else {
                dialog.close();
            }
        }, 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }
}

defineCustomElement("session-dialog", SessionDialog);