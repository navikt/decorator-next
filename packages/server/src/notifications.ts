import { z } from "zod";
import { env } from "./env/server";
import { Result, ResultType } from "./result";
import { fetchAndValidateJson } from "./lib/fetch-and-validate";

const varselSchema = z
    .object({
        eventId: z.string(),
        type: z.enum(["oppgave", "beskjed", "innboks"]),
        tidspunkt: z.string(),
        isMasked: z.boolean(),
        tekst: z.string().nullable(),
        link: z.string().nullable(),
        eksternVarslingKanaler: z.array(z.string()),
    })
    .nullable()
    .catch((ctx) => {
        // Don't log fields which may contain sensitive information
        const redactedInput = { ...ctx.input, tekst: null, link: null };
        console.error(
            `Error validating notification - ${JSON.stringify(redactedInput)}`,
        );
        return null;
    });

const varslerSchema = z.object({
    oppgaver: z.array(varselSchema),
    beskjeder: z.array(varselSchema),
});

type VarselNullable = z.infer<typeof varselSchema>;
type Varsel = NonNullable<VarselNullable>;

export type Varsler = z.infer<typeof varslerSchema>;

export type MaskedNotification = {
    id: string;
    type: NotificationType;
    date: string;
    channels: string[];
    masked: true;
};

export type UnmaskedNotification = {
    id: string;
    type: NotificationType;
    date: string;
    channels: string[];
    masked: false;
    text: string;
    link?: string;
};

export type Notification = MaskedNotification | UnmaskedNotification;

type NotificationType = "message" | "task" | "inbox";

const translateNotificationType = {
    beskjed: "message",
    oppgave: "task",
    innboks: "inbox",
};

const sortNewestFirst = (a: Varsel, b: Varsel) =>
    a.tidspunkt > b.tidspunkt ? -1 : 1;

const filterAndSort = (varsler: VarselNullable[]): Varsel[] =>
    varsler
        .filter((varsel): varsel is Varsel => !!varsel)
        .sort(sortNewestFirst);

const varslerToNotifications = (varsler: Varsler): Notification[] =>
    [filterAndSort(varsler.oppgaver), filterAndSort(varsler.beskjeder)].flatMap(
        (list) =>
            list.map(
                (varsel): Notification => ({
                    id: varsel.eventId,
                    type: translateNotificationType[
                        varsel.type
                    ] as NotificationType,
                    date: varsel.tidspunkt,
                    channels: varsel.eksternVarslingKanaler,
                    ...(varsel.isMasked
                        ? { masked: true }
                        : {
                              masked: false,
                              text: varsel.tekst ?? "",
                              link: varsel.link ?? undefined,
                          }),
                }),
            ),
    );

export const fetchNotifications = async ({
    cookie,
}: {
    cookie: string;
}): Promise<ResultType<Notification[]>> => {
    return fetchAndValidateJson(
        `${env.VARSEL_API_URL}/varselbjelle/varsler`,
        {
            headers: { cookie },
        },
        varslerSchema,
    ).then((result) =>
        result.ok
            ? {
                  ...result,
                  data: varslerToNotifications(result.data as Varsler),
              }
            : result,
    );
};

export const archiveNotification = async ({
    cookie,
    id,
}: {
    cookie: string;
    id: string;
}) => {
    const fetchResult = await fetch(`${env.VARSEL_API_URL}/beskjed/inaktiver`, {
        method: "POST",
        headers: {
            cookie,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id }),
    });

    if (!fetchResult.ok) {
        return Result.Error(await fetchResult.text());
    }

    return Result.Ok(id);
};
