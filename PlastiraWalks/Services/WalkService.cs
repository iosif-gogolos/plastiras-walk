using System.Net.Http.Json;
using PlastiraWalks.Models;

namespace PlastiraWalks.Services;

public sealed class WalkService(HttpClient http)
{
    public async Task<IReadOnlyList<WalkEntry>> GetWalksAsync(CancellationToken cancellationToken = default)
    {
        var walks = await http.GetFromJsonAsync<List<WalkEntry>>("data/walks.json", cancellationToken);
        return walks ?? [];
    }
}