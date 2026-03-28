import toast, { Toaster } from "react-hot-toast";
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
  IconButton,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useState } from "react";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Theme setup
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const handleSubmit = async () => {
    if (!emailContent) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generator",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setGeneratedReply("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #1e1e2f, #121212)"
            : "linear-gradient(135deg, #667eea, #764ba2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              background: darkMode
                ? "rgba(30,30,30,0.9)"
                : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            }}
          >
            {/* Top Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold">
                Email Reply Generator
              </Typography>

              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            {/* Input */}
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mt: 3, mb: 2 }}
            />

            {/* Tone */}
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

            {/* Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                mb: 2,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Reply"}
            </Button>

            {/* Output */}
            <TextField
              fullWidth
              multiline
              rows={5}
              value={generatedReply}
              InputProps={{ readOnly: true }}
              placeholder="Generated reply will appear here..."
              sx={{ mb: 2 }}
            />

            {/* Copy */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigator.clipboard.writeText(generatedReply)}
              disabled={!generatedReply}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;