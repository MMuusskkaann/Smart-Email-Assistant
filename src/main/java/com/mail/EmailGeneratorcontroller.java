package com.mail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailGeneratorcontroller {

    private final EmailGeneratorService emailGeneratorService;

    public EmailGeneratorcontroller(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generator")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){

        String response = emailGeneratorService.generateEmailReply(emailRequest);

        return ResponseEntity.ok(response);
    }
}
