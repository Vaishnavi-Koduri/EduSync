﻿namespace EduSync.DTOs
{
    public class CourseUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile? MediaFile { get; set; }
    }
}

