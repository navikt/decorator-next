import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    test,
} from "bun:test";
import { HttpResponse, http } from "msw";
import { SetupServerApi, setupServer } from "msw/node";
import { env } from "./env/server";
import { getNotifications } from "./notifications";

/*
const server = setupServer(
    http.get(`${env.VARSEL_API_URL}/varselbjelle/varsler`, () =>
        HttpResponse.json(notificationsMock),
    ),
);

describe("notifications service", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("returns first five results", async () => {
        const result = await getNotifications({
            texts: texts.nb,
            request: new Request("http://example.com", {
                headers: { cookie: "cookie" },
            }),
        });

        expect(result.length).toBe(5);

        expect(result[0].isArchivable).toBe(false);
        expect(result[0].title).toBe("Oppgave");
        expect(result[0].text).toBe(
            "Du har fått en oppgave, logg inn med høyere sikkerhetsnivå for å se oppgaven.",
        );
        expect(result[0].metadata).toBeUndefined();

        expect(result[2].isArchivable).toBe(true);
        expect(result[2].title).toBe("Beskjed");
        expect(result[2].text).toBe(
            "Du har fått en melding, logg inn med høyere sikkerhetsnivå for å se meldingen.",
        );

        expect(result[4].metadata).toBe("Varslet på SMS");
    });
});
*/

describe("notifications ", () => {
    let server: SetupServerApi;

    beforeAll(() => {
        server = setupServer(
            http.get(`${env.VARSEL_API_URL}/varselbjelle/varsler`, () =>
                HttpResponse.json({
                    oppgaver: [
                        {
                            eventId: "a",
                            tidspunkt: "2023-07-04T11:41:02.280367+02:00",
                            isMasked: true,
                            eksternVarslingKanaler: [],
                        },
                        {
                            eventId: "b",
                            tidspunkt: "2023-07-04T11:43:02.280367+02:00",
                            isMasked: false,
                            eksternVarslingKanaler: ["SMS", "EPOST"],
                            link: "http://example.com",
                            tekst: "wat",
                        },
                    ],
                    beskjeder: [
                        {
                            eventId: "c",
                            tidspunkt: "2023-07-04T11:47:02.280367+02:00",
                            eksternVarslingKanaler: ["SMS"],
                            isMasked: false,
                            tekst: "omg",
                            link: "https://developer.mozilla.org/",
                        },
                    ],
                }),
            ),
        );
        server.listen();
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("returns task", async () => {
        const result = await getNotifications({
            request: new Request("http://example.com", {
                headers: { cookie: "cookie" },
            }),
        });

        expect(result).toEqual([
            {
                id: "a",
                type: "task",
                date: "2023-07-04T11:41:02.280367+02:00",
                channels: [],
                masked: true,
            },
            {
                id: "b",
                type: "task",
                date: "2023-07-04T11:43:02.280367+02:00",
                channels: ["SMS", "EPOST"],
                masked: false,
                text: "wat",
                link: "http://example.com",
            },
            {
                id: "c",
                type: "message",
                date: "2023-07-04T11:47:02.280367+02:00",
                channels: ["SMS"],
                masked: false,
                text: "omg",
                link: "https://developer.mozilla.org/",
            },
        ]);
    });
});
