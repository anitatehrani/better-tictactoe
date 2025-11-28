import {useState} from "react";
import {BaseResponse} from "../interfaces";

export function CheckName() {
    const [name, setName] = useState("");
    const [result, setResult] = useState<BaseResponse | null>(null);

    function submit() {
        setResult(null);

        fetch("http://localhost:3001/info/validate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name})
        })
            .then((res) => res.json())
            .then((json) => setResult(json));
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Check Name</h1>

            <div style={styles.card}>
                <div style={styles.field}>
                    <label style={styles.label}>Name</label>
                    <input
                        style={styles.input}
                        value={name}
                        placeholder="Enter a name..."
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <button style={styles.button} onClick={submit}>
                    Validate
                </button>
            </div>

            {result && (
                <div style={styles.resultBox}>
                    <h3 style={styles.resultTitle}>
                        {result.success ? "Name is Valid" : "Validation Errors"}
                    </h3>

                    <pre style={styles.pre}>
            {JSON.stringify(result, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif"
    },
    title: {
        marginBottom: "20px",
        fontSize: "28px",
        textAlign: "center"
    },
    card: {
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    },
    field: {
        marginBottom: "15px"
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px"
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
        marginTop: "10px"
    },
    resultBox: {
        marginTop: "25px",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ddd"
    },
    resultTitle: {
        margin: "0 0 10px 0"
    },
    pre: {
        background: "#f0f0f0",
        padding: "15px",
        borderRadius: "6px",
        overflowX: "auto"
    }
};
