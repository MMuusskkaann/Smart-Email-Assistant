
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
import { Box, Container, TextField, Typography } from "@mui/material";
import "./App.css";
import { useState } from "react";

function App() {
  //state variables
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  

  //Api call to backend login here 
  const handleSubmit = async () => {
    setLoading(true); //start loading
    
    //adding try and catch block to call an api
    //and get the response fron backend and set
    //the response to generatedReply state variable 
    //and also handle any error that may occur during the Api call
    try{

      //using axions to make a post request to the backend and get the response
      const response = await axios.post("http://localhost:8080/api/email/generator",
        {
        emailContent, //need extra information about the email content to genrate a reply
        tone //need extra information about the tone to generate a reply
        });
         

        //setting the response from the backend to the generatedReply state variable 
        setGeneratedReply(typeof response.data === 'string' ?
          response.data : JSON.stringify(response.data) //if the response is a string then set it to the generatdReply state variable otherwise convert it to a string and set it to the generatedReply state variable
        );

    }catch(error){

    }

    finally{
      setLoading(false); //stop loading
    }

  };

  const [emailContent, setEmailContent] = useState(" ");
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ""}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleSubmit}
          disabled={!emailContent || loading}>
           {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>
      </Box>
      
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={generatedReply  || ''}
          inputProps={{readonly : true}}
          sx={{ mb: 2 }}
        />

        <Button
          variant='outlined'
          onClick ={() => navigator.clipboard.write(generatedReply)}>
          Copy to Clipboard
        </Button>
        </Box>
          value={emailContent || " "}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default App;
