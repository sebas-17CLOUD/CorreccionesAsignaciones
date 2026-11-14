using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ToDoExamen.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "mongodb+srv://naranjosebastian399_db_user:Admin1234@cluster1castrocarazo.fomqu8x.mongodb.net/todo_db";
builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapGet("/api/todo/filtrar", (IMongoClient client, bool? completada, string? busqueda, string? ordenarPor) =>
{
    var database = client.GetDatabase("todo_db");
    var collection = database.GetCollection<TodoModel>("tareas");

    var query = collection.AsQueryable();

    if (completada.HasValue)
    {
        query = query.Where(t => t.Completada == completada.Value);
    }

    if (!string.IsNullOrWhiteSpace(busqueda))
    {
        var termino = busqueda.ToLower();
        query = query.Where(t => 
            (t.Titulo != null && t.Titulo.ToLower().Contains(termino)) || 
            (t.Descripcion != null && t.Descripcion.ToLower().Contains(termino))
        );
    }

    if (!string.IsNullOrEmpty(ordenarPor))
    {
        if (ordenarPor.Equals("fecha", StringComparison.OrdinalIgnoreCase))
        {
            query = query.OrderBy(t => t.FechaCreacion);
        }
        else if (ordenarPor.Equals("prioridad", StringComparison.OrdinalIgnoreCase))
        {
            query = query.OrderByDescending(t => t.Prioridad);
        }
    }

    var resultados = query.ToList();
    return Results.Ok(resultados);
});

app.MapPost("/api/todo", (IMongoClient client, TodoModel nuevaTarea) =>
{
    var database = client.GetDatabase("todo_db");
    var collection = database.GetCollection<TodoModel>("tareas");

    nuevaTarea.FechaCreacion = DateTime.UtcNow;
    collection.InsertOne(nuevaTarea);

    return Results.Created($"/api/todo/{nuevaTarea.Id}", nuevaTarea);
});

app.MapPut("/api/todo/{id}", (IMongoClient client, string id, TodoModel tareaActualizada) =>
{
    var database = client.GetDatabase("todo_db");
    var collection = database.GetCollection<TodoModel>("tareas");

    var filter = Builders<TodoModel>.Filter.Eq(t => t.Id, id);
    var update = Builders<TodoModel>.Update
        .Set(t => t.Titulo, tareaActualizada.Titulo)
        .Set(t => t.Descripcion, tareaActualizada.Descripcion)
        .Set(t => t.Completada, tareaActualizada.Completada)
        .Set(t => t.Prioridad, tareaActualizada.Prioridad);

    var result = collection.UpdateOne(filter, update);

    if (result.ModifiedCount > 0 || result.MatchedCount > 0)
    {
        return Results.Ok(new { mensaje = "Tarea actualizada correctamente" });
    }

    return Results.NotFound(new { mensaje = "Tarea no encontrada" });
});

app.MapDelete("/api/todo/{id}", (IMongoClient client, string id) =>
{
    var database = client.GetDatabase("todo_db");
    var collection = database.GetCollection<TodoModel>("tareas");

    var result = collection.DeleteOne(t => t.Id == id);

    if (result.DeletedCount > 0)
    {
        return Results.Ok(new { mensaje = "Tarea eliminada correctamente" });
    }

    return Results.NotFound(new { mensaje = "Tarea no encontrada" });
});

app.Run();