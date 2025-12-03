import { useEffect, useState } from "react";
import { BaseResponse } from "../interfaces";

type Status =
    | "INITIAL"
    | "SEND_DATA"
    | "SENDING_DATA"
    | "DATA_SENDED"
    | "ERROR_SENDING_DATA";

export function CheckUser() {
    const [status, setStatus] = useState<Status>("INITIAL");

    const [form, setForm] = useState({
        name: "",
        age: "",
        married: "",
        dateOfBirth: "",
    });

    const [result, setResult] = useState<BaseResponse | null>(null);

    function update(field: string, value: string) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    useEffect(() => {
        if (status === "SEND_DATA") {
            setStatus("SENDING_DATA");

            fetch("http://localhost:3001/info/validate-details", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    age: Number(form.age),
                    married:
                        form.married === ""
                            ? undefined
                            : form.married === "yes",
                    dateOfBirth: form.dateOfBirth,
                }),
            })
                .then((res) => {
                    if (res.ok) return res.json();
                    throw new Error();
                })
                .then((json: BaseResponse) => {
                    setResult(json);
                    setStatus("DATA_SENDED");
                })
                .catch(() => setStatus("ERROR_SENDING_DATA"));
        }
    }, [status, form]);

    if (status === "ERROR_SENDING_DATA") {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Error Sending Data</h1>
                <button style={styles.button} onClick={() => setStatus("INITIAL")}>
                    Retry
                </button>
            </div>
        );
    }

    if (status === "SEND_DATA" || status === "SENDING_DATA") {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Validating...</h1>
                <button style={styles.button} onClick={() => setStatus("INITIAL")}>
                    Cancel
                </button>
            </div>
        );
    }

    if (status === "DATA_SENDED") {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>
                    {result?.success
                        ? "Validation Successful"
                        : "Validation Errors"}
                </h1>
                <pre style={styles.pre}>{JSON.stringify(result, null, 2)}</pre>

                <button style={styles.button} onClick={() => setStatus("INITIAL")}>
                    Validate Another User
                </button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Check User Details</h1>

            <div style={styles.card}>
                <div style={styles.field}>
                    <label style={styles.label}>Name</label>
                    <input
                        style={styles.input}
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Enter full name"
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Age</label>
                    <input
                        type="number"
                        style={styles.input}
                        value={form.age}
                        onChange={(e) => update("age", e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Married</label>
                    <select
                        style={styles.input}
                        value={form.married}
                        onChange={(e) => update("married", e.target.value)}
                    >
                        <option value="">-- select --</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Date of Birth</label>
                    <input
                        type="date"
                        style={styles.input}
                        value={form.dateOfBirth}
                        onChange={(e) => update("dateOfBirth", e.target.value)}
                    />
                </div>

                <button style={styles.button} onClick={() => setStatus("SEND_DATA")}>
                    Validate
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        marginBottom: "20px",
        fontSize: "28px",
        textAlign: "center",
    },
    card: {
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    field: { marginBottom: "15px" },
    label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#007bff",
        color: "white",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    pre: {
        background: "#f0f0f0",
        padding: "15px",
        borderRadius: "6px",
        overflowX: "auto",
    },
};
