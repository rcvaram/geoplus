package com.github.rcvaram.geoplus.location;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Location implements Serializable {
    private String sender;
    private String recipient;
    private double latitude;
    private double longitude;
}
