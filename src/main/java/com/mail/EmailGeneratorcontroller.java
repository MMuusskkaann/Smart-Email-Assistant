package com.mail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/email")
public class EmailGeneratorcontroller {

    private final EmailGeneratorService emailGeneratorService;

    public EmailGeneratorcontroller(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generator")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){

        //  correct call (object ke through)
        String response = emailGeneratorService.generateEmailReply(emailRequest);

        return ResponseEntity.ok(response); //  actual response return karo
    }
}