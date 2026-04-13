import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jd) {
      alert("Please upload both files");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Error fetching result");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">AI Resume Analyzer</h1>
        <p className="subtitle">
          Compare your resume with a job description using AI
        </p>

        <div className="input-group">
          <label>Upload Resume</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        </div>

        <div className="input-group">
          <label>Upload Job Description</label>
          <input type="file" onChange={(e) => setJd(e.target.files[0])} />
        </div>

        <button className="analyze-btn" onClick={handleSubmit}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="result-box">
            <h3>Analysis Result</h3>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;