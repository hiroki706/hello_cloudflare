import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { runPython } from '$lib/ts/api/runPython';

export const actions: Actions = {
    debug: async ({ request }) => {
        console.log("request", request);
        const formData = await request.formData();
        console.log("formData", formData.get("email"));
    },
    runCode: async ({ request }) => {
        // TODO
        const formData = await request.formData();
        console.log("formData", formData);
        const code = formData.get("code");
        const input = formData.get("input");
        if (typeof code !== "string") {
            return fail(400, {
                codeEmpty: "Code is required",
            });
        }
        if (typeof input !== "string") {
            return fail(400, {
                inputEmpty: "Input is required",
            });
        }
        const response = await runPython(code, input);
        if (typeof response === "string") {
            return {
                success: false,
                data: null,
            };
        } else {
            return {
                success: true,
                data: response,
            }
        }
    }
} satisfies Actions;

// この関数は、ページが読み込まれたときに実行されます。
// ここでは、loadtestというデータを返します。
export const load: PageServerLoad = async () => {
    return {
        loadtest: "loadtest",
    }
}
