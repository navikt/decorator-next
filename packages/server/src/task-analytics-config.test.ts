import { describe, expect, test } from "bun:test";
import { getTaskAnalyticsConfig } from "./task-analytics-config";
import { expectOK } from "./test-expect";

describe("task analytics", () => {
    test("returns config", async () => {
        const result = await getTaskAnalyticsConfig();
        expectOK(result);
        expect(result.data.length).toBe(3);
        expect(result.data[2]).toEqual({
            duration: {
                end: "2023-02-28",
                start: "2023-01-30T08:00",
            },
            id: "2357",
            urls: [
                {
                    match: "startsWith",
                    url: "https://www.dev.nav.no/soknader",
                },
            ],
        });
    });

    test("caches config", async () => {
        const res1 = await getTaskAnalyticsConfig();
        const res3 = await getTaskAnalyticsConfig();

        expectOK(res1);
        expectOK(res3);
        expect(res1.data).toBe(res3.data);
    });
});
