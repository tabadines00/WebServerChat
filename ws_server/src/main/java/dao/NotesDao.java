package dao;

import demo.NotesListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class NotesDao {
    // step1
    private static NotesDao instance;

    private NotesDao() {
    }

    public void addNote(String name, String note) {
        // connect data
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0504");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");

//        Document newNote = new Document("note", note);
//        notesCollection.insertOne(newNote);

        Document newNote = new Document()
                .append("username", name)
                .append("note", note);
        notesCollection.insertOne(newNote);
    }

    public NotesListDto getAllNotes() {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0504");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");
        List<String> notes = notesCollection.find().into(new ArrayList<>())
//                .stream()
//                .map(document -> {
//                    return document.getString("note");
//                })
//                .collect(Collectors.toList());
//        return new NotesListDto(notes);


                .stream()
                .map(document -> {
//                    System.out.println("document: "+ document);
//                    System.out.println("document-user: "+ document.getString("username"));
//                    System.out.println("document-note: "+ document.getString("note"));
                    return document.getString("username") + ": " + document.getString("note");
                })
                .collect(Collectors.toList());

        System.out.println("Notes list:" + notes);

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
