// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [audioUrl, setAudioUrl] = useState("");

//   const handleFileChange = (e) => setVideoFile(e.target.files[0]);
//   const handleUrlChange = (e) => setVideoUrl(e.target.value);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (videoFile) formData.append("video", videoFile);
//     if (videoUrl) formData.append("url", videoUrl);

//     try {
//       const response = await axios.post("http://localhost:5000/extract-audio", formData, {
//         responseType: "blob",
//       });
//       const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioUrl(audioUrl);
//     } catch (error) {
//       console.error("Error extracting audio:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Video to Audio Converter</h1>
//       <form onSubmit={handleUpload}>
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//         <input
//           type="text"
//           placeholder="Enter video URL"
//           value={videoUrl}
//           onChange={handleUrlChange}
//         />
//         <button type="submit">Extract Audio</button>
//       </form>
//       {audioUrl && (
//         <div>
//           <h3>Download Your Audio:</h3>
//           <a href={audioUrl} download="audio.mp3">Download Audio</a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Include this if you'd like to manage styles in a separate CSS file

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post("https://video-to-audio-backend.onrender.com/extract-audio", formData);
      setAudioUrl(response.data.audio_url);
    } catch (error) {
      console.error("Error extracting audio:", error);
    }
  };

  // Reset the state for next video upload
  const handleDownload = () => {
    setVideoFile(null);
    setAudioUrl("");
  };

  return (
    <div className="app">
      <h1 className="title">Video to Audio Converter</h1>
      <form className="form" onSubmit={handleUpload}>
        <input 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
          className="file-input"
        />
        <button type="submit" className="upload-button">Extract Audio</button>
      </form>
      {audioUrl && (
        <div className="download-section">
          <h3>Your Audio is Ready:</h3>
          <a 
            href={audioUrl} 
            download="audio.mp3" 
            className="download-button" 
            onClick={handleDownload}
          >
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
