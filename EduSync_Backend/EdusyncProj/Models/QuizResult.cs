namespace EduSync.Models
{
    public class QuizResult
    {
        public Guid Id { get; set; }           // Primary Key
        public Guid AssessmentId { get; set; }
        public string UserId { get; set; }
        public Guid CourseId { get; set; }
        public string AnswersJson { get; set; } // JSON of answers
        public DateTime SubmittedAt { get; set; }
    }
}
