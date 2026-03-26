package com.mail;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apiKey;
    private final ObjectMapper objectMapper;

<<<<<<< HEAD
    public EmailGeneratorService(
            WebClient.Builder webClientBuilder,
            @Value("${gemini.api.url}") String baseUrl,
            @Value("${gemini.api.key}") String geminiApiKey) {

        this.apiKey = geminiApiKey;
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
    }

    // Generate Email Reply
    public String generateEmailReply(EmailRequest emailRequest) {

=======
    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                 @Value("${gemini.api.url}") String baseUrl,
                                 @Value("${gemini.api.key}") String geminiApiKey) {

        this.apiKey = geminiApiKey;
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.objectMapper = new ObjectMapper();
    }

    // it takes email request object
    public String generateEmailReply(EmailRequest emailRequest) {

        // Build Prompt
>>>>>>> 6e8489e (Your feature edits)
        String prompt = buildPrompt(emailRequest);

        // Escape quotes to avoid JSON break
        String safePrompt = prompt.replace("\"", "\\\"");

<<<<<<< HEAD
        String requestBody = String.format("""
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
=======
        // Prepare JSON body
        String requestBody = String.format("""
        {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "%s"
                        }
                    ]
>>>>>>> 6e8489e (Your feature edits)
                }
              ]
            }
          ]
        }
<<<<<<< HEAD
        """, prompt);


        String response = webClient.post()
                .uri("/v1beta/models/gemini-3-flash-preview:generateContent")               .header("x-goog-api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


=======
        """, safePrompt);

        // send request
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-3-flash-preview:generateContent")
                        .build())
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Extract Response
>>>>>>> 6e8489e (Your feature edits)
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
<<<<<<< HEAD

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            JsonNode candidates = root.path("candidates");

            if (candidates.isEmpty()) {
                return "No response from Gemini API";
            }

            return candidates
=======
        try {
            JsonNode root = objectMapper.readTree(response);

            if (root.path("candidates").isEmpty()) {
                return "No response generated";
            }

            return root.path("candidates")
>>>>>>> 6e8489e (Your feature edits)
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

<<<<<<< HEAD
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing response";
        }
    }


    // Build prompt
    private String buildPrompt(EmailRequest emailRequest) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("Generate a professional email reply for the following email.\n");
=======
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing response", e);
        }
    }

    //static hata diya (important fix)
    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("Generate a professional reply for the following email: ");
>>>>>>> 6e8489e (Your feature edits)

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ")
                    .append(emailRequest.getTone())
<<<<<<< HEAD
                    .append(" tone.\n");
        }


        prompt.append("Original Email:\n")
=======
                    .append(" tone. ");
        }

        prompt.append("\nOriginal Email:\n")
>>>>>>> 6e8489e (Your feature edits)
                .append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}