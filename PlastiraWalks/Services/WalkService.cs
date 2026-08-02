using System.Text.Json;
using PlastiraWalks.Models;

namespace PlastiraWalks.Services;

public sealed class WalkService(IWebHostEnvironment environment)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<IReadOnlyList<WalkEntry>> GetWalksAsync(CancellationToken cancellationToken = default)
    {
        var path = Path.Combine(environment.WebRootPath, "data", "walks.json");

        if (!File.Exists(path))
        {
            return Array.Empty<WalkEntry>();
        }

        await using var stream = File.OpenRead(path);
        var walks = await JsonSerializer.DeserializeAsync<List<WalkEntry>>(stream, JsonOptions, cancellationToken);

        return walks ?? [];
    }
}
