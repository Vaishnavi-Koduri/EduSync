﻿namespace EduSync.DTOs
{
    public class CourseCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile MediaFile { get; set; }
    }
}