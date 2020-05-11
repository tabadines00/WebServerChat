package dao;

import demo.NotesListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


public class NotesDao {
    // step1
    private static NotesDao instance;

    private NotesDao() {}

    public void addNote(String name, String note) {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0511");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");

        // Generate date and time
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("MM-dd HH:mm:ss");
        String time = formatter.format(date);

        Document newNote = new Document()
                .append("username", name)
                .append("note", note)
                .append("date", time);
        notesCollection.insertOne(newNote);
    }

    public NotesListDto getAllNotes() {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0511");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");
        List<String> notes = notesCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    return document.getString("username") + " (" + document.getString("date") + "): " + document.getString("note");
                })
                .collect(Collectors.toList());
        return new NotesListDto(notes);
    }


    // Step1: singleton
    public static NotesDao getInstance() {
        if (instance == null) {
            instance = new NotesDao();
        }
        return instance;
    }
}