type RunPythonResponse = {
    id: string;
    language: string;
    status: string;
    build_stdout: string | null;
    build_stderr: string | null;
    build_exit_code: string;
    build_time: string | null;
    stdout: string;
    stderr: string | null;
    exit_code: string;
    time: string;
    memory: string;
    result: string;

    error: string | null;
}

async function runPython(code: string, input: string): Promise<RunPythonResponse | string> {
    // 実行を開始
    const url = "https://api.paiza.io";
    const param = {
        api_key: "guest",
        langage: "python3",
        source_code: code,
        input: input,
    };
    const createRes = await fetch(`${url}/runners/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    });
    const createData = await createRes.json();
    const id = createData.id;
    // 実行完了待ち
    while (true) {
        const response = await fetch(`${url}/runners/get_status?api_key=guest&id=${id}`);
        const data = await response.json();
        if (data.status === "completed") {
            break;
        }
        if (data.error) {
            return data.error;
        }
        // 0.5秒待つ
        await new Promise((resolve) => setTimeout(resolve, 500));
    };
    // 実行結果取得
    const response = await fetch(`${url}/runners/get_details?api_key=guest&id=${id}`);
    const data = await response.json();
    console.log(data);
    return data;
}

export { runPython };
export type { RunPythonResponse };
// runPython関数を使うときは、import { runPython } from "lib/ts/api/runPython"のようにインポートしてください。
