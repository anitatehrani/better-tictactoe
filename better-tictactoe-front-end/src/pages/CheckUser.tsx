import {useState} from "react";

export function CheckUser() {
    const [form, setForm] = useState({
        name: "",
        age: "",
        married: "",
        dateOfBirth: ""
    });

    const [result, setResult] = useState(null);

    function update(field: string, value: string) {
        setForm((f) => ({...f, [field]: value}));
    }

    function submit() {
        fetch("http://localhost:3001/info/validate-details", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: form.name,
                age: Number(form.age),
                married: form.married === "" ? undefined : form.married === "yes",
                dateOfBirth: form.dateOfBirth
            })
        })
            .then((res) => res.json())
            .then((json) => setResult(json));
    }

    return (
        <div>
            <h1>Check User Details</h1>

            <label>Name</label>
            <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
            />

            <label>Age</label>
            <input
                type="number"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
            />

            <label>Married</label>
            <select
                value={form.married}
                onChange={(e) => update("married", e.target.value)}
            >
                <option value="">-- select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label>Date of Birth</label>
            <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
            />

            <button onClick={submit}>Validate</button>

            {result && (
                <pre style={{marginTop: 20}}>{JSON.stringify(result, null, 2)}</pre>
            )}
        </div>
    );
}
