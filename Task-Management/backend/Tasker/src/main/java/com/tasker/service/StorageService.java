package com.tasker.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

    private final Path uploadDir = Paths.get("C:/TaskerImages"); 

    public StorageService() throws IOException {
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
    }

    public String save(MultipartFile file) throws IOException {
        String originalName = file.getOriginalFilename();
        String extension = "";
        int dotIndex = originalName.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalName.substring(dotIndex); 
        }

        String uniqueName = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadDir.resolve(uniqueName);
        file.transferTo(filePath.toFile());

        return uniqueName; // return the saved filename
    }
}
