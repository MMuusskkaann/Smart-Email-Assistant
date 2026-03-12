package com.mail;


import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class EmailRequest {
    private String emailContent;
    private String tone; //which type of reply want like professional,casual,angry,etc
}
