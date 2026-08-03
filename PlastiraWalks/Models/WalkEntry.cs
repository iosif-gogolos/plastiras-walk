namespace PlastiraWalks.Models;

public sealed class WalkEntry
{
    public string Day { get; set; } = string.Empty;

    public string Date { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Start { get; set; } = string.Empty;

    public string End { get; set; } = string.Empty;

    public string Difficulty { get; set; } = string.Empty;

    public bool Children { get; set; }

    public string Meeting { get; set; } = string.Empty;

    public string Navigation { get; set; } = string.Empty;

    public string Notes { get; set; } = string.Empty;

    public string Transport { get; set; } = string.Empty;

    public string? GpxFile { get; set; }

    public List<string> Images { get; set; } = [];
}