package com.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailGeneratorService {

    private final WebClient webClienf;
    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder() webClientBuilder,
        @Value()  String apiKey,   WebClient webClienf) {
        this.webClienf = webClienf;
        this.apiKey = apiKey;
    }

    //it take email request object
    public static String generateEmailReply(EmailRequest emailRequest) {
        //Build Prompt
        String prompt = buildPrompt(emailRequest);


        // Prepare raw JSON body
        String requestBody = String.format("""
{
    "contents": [
        {
            "parts": [
                {
                    "text": "%s"
                }
            ]
        }
    ]
}
""",prompt);

        //send request

        //Extract Response
    }

    private static String buildPrompt(EmailRequest emailRequest) {
        //we use string builder because we can modify this prompt we can't modify string
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional reply for the following email : ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.  ");
            //use a casual tone.
        }
        prompt.append("Original Email: \n").append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}
