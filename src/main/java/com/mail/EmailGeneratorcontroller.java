package com.mail;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/email")
public class EmailGeneratorcontroller {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generator")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String Response = EmailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok("");
    }
}
