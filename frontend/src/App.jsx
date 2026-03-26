// Importing required MUI components for UI
import {
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";

import "./App.css";
import { useState } from "react";
import axios from "axios"; // for making API calls

function App() {
  // 🔹 State to store user input (original email)
  const [emailContent, setEmailContent] = useState("");

  // 🔹 State to store selected tone
  const [tone, setTone] = useState("");

  // 🔹 State to store generated reply from backend
  const [generatedReply, setGeneratedReply] = useState("");

  // 🔹 State to handle loading spinner
  const [loading, setLoading] = useState(false);

  // 🔹 Function to call backend API
  const handleSubmit = async () => {
    // If email content is empty, don't call API
    if (!emailContent) return;

    setLoading(true); // Start loading

    try {
      // Making POST request to backend API
      const response = await axios.post(
        "http://localhost:8080/api/email/generator",
        {
          emailContent, // sending email content
          tone, // sending tone
        }
      );

      // Handling response (string or object)
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      // Error handling
      console.error("Error:", error);
      setGeneratedReply("Something went wrong. Please try again.");
    } finally {
      // Stop loading in both success & failure
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* 🔹 Heading */}
      <Typography variant="h3" gutterBottom>
        Email Reply Generator
      </Typography>

      {/* 🔹 Input Section */}
      <Box sx={{ mx: 3 }}>
        {/* Email Input Field */}
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Tone Selection Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone}
            label="Tone"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        {/* Generate Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading} // disable if empty or loading
          sx={{ mb: 2 }}
        >
          {/* Show loader when API is calling */}
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      {/* 🔹 Output Section */}
      <Box sx={{ mx: 3 }}>
        {/* Generated Reply Field */}
        <TextField
          fullWidth
          multiline
          rows={6}
          value={generatedReply}
          InputProps={{ readOnly: true }} // make it read-only
          placeholder="Generated reply will appear here..."
          sx={{ mb: 2 }}
        />

        {/* Copy Button */}
        <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(generatedReply)}
          disabled={!generatedReply} // disable if no text
        >
          Copy to Clipboard
        </Button>
      </Box>
    </Container>
  );
}

export default App;
